import React, { useContext } from "react";
import { ApiContext } from "../context/ApiContext";

const UsersEach = ({ profileData, askData }) => {
  const { newRequestFriend, profile } = useContext(ApiContext);

  const newRequest = () => {
    const askUploadData = new FormData();
    askUploadData.append("askTo", profileData.userProfile);
    newRequestFriend(askUploadData);
  };

  return (
    <div className="col-md-3 col-sm-4 pe-2 ps-2">
      <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
        <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
          {profileData.img ? (
            <figure className="overflow-hidden avatar ms-auto me-auto mb-0 position-relative w65 z-index-1">
              <img
                src={profileData.img}
                alt="avater"
                className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
              />
            </figure>
          ) : (
            <figure className="overflow-hidden avatar ms-auto me-auto mb-0 position-relative w65 z-index-1">
              <img
                src="https://ow6r85j5w096clt.site/media/image/サラリーマン.img"
                alt="avater"
                className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
              />
            </figure>
          )}
          <div className="clearfix w-100"></div>
          <h4 className="fw-700 font-xsss mt-3 mb-0">
            {profileData.nickName}{" "}
          </h4>
          <p className="fw-500 font-xssss text-grey-500 mt-0 mb-3">
            {profileData.created_on}
          </p>
          {!askData[0] && profile.id ? (
            <button
              href=""
              className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
              onClick={() => newRequest()}
            >
              友達申請
            </button>
          ) : (
            <button
              href=""
              className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
              disabled
            >
              友達申請済
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersEach;
