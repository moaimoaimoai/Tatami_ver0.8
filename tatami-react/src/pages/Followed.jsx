import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
// import Profiledetail from '../components/Profiledetail';
// import UserpagePicture from "../components/UserpagePicture";
import FollowEach from "../components/FollowEach";
import { useCookies } from "react-cookie";
import LoginComponent from "../components/LoginComponent";
// import ProfileRecommender from "../components/ProfileRecommender";

const Followed = () => {
  const {
    profile,
    //  monoposts,
    followeduser,
  } = useContext(ApiContext);
  // const posts = monoposts.filter(item =>{return item.userPost === profile.userProfile})
  const [cookies] = useCookies(["current-token"]);

  const listProfiles =
    profile.id &&
    followeduser.map((prof) => <FollowEach key={prof.id} prof={prof} />);

  return (
    <Fragment>
      <Header />
      <Leftnav />

      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left pe-0">
            <div className="row">
              <div className="col-xl-12 mb-3">
                <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
                  <div className="card-body d-block  p-3">
                    {profile.imgBackground ? (
                      <div className="row ps-2 pe-2">
                        <div className="col-sm-12 p-1">
                          <img
                            src={profile.imgBackground}
                            className="rounded-xxl w-100"
                            alt="post"
                          />
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="card-body p-0 position-relative">
                    {profile.id ? (
                      <figure
                        className="avatar position-absolute w100 z-index-1"
                        style={{ top: "-40px", left: "30px" }}
                      >
                        <img
                          src={profile.img}
                          alt="avater"
                          className="float-right p-1 bg-white rounded-circle w-100"
                        />
                      </figure>
                    ) : (
                      <figure
                        className="avatar position-absolute w100 z-index-1"
                        style={{ top: "-40px", left: "30px" }}
                      >
                        <img
                          src="https://ow6r85j5w096clt.site/media/image/サラリーマン.jpeg"
                          alt="avater"
                          className="float-right p-1 bg-white rounded-circle w-100"
                        />
                      </figure>
                    )}
                    <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">
                      {profile.nickName}
                      <span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">
                        {profile.created_on}
                      </span>
                    </h4>
                  </div>

                  <div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
                    <ul
                      className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="list-inline-item me-5">
                        <Link
                          className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                          to="/userpage"
                          data-toggle="tab"
                        >
                          投稿
                        </Link>
                      </li>
                      <li className="list-inline-item me-5">
                        <Link
                          className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                          to="/followingpagelist"
                          data-toggle="tab"
                        >
                          話題
                        </Link>
                      </li>
                      <li className="list-inline-item me-5">
                        <Link
                          className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                          to="/following"
                          data-toggle="tab"
                        >
                          フォロー
                        </Link>
                      </li>
                      <li className="active list-inline-item me-5">
                        <Link
                          className="active fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                          to="/following"
                          data-toggle="tab"
                        >
                          フォロワー
                        </Link>
                      </li>
                      <li className="list-inline-item me-5">
                        <Link
                          className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                          to="/mutualfollowing"
                          data-toggle="tab"
                        >
                          相互フォロー
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-xxl-3 col-lg-4 pe-3">
                {/* <Profiledetail />
                                <UserpagePicture /> */}
              </div>
              <div className="col-xl-12 col-xxl-12 col-lg-12">
                {!cookies["current-token"] ? (
                  <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 bg-current">
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
                <div className="row ps-2 pe-2">{listProfiles}</div>

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

export default Followed;
