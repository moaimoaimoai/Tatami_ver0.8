import React, { useReducer, Fragment, useContext } from "react";
import { withCookies } from "react-cookie";
import axios from "axios";
import { ApiContext } from '../context/ApiContext'
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
          error: "Email or password is not correct!",
          isLoading: false,
        };
      }
      // case INPUT_EDIT: {
      //   return {
      //     ...state,
      //     [action.inputName]: action.payload,
      //     error: "",
      //   };
      // }
      case INPUT_EDIT_LOG: {
        return {
          ...state,
          //[action.inputName]: action.payload,
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
          //[action.inputName]: action.payload,
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
    const [state, dispatch] = useReducer(loginReducer, initialState);
    const {profile} = useContext(ApiContext)
  
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
  
    const login = async (event) => {
      event.preventDefault();
      if (state.isLoginView) {
        try {
          dispatch({ type: START_FETCH });
          const res = await axios.post(
            "https://ow6r85j5w096clt.site/authen/",
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
        } catch {
          dispatch({ type: ERROR_CATCHED });
        }
      } else {
        try {
          dispatch({ type: START_FETCH });
          await axios.post(
            "https://ow6r85j5w096clt.site/api/user/register/",
            state.credentialsReg,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: TOGGLE_MODE });
        } catch {
          dispatch({ type: ERROR_CATCHED });
        }
      }
    };

  const toggleView = () => {
    dispatch({ type: TOGGLE_MODE });
  };


    return (
        <Fragment> 
            <div className="main-wrap">
                <div className="nav-header bg-transparent shadow-none border-0">
                    <div className="nav-top w-100">
                        <a href="/home"><i className="feather-zap text-success display1-size me-2 ms-0"></i><span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Tatami </span> </a>

        
                        {/* <a href="/login" className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl">ログイン</a>
                        <a href="/register" className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl">新規登録</a> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
                    style={{backgroundImage: `https://ow6r85j5w096clt.site/media/image/login.jpg`}}></div>
                        <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                            <div className="card shadow-none border-0 ms-auto me-auto login-card">
                                <div className="card-body rounded-0 text-left">
                                { state.isLoginView ?
                                <h2 className="fw-700 display1-size display2-md-size mb-3">Tatamiに <br />ログイン</h2>:
                                <h2 className="fw-700 display1-size display2-md-size mb-3">アカウントを <br />新規作成</h2>} 
                                    
                                    
                                    
                                        {state.isLoading && <CircularProgress />}
                                        { state.isLoginView ?
                                        <form onSubmit={login}>
                                        <div className="form-group icon-input mb-3">
                                            <i className="font-sm ti-email text-grey-500 pe-0"></i>
                                            <input onChange={inputChangedLog()} name="username" value={state.credentialsLog.username} type="text" className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Your Email Address" />                        
                                        </div>
                                        <div className="form-group icon-input mb-1">
                                          <input onChange={inputChangedLog()}name="password" value={state.credentialsLog.password} type="password" className="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="Password" />
                                          <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                        </div>
                                        <div className="form-check text-left mb-3">
                                              <input type="checkbox" className="form-check-input mt-2" id="exampleCheck5" />
                                              <label className="form-check-label font-xsss text-grey-500">自動でログインする</label>
                                              <a href="/forgot" className="fw-600 font-xsss text-grey-700 mt-1 float-right">パスワードをお忘れですか？</a>
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
                                        <input onChange={inputChangedReg()} name="email" type="text"  value={state.credentialsReg.email} className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Email" />                        
                                        </div>

                                        <div className="form-group icon-input mb-3">
                                            <input type="password" className="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="パスワード" />
                                            <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                        </div>
                                        <div className="form-group icon-input mb-1">
                                                <input type="password" onChange={inputChangedReg()} value={state.credentialsReg.password} name= "password"className="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="パスワード（確認）" />
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

                                    <h6 onClick={()=>toggleView()} className="pointer  text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">{state.isLoginView ? '初めてTatamiをご利用される方はこちら' : 'アカウントをお持ちの方はこちら'}</h6>
                                    
                                </div>
                            </div> 
                        </div>
                    
                </div>
            </div>
        </Fragment>
    );
}

export default withCookies(Login);