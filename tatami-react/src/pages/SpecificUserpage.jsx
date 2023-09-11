import React, { Fragment, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import { ApiContext } from "../context/ApiContext";
// import Profiledetail from '../components/Profiledetail';
import SpecificUserpagePicture from "../components/SpecificUserpagePicture";
import SpecificUserpageEach from "../components/SpecificUserpageEach";
import SpecificUserpageAds from "../components/SpecificUserPageAds";
import Postview from "./Postview";
import SpecificUserProfiledetail from "../components/SpecificUserProfileDetail";
import AdvertisementView from "../components/AdvertisementView";
import { useCookies } from "react-cookie";
import LoginComponent from "../components/LoginComponent";

const SpecificUserpage = () => {
  const { profile, postsforintuser, profiles, newUserIntUser, ads, getProfile } = useContext(ApiContext);
  const posts = postsforintuser;

  const { userid } = useParams();

  useEffect(async () => {
    newUserIntUser(userid);
    window.scrollTo({ left: 0, top: 0 });
  }, [userid]);

  const [cookies] = useCookies(["current-token"]);

  const getSpecificProfile = (id) => {
    if (profiles.length == 0) return;
    return profiles.filter((item) => { return item.userProfile === id })[0];
  }

  const listMonoPosts = posts.map((post, index) => (
    <>
      <Postview
        key={post.id}
        postData={post}
        profileData={profiles.find((item) => {
          return item.userProfile === post.userPost;
        })}
        reposting={post.reposting}
        repostingProfileData={profiles.find((item) => {
          return item.userProfile === post.repostingFromUser;
        })}
      />
      {
        index % 5 == 4 && parseInt(index / 5) < ads.length ?
          <AdvertisementView
            profile={getSpecificProfile(ads[parseInt(index / 5)].userId)}
            item={ads[parseInt(index / 5)]}
          /> :
          <></>
      }
    </>
  ));

  return (
    <Fragment>
      <Header />
      <Leftnav />

      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left ps-2 pe-2">
            <div className="row">
              <div className="col-xl-12 mb-3 ">
                <SpecificUserpageEach />
              </div>
              <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0">
                <SpecificUserProfiledetail />
                <SpecificUserpagePicture />
                <SpecificUserpageAds userId={userid} />
              </div>
              <div className="col-xl-8 col-xxl-9 col-lg-8">
                {!cookies["current-token"] ? (
                  <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 me-3 bg-current">
                    <LoginComponent />
                  </div>
                ) : (
                  <></>
                )}
                {/* {!profile.id ?
                                    <div className='card w-100 shadow-xss rounded-xxl border-0 mb-3 bg-current'>
                                    <ProfileRecommender />
                                    </div>:
                                    <></>
                                    } */}

                {listMonoPosts}
                <div className="card-body p-0 mb-3">
                  <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                    <div
                      className="snippet mt-2 ms-auto me-auto"
                      data-title=".dot-typing"
                    >
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
};

export default SpecificUserpage;
