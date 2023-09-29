import React, { useReducer, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { withCookies } from "react-cookie";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ApiContext } from "../context/ApiContext";
import { SnackbarContext } from "../context/SnackbarContext";
import {
    START_FETCH,
    FETCH_SUCCESS,
    ERROR_CATCHED,
    INPUT_EDIT_LOG,
    INPUT_EDIT_REG,
    TOGGLE_MODE,
} from "./actionTypes"

const initialState = {
    isLoading: false,
    isLoginView: true,
    error: "",
    credentialsLog: {
        username: "",
        password: "",
        confirmPassword: "",
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

const LoginComponent = (props) => {
    const history = useHistory();
    const [state, dispatch] = useReducer(loginReducer, initialState);
    const [user, setUser] = useState(null);
    const [isAgree, setAgree] = useState(false);    

    const { setToken } = useContext(ApiContext);
    const [gProfile, setGProfile] = useState(null);
    const { newSnack } = useContext(SnackbarContext);
    const inputChangedLog = () => (event) => {
        dispatch({
            type: INPUT_EDIT_LOG,
            inputName: event.target.name,
            payload: event.target.value,
        });
    };
    const inputChangedReg = () => (event) => {
        dispatch({
            type: INPUT_EDIT_REG,
            inputName: event.target.name,
            payload: event.target.value,
        });
    };

    const changeAgree = () => (e) => {
        setAgree(e.target.checked);
      };

    const gLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            dispatch({ type: START_FETCH });
            setUser(codeResponse);
        },
        onError: (error) => console.log('Login Failed:', error)
    });
    useEffect(() => {
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
                // (res.data.token
                //     ?
                //     (window.location.href = "/home")
                //     : (window.location.href = "/login"));
                dispatch({ type: FETCH_SUCCESS });
            }).catch(err => {
                dispatch({ type: ERROR_CATCHED });
            });
        }
    }, [gProfile, props]);

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
                dispatch({ type: FETCH_SUCCESS });
                newSnack("success", "ログインに成功しました。");
                // (res.data.token
                //     ?
                //     (window.location.href = "/home")

                //     : (window.location.href = "/login"));
                setToken(res.data.token);
            } catch (err) {
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
            if (isAgree) {
                dispatch({ type: START_FETCH });
                await axios.post(
                    process.env.REACT_APP_API_URL + "/api/user/register/",
                    {...state.credentialsReg, app_url : process.env.REACT_APP_PUBLIC_URL},
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                ).then(function () {              
                    dispatch({ type: FETCH_SUCCESS });
                    // dispatch({ type: TOGGLE_MODE });
                    newSnack("success", "登録に成功しました。");
				    history.push('/please-verify');
                }).catch(function (e) {
                    const pairs = Object.entries(e.response.data);
                    dispatch({ type: ERROR_CATCHED, inputName: 'error', payload: pairs[0][0]+':'+pairs[0][1], });
                    newSnack("error", "登録に失敗しました。");
                });
            } else {
                dispatch({ type: ERROR_CATCHED, inputName: 'error', payload: '規約に同意する必要があります。' });
            }
        }
    };

    const toggleView = () => {
        dispatch({ type: TOGGLE_MODE });
    };

    return (
        <div className="card shadow-none border-0 ms-auto me-auto login-card bg-current">
            <div className="card-body rounded-0 text-left">
                {state.isLoginView ?
                    <h2 className="fw-700 display1-size display2-md-size mb-3 text-white">Tatamiに <br />ログイン</h2> :
                    <h2 className="fw-700 display1-size display2-md-size mb-3 text-white">アカウントを <br />新規作成</h2>}
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
                        <div className="col-sm-12 p-0 text-left mt-3">
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
                            <input type="checkbox" className="form-check-input mt-2" id="exampleCheck2" onChange={changeAgree()} />
                            <label className="form-check-label font-xsss text-white">規約に同意する</label>
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
                <h6 onClick={() => toggleView()} className="pointer  text-white font-xsss fw-500 mt-2 mb-0 lh-32 ">{state.isLoginView ? '初めてTatamiをご利用される方はこちら' : 'アカウントをお持ちの方はこちら'}</h6>
            </div>
        </div>
    );
}

export default withCookies(LoginComponent);
