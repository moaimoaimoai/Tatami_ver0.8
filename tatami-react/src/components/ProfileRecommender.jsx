// import React, { useReducer, Fragment, useContext } from "react";
// import { withCookies } from "react-cookie";
// import axios from "axios";
// import { ApiContext } from '../context/ApiContext'

const ProfileRecommender = () => {
  return (
    <div className="card shadow-none border-0 ms-auto me-auto login-card bg-current pt-4 pb-4 ps-3">
      <div className="card-body rounded-0 text-left p-0">
        <h2 className="fw-700 display1-size display2-md-size mt-5 mb-5 text-white">
          まずはプロフィールを
          <br />
          登録しよう
        </h2>

        <div className="col-sm-12 p-0 text-left mt-3">
          <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32"> </h6>
          <div className="form-group mb-1">
            <a href="/account">
              <button className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">
                プロフィールを作成
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileRecommender;
