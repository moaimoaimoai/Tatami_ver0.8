import React, { useReducer, Fragment, useEffect } from "react";
import { withCookies } from "react-cookie";
import axios from "axios";
import { Link } from 'react-router-dom';
import CircularProgress from "@material-ui/core/CircularProgress";
import {
    START_FETCH,
    FETCH_SUCCESS,
    ERROR_CATCHED,
} from "../components/actionTypes"

const initialState = {
    isLoading: true,
    error: "",
    isVerified: false
};
const EmailVerifyReducer = (state, action) => {
    switch (action.type) {
        case START_FETCH: {
            return {
                ...state,
                isLoading: true,
                error: ''
            };
        }
        case FETCH_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isVerified: true,
                error: ''
            };
        }
        case ERROR_CATCHED: {
            return {
                ...state,
                error: "Verification failed.",
                isLoading: false,
            };
        }
        default:
            return state;
    }
};

const EmailVerify = ({ props, match }) => {
    const [state, dispatch] = useReducer(EmailVerifyReducer, initialState);
    useEffect(() => {
        dispatch({ type: START_FETCH });

        axios.post(
            process.env.REACT_APP_API_URL + "/api/user/verify/",
            {
                id: match.params.id,
                key: match.params.key
            },
            {
                headers: { "Content-Type": "application/json" },
            }
        ).then(res => {
            if (res.data.message === 'OK') {
                dispatch({ type: FETCH_SUCCESS });
                setTimeout(() => {
                    window.location.href = '/login';
                }, 5000)
            }
        }).catch(err => {
            dispatch({ type: ERROR_CATCHED });
        });
    }, [match.params]);

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
                                {state.isLoading ?
                                    <h2 className="fw-700 display1-size display2-md-size mb-3">検証しています
                                        <br />Eメール</h2> : (
                                        state.isVerified ? <h2 className="fw-700 display1-size display2-md-size mb-3">おめでとうございます！
                                            <br />メールアドレスが確認されました。 <br />リダイレクトしています...</h2> :
                                            '')}
                                <h2 className="fw-700 display1-size display2-md-size mb-3">{state.error}</h2>
                                {state.isLoading && <CircularProgress />}
                                {!state.isLoading && state.isVerified && <CircularProgress style={{ color: 'green' }} />}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default withCookies(EmailVerify);