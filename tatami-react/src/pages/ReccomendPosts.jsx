import React, { Fragment,useContext } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Pagetitle from '../components/Pagetitle';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import RecommendEach from "./RecommendEach";
import { ApiContext } from '../context/ApiContext';
import { useCookies } from "react-cookie";
import LoginComponent from "../components/LoginComponent";
import ProfileRecommender from "../components/ProfileRecommender";





const RecommendPosts = () => {

    const { monopages, profile } =  useContext(
        ApiContext
    );
    const [cookies, setCookie, removeCookie] = useCookies(["current-token"]);


    const listMonoPages =
        monopages.map (page =>
            <RecommendEach
            key={page.id}
            pageData = {page}
            />)
    
    return (
        <Fragment>
            <Header />
            <Leftnav />

            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0" style={{maxWidth: "100%"}}>
                        <div className="row">
                            <div className="col-xl-10 col-xxl-9  chat-left scroll-bar">
                                <Pagetitle title="ホットな話題" />
                                <div className="row ps-2 pe-2">
                                <div className="col-lg-6 col-md-6 col-sm-6 mb-3 pe-2 ps-2">
                                    {!cookies["current-token"] ?
                                    <div className='card w-100 shadow-xss rounded-xxl border-0 mb-3 bg-current'>
                                    <LoginComponent />
                                    </div>:
                                    <></>
                                    }
                                    {!profile.id ?
                                    <div className='card w-100 shadow-xss rounded-xxl border-0 mb-3 bg-current'>
                                    <ProfileRecommender />
                                    </div>:
                                    <></>
                                    }
                                    {listMonoPages}
                                </div>  
                                
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Popupchat />
            <Appfooter />
        </Fragment>
    );
    
}

export default RecommendPosts;