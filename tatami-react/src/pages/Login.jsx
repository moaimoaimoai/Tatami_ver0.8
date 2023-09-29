import React, { useReducer, Fragment, useContext, useState, useEffect } from "react";
import { withCookies } from "react-cookie";
import axios from "axios";
import { Link, useHistory  } from 'react-router-dom';
import { ApiContext } from '../context/ApiContext';
import { useGoogleLogin } from '@react-oauth/google';
import CircularProgress from "@material-ui/core/CircularProgress";

import {
	START_FETCH,
	FETCH_SUCCESS,
	ERROR_CATCHED,
	//INPUT_EDIT,
	INPUT_EDIT_LOG,
	INPUT_EDIT_REG,
	TOGGLE_MODE,
} from "../components/actionTypes"
import { SnackbarContext } from "../context/SnackbarContext";

const initialState = {
	isLoading: false,
	isLoginView: true,
	error: "",
	credentialsLog: {
		username: "",
		password: "",
	},
	credentialsReg: {
		email: "",
		password: "",
	},
};


const loginReducer = (state, action) => {
	switch (action.type) {
		case START_FETCH: {
			return {
				...state,
				isLoading: true,
			};
		}
		case FETCH_SUCCESS: {
			return {
				...state,
				isLoading: false,
			};
		}
		case ERROR_CATCHED: {
			return {
				...state,
				error: action.payload ? action.payload : "Email or password is not correct!",
				isLoading: false,
			};
		}
		case INPUT_EDIT_LOG: {
			return {
				...state,
				credentialsLog: {
					...state.credentialsLog,
					[action.inputName]: action.payload,
				},
				error: "",
			};
		}
		case INPUT_EDIT_REG: {
			return {
				...state,
				credentialsReg: {
					...state.credentialsReg,
					[action.inputName]: action.payload,
				},
				error: "",
			};
		}
		case TOGGLE_MODE: {
			return {
				...state,
				isLoginView: !state.isLoginView,
			};
		}
		default:
			return state;
	}
};

const Login = (props) => {
    const history = useHistory();
	const [user, setUser] = useState(null);
	const { newSnack } = useContext(SnackbarContext);
	const [gProfile, setGProfile] = useState(null);
	const [state, dispatch] = useReducer(loginReducer, initialState);
	const { profile } = useContext(ApiContext)

	const inputChangedLog = () => (event) => {
		//const cred = state.credentialsLog;
		//cred[event.target.name] = event.target.value;
		dispatch({
			type: INPUT_EDIT_LOG,
			//inputName: "state.credentialLog",
			//payload: cred,
			inputName: event.target.name,
			payload: event.target.value,
		});
	};

	const inputChangedReg = () => (event) => {
		//const cred = state.credentialsReg;
		//cred[event.target.name] = event.target.value;
		dispatch({
			type: INPUT_EDIT_REG,
			//inputName: "state.credentialReg",
			//payload: cred,
			inputName: event.target.name,
			payload: event.target.value,
		});
	};

	const gLogin = useGoogleLogin({
		onSuccess: (codeResponse) => {
			dispatch({ type: START_FETCH });
			setUser(codeResponse);
		},
		onError: (error) => console.log('Login Failed:', error)
	});

	useEffect(
		() => {
			if (user) {
				axios
					.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
						headers: {
							Authorization: `Bearer ${user.access_token}`,
							Accept: 'application/json'
						}
					})
					.then((res) => {
						if (res.data.verified_email) {
							setGProfile(res.data);
						}
						else {
							dispatch({ type: ERROR_CATCHED, payload: 'Your Gmail account was not verified.' });
						}
						console.log(res.data)
					})
					.catch((err) => console.log(err));
			}
		},
		[user]
	);
	useEffect(() => {
		if (gProfile) {
			axios.post(
				process.env.REACT_APP_API_URL + "/api/user/loginGoogle/",
				{
					email: gProfile.email,
					given_name: gProfile.given_name,
					family_name: gProfile.family_name,
					name: gProfile.name,
					picture: gProfile.picture,
				},
				{
					headers: { "Content-Type": "application/json" },
				}
			).then(res => {
				props.cookies.set("current-token", res.data.token);
				(res.data.token
					? (profile.id ?
						(window.location.href = "/home")
						:
						(window.location.href = "/account")
					)
					: (window.location.href = "/login"));
				dispatch({ type: FETCH_SUCCESS });
			}).catch(err => {
				console.log(err);
				dispatch({ type: ERROR_CATCHED });
			});
		}
	}, [gProfile, profile, props]);

	const login = async (event) => {
		event.preventDefault();
		if (state.isLoginView) {
			try {
				dispatch({ type: START_FETCH });
				const res = await axios.post(
					process.env.REACT_APP_API_URL + "/authen/",
					state.credentialsLog,
					{
						headers: { "Content-Type": "application/json" },
					}
				);
				props.cookies.set("current-token", res.data.token);
				(res.data.token
					? (profile.id ?
						(window.location.href = "/home")
						:
						(window.location.href = "/account")
					)
					: (window.location.href = "/login"));
				dispatch({ type: FETCH_SUCCESS });
			} catch (err) {
				console.log(err.response.data);
				const errData = err.response.data;
				if (errData.username)
					newSnack("error", errData.username);
				else if (errData.password)
					newSnack("error", errData.password);
				else
					newSnack("error", "ログインに失敗しました。");
				dispatch({ type: ERROR_CATCHED });
			}
		} else {
			dispatch({ type: START_FETCH });
			axios.post(
				process.env.REACT_APP_API_URL + "/api/user/register/",
				{...state.credentialsReg, app_url : process.env.REACT_APP_PUBLIC_URL},
				{
					headers: { "Content-Type": "application/json" },
				}
			).then(res => {
				dispatch({ type: FETCH_SUCCESS });
				props.cookies.set("registered-email", res.data.email);
				// dispatch({ type: TOGGLE_MODE });
				history.push('/please-verify');
			}).catch(err => {
				newSnack("error", "登録に失敗しました。");
				dispatch({ type: ERROR_CATCHED });
			});
		};
	}
	const toggleView = () => {
		dispatch({ type: TOGGLE_MODE });
	};

	return (
		<Fragment>
			<div className="main-wrap">
				<div className="nav-header bg-transparent shadow-none border-0">
					<div className="nav-top w-100">
						<Link to="/home"><i className="feather-zap text-success display1-size me-2 ms-0"></i><span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Tatami </span> </Link>


						{/* <a href="/login" className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl">ログイン</a>
                        <a href="/register" className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl">新規登録</a> */}
					</div>
				</div>
				<div className="row">
					<div className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
					// style={{backgroundImage: 'url("https://ow6r85j5w096clt.site/media/image/login.jpg")'}}
					></div>
					<div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
						<div className="card shadow-none border-0 ms-auto me-auto login-card">
							<div className="card-body rounded-0 text-left">
								{state.isLoginView ?
									<h2 className="fw-700 display1-size display2-md-size mb-3">Tatamiに <br />ログイン</h2> :
									<h2 className="fw-700 display1-size display2-md-size mb-3">アカウントを <br />新規作成</h2>}
								{state.isLoading && <CircularProgress />}
								{state.isLoginView ?
									<form onSubmit={login}>
										<div className="form-group icon-input mb-3">
											<i className="font-sm ti-email text-grey-500 pe-0"></i>
											<input onChange={inputChangedLog()} name="username" value={state.credentialsLog.username} type="text" className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Your Email Address" />
										</div>
										<div className="form-group icon-input mb-1">
											<input onChange={inputChangedLog()} name="password" value={state.credentialsLog.password} type="password" className="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="Password" />
											<i className="font-sm ti-lock text-grey-500 pe-0"></i>
										</div>
										<div className="form-check text-left mb-3">
											<input type="checkbox" className="form-check-input mt-2" id="exampleCheck5" />
											<label className="form-check-label font-xsss text-grey-500">自動でログインする</label>
											<Link to="/forgot" className="fw-600 font-xsss text-grey-700 mt-1 float-right">パスワードをお忘れですか？</Link>
										</div>

                    <div className="col-sm-12 p-0 text-left">
                      <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">{state.error}</h6>
                      <div className="form-group mb-1"><button type="subimt" className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">ログイン</button></div>
                    </div>
                  </form>

                  :
                  <form onSubmit={login}>
                    <div className="form-group icon-input mb-3">
                      <i className="font-sm ti-user text-grey-500 pe-0"></i>
                      <input onChange={inputChangedReg()} name="email" type="text" value={state.credentialsReg.email} className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Email" />
                    </div>

										<div className="form-group icon-input mb-3">
											<input type="password" onChange={inputChangedReg()} value={state.credentialsReg.password} name="password" className="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="パスワード" />
											<i className="font-sm ti-lock text-grey-500 pe-0"></i>
										</div>
										<div className="form-group icon-input mb-1">
											<input type="password" onChange={inputChangedReg()} value={state.credentialsReg.confirmPassword} name="confirmPassword" className="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="パスワード（確認）" />
											<i className="font-sm ti-lock text-grey-500 pe-0"></i>
										</div><div className="form-check text-left mb-3">
											<input type="checkbox" className="form-check-input mt-2" id="exampleCheck2" />
											<label className="form-check-label font-xsss text-grey-500">規約に同意する</label>
										</div>

										<div className="col-sm-12 p-0 text-left">
											<h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">{state.error}</h6>
											<div className="form-group mb-1"><button type="submit" className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">アカウントを作成</button></div>
										</div>
									</form>}
								<button className="form-control text-center style2-input text-dark fw-600 bg-white border-1 p-0 border-dark" type="button" onClick={() => gLogin()}>
									<svg viewBox="0 0 48 48" style={{ height: '18px', marginRight: '8px', minWidth: '18px', width: '18px', position: 'relative', verticalAlign: 'middle' }}>
										<g>
											<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
											<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
											<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
											<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
											<path fill="none" d="M0 0h48v48H0z"></path>
										</g>
									</svg>
									Google でログイン
								</button>
								{/* <GoogleLogin onSuccess={(e)=>{console.log(e);}} onError={(e)=>{console.log(e);}} /> */}
								<h6 onClick={() => toggleView()} className="pointer  text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">{state.isLoginView ? '初めてTatamiをご利用される方はこちら' : 'アカウントをお持ちの方はこちら'}</h6>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default withCookies(Login);