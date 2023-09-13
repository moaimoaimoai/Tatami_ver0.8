import React, { Fragment } from "react";
import { withCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import Mail from '@material-ui/icons/Mail';

const Verify = (props) => {
    return (
        <Fragment>
            <div className="main-wrap">
                <div className="nav-header bg-transparent shadow-none border-0">
                    <div className="nav-top w-100">
                        <Link to="/home"><i className="feather-zap text-success display1-size me-2 ms-0"></i><span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Tatami </span> </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                        <div className="card shadow-none border-0 ms-auto me-auto login-card">
                            <div className="card-body rounded-0 text-center">
                                <div className="col-sm-12 p-0 text-center">
                                    <Mail style={{ fontSize: '10rem', color: '#4cd964' }} />
                                    <h2 className="display-1 font-lg fw-500 mt-0 mb-0 lh-32">続行するにはメールボックスをご確認してください。</h2>
                                    <p className="text-grey-600">{props.cookies.get('registered-email')}にメールを送信しました。メールを確認し、提供されたリンクをクリックしてください。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default withCookies(Verify);