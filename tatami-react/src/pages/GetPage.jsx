import React, { 
    // useReducer, 
    Fragment,
    useContext,
    useEffect
 } from "react";
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import { ApiContext } from '../context/ApiContext'

const GetPage = (props) => {
    const history = useHistory();
    const { intpage } = useContext(
        ApiContext,
    );
    const checkoutSingleItem = () => {
        axios.post(
            process.env.REACT_APP_API_URL + "/api/user/create-checkout-session/",
            {
                SITE_URL : process.env.REACT_APP_PUBLIC_URL,
                pageId: intpage.id.toString()
            },
            {
                headers: { "Content-Type": "application/json" },
            }
        ).then(res => {
            window.location.replace(res.data.goTo);
        }).catch(err => {
            console.log(err);
        });
    }
//   const productData = [
//     {
//       name: 'Tatami Single Page',
//       price_id: 'price_1NNqrCBweimbndG767O4crda',
//       price: 100
//     },
//   ]

//   const toMonopage = () => {
//     const createdIntData = new FormData()
//     createdIntData.append("intPageId",postData.reviewTo)
//     newUserIntPage(createdIntData)
//     getUserInterest()
//     getUserInterest()
//     getUserInterest()
//     getUserInterest()
//     history.push("/mono")
// }
useEffect(()=>{
    console.log("intpage---", intpage)
    if(!intpage.id) {
        history.push("/home");
    }
}, [])
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
                    style={{backgroundImage: `https://ow6r85j5w096clt.site/media/image/login.jpg`}}></div>
                        <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                            <div className="card shadow-none border-0 ms-auto me-auto login-card">
                                <div className="card-body rounded-0 text-left">
                                <h2 className="fw-700 display1-size display2-md-size mb-3">このページの情報を <br />取得できます</h2>
                                        <div className="col-sm-12 p-0 text-left">
                                        <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32"> </h6>
                                        <div className="form-group mb-1">
                                          <button onClick={checkoutSingleItem} className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 mt-5 ">ページの情報を購入する</button>
                                        </div>
                                        </div>
                                </div>
                            </div> 
                        </div>
                </div>
            </div>
        </Fragment>
    );
}

export default GetPage;