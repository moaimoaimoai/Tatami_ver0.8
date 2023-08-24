import React, { Fragment } from "react";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { ApiContext } from "../context/ApiContext";
import Profiledetail from "../components/Profiledetail";
import UserpagePicture from "../components/UserpagePicture";
import Postview from "./Postview";
import Lightbox from "react-image-lightbox";
import { useCookies } from "react-cookie";
import LoginComponent from "../components/LoginComponent";
import ProfileRecommender from "../components/ProfileRecommender";

const Userpage = () => {
  const { profile, monoposts, profiles } = useContext(ApiContext);
  const [cookies] = useCookies(["current-token"]);
  const posts = monoposts.filter((item) => {
    return item.userPost === profile.userProfile;
  });

  const listMonoPosts = posts.map((post) => (
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
  ));
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <Fragment>
      <Header />
      <Leftnav />

      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left ps-2 pe-2">
            <div className="row">
              <div className="col-xl-12 mb-3">
                <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
                  <div className="card-body d-block  pt-1 pb-0 ps-2 pe-2">
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
                      <div className="row ps-2 pe-2">
                        <div className="col-sm-12 p-1">
                          <img
                            src="https://ow6r85j5w096clt.site/media/image/default_background.jpg"
                            className="rounded-xxl w-100"
                            alt="post"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="card-body p-0 position-relative">
                    {profile.id ? (
                      // <figure className='avatar position-absolute w100 z-index-1' style={{top:'-40px',left:'30px'}}>
                      // <img src={profile.img} alt="avater" className='float-right p-1 bg-white rounded-circle w-100'/>
                      // </figure>
                      <div>
                        {isOpenModal && (
                          <Lightbox
                            mainSrc={profile.img}
                            onCloseRequest={() => setIsOpenModal(false)}
                          />
                        )}
                        <div onClick={() => setIsOpenModal(true)}>
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
                        </div>
                      </div>
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

                    <div className="position-absolute bottom-15 mb-2 right-15">
                      <Link to="/settings">
                        <button className="pointer mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white d-flex">
                          <i className="feather-settings text-white mt-0  font-lg"></i>
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
                    <ul
                      className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="active list-inline-item me-5">
                        <Link
                          className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block active"
                          to="#navtabs1"
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
                      <li className="list-inline-item me-5">
                        <Link
                          className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                          to="/followed"
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
                <Profiledetail />
                <UserpagePicture />
              </div>
              <div className="col-xl-8 col-xxl-9 col-lg-8">
                {!cookies["current-token"] ? (
                  <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 me-3 bg-current">
                    <LoginComponent />
                  </div>
                ) : (
                  <></>
                )}
                {/* {!profile.id ? (
                  <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 bg-current">
                    <ProfileRecommender />
                  </div>
                ) : (
                  <></>
                )} */}

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

export default Userpage;
