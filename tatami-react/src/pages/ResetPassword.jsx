import React, { Fragment, useState, useReducer, useEffect } from "react";
import { withCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { INPUT_EDIT } from "../components/actionTypes"
import Alert from '@mui/joy/Alert';
import ReportIcon from '@material-ui/icons/Report';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Typography from '@mui/joy/Typography';

const initialState = {
    password1: "",
    password2: "",
};
const resetPasswordReducer = (state, action) => {
    switch (action.type) {
        case INPUT_EDIT: {
            return {
                ...state,
                [action.inputName]: action.payload,
            };
        }
        default:
            return state;
    }
};
const ResetPassword = ({props,match}) => {
    const [state, dispatch] = useReducer(resetPasswordReducer, initialState);
    const [email, setEmail] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [sending, setSending] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const inputChangedLog = () => (e) => {
        setError(null)
        dispatch({
            type: INPUT_EDIT,
            inputName: e.target.name,
            payload: e.target.value,
        });
    }

    useEffect(() => {
        setIsVerified(false)
        axios.post(
            process.env.REACT_APP_API_URL+"/api/user/verify-for-password-reset/",
            {
                id: match.params.id,
                key: match.params.key
            },
            {
                headers: { "Content-Type": "application/json" },
            }
        ).then(res => {
            if (res.data.email) {
                setIsVerified(true)
                setEmail(res.data.email)
            }
        }).catch(e => {
            if(e.response.data){
                setError(e.response.data)
            }
            else {
                setError('間違い！ ネットワーク接続を確認する。')
            }
        });
    }, [match.params]);

    const resetPassword = async (e) => {
        e.preventDefault();
        if (state.password1) {
            if (state.password1 !== state.password2) {
                setError('両方のパスワードが一致しません。')
            } else {
                setSending(true)
                try {
                    const res = await axios.post(
                        process.env.REACT_APP_API_URL+"/api/user/reset-password/",
                        {
                            email:email,
                            password: state.password1
                        },
                        {
                            headers: { "Content-Type": "application/json" },
                        }
                    );
                    if(res.data.message==='OK'){
                        setError(null)
                        setSuccess(true)
                    }
                    else{
                        setError('間違い！ ネットワーク接続を確認する。')
                    }
                    setSending(false)
                } catch(e) {
                    setSending(false)
                    if(e.response.data){
                        setError(e.response.data)
                    }
                    else {
                        setError('間違い！ ネットワーク接続を確認する。')
                    }
                }
            }
        }
        else {
            setError('新しいパスワードを入力してください')
        }
    }
    return (
        <Fragment>
            <div className="main-wrap">
                <div className="row">
                    <div className="col-xl-12 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                        <div className="card shadow-none border-0 ms-auto me-auto login-card">
                            <div className="card-body rounded-0 text-center">
                                <div className="col-sm-12 p-0 text-center">
                                    <div className="mb-3">
                                        <Link to="/home" ><i className="feather-zap text-success display1-size me-2 ms-0"></i><span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Tatami </span> </Link>
                                        <h2 className="mt-3">{isVerified ? 'パスワードをリセットします。' : (success ? 'パスワードがリセットされました。' : '電子メールを検証しています')}</h2>
                                    </div>
                                    <p className="font-xsss">{isVerified ? '新しいパスワードを選択してください。' : ''}</p>
                                    <div style={{ display: error ? 'block' : 'none' }} className="col-sm-12 p-0 text-left">
                                        <Alert
                                            sx={{ alignItems: 'flex-start' }}
                                            startDecorator={React.cloneElement(<ReportIcon />, {
                                                sx: { mt: '4px', mx: '4px' },
                                                
                                            })}
                                            variant="soft"
                                            color="danger"
                                        >
                                            <div>
                                                <Typography color="danger" fontSize="sm" sx={{ opacity: 0.8 }}>
                                                    {error}
                                                </Typography>
                                            </div>
                                        </Alert>
                                    </div>
                                    {isVerified && !success ? (
                                        <form onSubmit={resetPassword}>
                                            <div className="form-group icon-input mb-1">
                                                <input onChange={inputChangedLog()} name="password1" value={state.password1} type="password" className="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="Enter new password" />
                                                <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                            </div>
                                            <div className="form-group icon-input mb-1">
                                                <input onChange={inputChangedLog()} name="password2" value={state.password2} type="password" className="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="Confirm new password" />
                                                <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                            </div>
                                            <div className="col-sm-12 p-0 text-left">
                                                <div className="form-group mb-1">
                                                    <button type="subimt" className="form-control text-center style2-input text-white fw-600 bg-current border-0 p-0 ">
                                                        送信 {sending ? <CircularProgress style={{ marginLeft: '20px', color: 'white', width: '20px', height: '20px', verticalAlign: 'middle' }} /> : ''}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    )
                                        : (isVerified&&success ?
                                            <>
                                                <Alert
                                                    sx={{ alignItems: 'flex-start' }}
                                                    startDecorator={React.cloneElement(<CheckCircleIcon />, {
                                                        sx: { mt: '4px', mx: '4px' },
                                                        
                                                    })}
                                                    variant="soft"
                                                    color="success"
                                                >
                                                    <div>
                                                        <Typography color="success" fontSize="sm" sx={{ opacity: 0.8 }}>
                                                            あなたのパスワードはリセットされました
                                                        </Typography>
                                                    </div>
                                                </Alert>
                                                <br/>
                                                <Link to="/login" >
                                                    <button type="button" className="form-control text-center style2-input text-white fw-600 bg-current border-0 p-0 ">
                                                        ログイン
                                                    </button>
                                                </Link>

                                            </>

                                            :
                                            <CircularProgress style={{ color: 'green' }} />)
                                    }



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default withCookies(ResetPassword);