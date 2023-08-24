import React, { Fragment, useState } from "react";
import { withCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from '@mui/joy/Alert';
import ReportIcon from '@material-ui/icons/Report';
import Typography from '@mui/joy/Typography';

const ForgotPassword = ({ props, match }) => {
    const [error, setError] = useState(null);
    const [sending, setSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [email, setEamil] = useState('');
    const inputChangedLog = () => (e) => {
        setError(null)
        setEamil(e.target.value)
    }
    const forgotPassword = async (e) => {
        e.preventDefault();
        if (email) {
            if (email.indexOf('@') < 0 || email.indexOf('.') < 0) {
                setError('無効なメールです！')
            } else {
                setSending(true)
                try {
                    const res = await axios.post(
                        process.env.REACT_APP_API_URL+"/api/user/forgot-password/",
                        { email: email },
                        {
                            headers: { "Content-Type": "application/json" },
                        }
                    );
                    console.log(res.data)
                    if (res.data.message === 'OK') {
                        setIsSent(true)
                        setError(null)
                    }
                    else {
                        setError('間違い！ ネットワーク接続を確認する。')
                    }
                    setSending(false)

                } catch (e) {
                    setSending(false)
                    if (e.response.data) {
                        setError(e.response.data)
                    }
                    else {
                        setError('間違い！ ネットワーク接続を確認する。')
                    }
                }
            }
        }
        else {
            setError('無効なメールです！')
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
                                    {/* <Mail style={{ fontSize: '10rem', color: '#4cd964' }} /> */}
                                    <div className="mb-3">
                                        <Link to="/home" ><i className="feather-zap text-success display1-size me-2 ms-0"></i><span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Tatami </span> </Link>
                                        <h2 className="mt-3">{!isSent ? 'パスワードをリセットします' : 'パスワードを送信しました'}</h2>
                                    </div>
                                    <p className="font-xsss">{!isSent ? 'ユーザーアカウントの認証済み電子メールアドレスを入力すると、パスワードリセットリンクが送信されます。' : '電子メールは' + email + 'に送信されました。 このメールアドレスがTatamiに登録されている場合は、新しいパスワードの設定方法についての説明が届きます。'}</p>
                                    {!isSent ? (
                                        <form onSubmit={forgotPassword}>
                                            <div className="form-group icon-input mb-3">
                                                <i className="font-sm ti-email text-grey-500 pe-0"></i>
                                                <input onChange={inputChangedLog()} name="email" value={email} type="text" className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Your Email Address" />
                                            </div>
                                            <div className="col-sm-12 p-0 text-left">
                                                {/* <h6 style={{ display: error ? 'block' : 'none' }} className="msr-error font-xsss fw-500 mt-0 mb-1 lh-32">
                                                    <span className="ps-sm-3">{error}</span>
                                                </h6> */}
                                                <span style={{ display: error ? 'block' : 'none', marginBottom: '15px' }}>
                                                    <Alert
                                                        sx={{ alignItems: 'flex-start' }}
                                                        startDecorator={React.cloneElement(<ReportIcon />, {
                                                            sx: { mt: '4px', mx: '4px' },
                                                            // fontSize: 'xl2',
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
                                                </span>

                                                <div className="form-group mb-1">
                                                    <button type="subimt" className="form-control text-center style2-input text-white fw-600 bg-current border-0 p-0 ">
                                                        パスワードリセットメールを送信 {sending ? <CircularProgress style={{ marginLeft: '20px', color: 'white', width: '20px', height: '20px', verticalAlign: 'middle' }} /> : ''}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    )
                                        :
                                        <>
                                        </>
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

export default withCookies(ForgotPassword);