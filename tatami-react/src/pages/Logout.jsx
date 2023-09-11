import React, {
  useContext,
  // useCallback, useState
} from "react";
import { ApiContext } from "../context/ApiContext";
import { Link } from "react-router-dom";
import {
  Button,
  // makeStyles
} from "@material-ui/core";
import { useCookies } from "react-cookie";
export const ASPECT_RATIO = 1 / 1;
export const CROP_WIDTH = 400;

const Logout = () => {
  const {
    profile,
    //  editedProfile, setEditedProfile, deleteProfile, setCover, coverBack, createProfile, editProfile
  } = useContext(ApiContext);

  const [cookies, setCookie, removeCookie] = useCookies(["current-token"]);
  const Logout = () => {
    removeCookie("current-token");
    window.location.replace("/login");
  };

  return (
    <div className="main-content bg-lightblue theme-dark-bg right-chat-active">
      <div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left">
          <div className="middle-wrap">
            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
              <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                <Link to="/settings" className="d-inline-block mt-2">
                  <i className="ti-arrow-left font-sm text-white"></i>
                </Link>
                <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">
                  ログアウト
                </h4>
              </div>
              <div className="card-body p-lg-5 p-4 w-100 border-0">
                <div className="row justify-content-center">
                  <div className="col-lg-4 text-center">
                    {profile.id ? (
                      <figure className="avatar ms-auto me-auto mb-0 mt-2 w100">
                        <img
                          src={profile.img}
                          alt="avater"
                          className="shadow-sm rounded-3 w-100"
                        />
                      </figure>
                    ) : (
                      <figure className="avatar ms-auto me-auto mb-0 mt-2 w100">
                        <img
                          src="https://ow6r85j5w096clt.site/media/image/サラリーマン.img"
                          alt="avater"
                          className="shadow-sm rounded-3 w-100"
                        />
                      </figure>
                    )}
                    <h2 className="fw-700 font-sm text-grey-900 mt-3">
                      {profile.nickName}
                    </h2>
                    <h4 className="text-grey-500 fw-500 mb-3 font-xsss mb-4">
                      {profile.created_on}
                    </h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 ">
                    <div className="file-upload-container">
                      <Button
                        onClick={() => Logout()}
                        className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
                        variant="contained"
                        component="label"
                      >
                        ログアウトする
                      </Button>
                      {/* <a href='/login'></a> */}
                    </div>
                    <div className="card-body  position-relative">
                      <label className="mont-font fw-600 font-xssss mb-2">
                        ！再ログインが必要になります！
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <Link
                      to="/settings"
                      className="bg-grey text-center text-black ms-2 font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
                    >
                      戻る
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
