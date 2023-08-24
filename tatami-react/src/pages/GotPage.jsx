import React, { Fragment, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ApiContext } from '../context/ApiContext'
import CircularProgress from "@material-ui/core/CircularProgress";


const GotPage = (props) => {
    const history = useHistory()
    const { ownPage } = useContext(
        ApiContext,
    );
    useEffect(() => {
        async function preSet() {
            const intPageId = localStorage.getItem('cartId')
            localStorage.removeItem('cartId')
            if (!intPageId) {
                history.push('/owningpage')
                return
            }
            await ownPage(intPageId)
            history.push('/owningpage')
        }
        preSet();
    }, [history, ownPage]);

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
                        style={{ backgroundImage: `${process.env.REACT_APP_API_URL}/media/image/login.jpg` }}></div>
                    <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                        <div className="card shadow-none border-0 ms-auto me-auto login-card">
                            <div className="card-body rounded-0 text-left">
                                <h2 className="fw-700 display1-size display2-md-size mb-3">ご購入いただき <br />ありがとうございます</h2>
                                <div className="col-sm-12 p-0 text-left">
                                    <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32"> </h6>
                                    {/* <a href="/owningpage">
                                        <div className="form-group mb-1">
                                            <button onClick={() => ownPage(intpage.id)}
                                                className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">購入を完了する</button>
                                        </div>
                                    </a> */}
                                    <CircularProgress />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default GotPage;