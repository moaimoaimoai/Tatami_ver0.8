import React, {  Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Pagetitle from '../components/Pagetitle';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import UsersEach from '../components/UsersEach'
import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import { useCookies } from "react-cookie";
import LoginComponent from "../components/LoginComponent";
import ProfileRecommender from "../components/ProfileRecommender";


const Users = () => {

  const { profiles, profile,  askListFull} = useContext(
    ApiContext
  );
  const filterProfiles = profiles.filter((prof) => {
    return prof.id !== profile.id;
  });
  const [cookies, setCookie, removeCookie] = useCookies(["current-token"]);
  const listProfiles =
    filterProfiles &&
    filterProfiles.map((filprof) => (
      <UsersEach
        key={filprof.id}
        profileData={filprof}
        askData={askListFull.filter((ask) => {
          return (
            (filprof.userProfile === ask.askFrom) | (filprof.userProfile === ask.askTo)
          );
        })}
      />
    ));
    return (
        <Fragment>

            <Header />
            <Leftnav />

            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12">
                                <Pagetitle title="フレンド検索"/>
                                <div className="row ps-2 pe-2">
                                {!cookies["current-token"] ?
                                    <div className='card w-100 shadow-xss rounded-xxl border-0 mb-3 me-3 bg-current'>
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
                                    {listProfiles}
                                </div>
                                <div className="card-body p-0 mb-3">
                                <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                                <div className="snippet mt-2 ms-auto me-auto" data-title=".dot-typing">
                                    <div className="stage">
                                    <div className="dot-typing"></div>
                                    </div>
                                </div>
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


export default Users;