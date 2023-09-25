import React, { useState, useContext, useEffect } from "react";
import { ApiContext } from "../context/ApiContext";
import { useHistory } from "react-router-dom";

const AdvertisementView = (props) => {

  const history = useHistory();
  const { addAdsCnt } = useContext(ApiContext);

  const toAdsDetail = () => {
    if (props.item.type == 1) addAdsCnt(props.item.id);
    if (props.item.url == null) {
      return;
    }
    window.location = props.item.url;
  }

  useEffect(() => {
  	if (props.item.type == 0) addAdsCnt(props.item.id);
  }, [])

  return (
    <div className="card w-100 shadow-xss rounded-xxl border-0 ps-3 pe-3 pt-3 pb-2 mb-3">
      <div className="relative">
        <div className="card-body p-0 d-flex">
          <div>
            <div className="card-body p-0 d-flex">
              <figure className="avatar me-3">
                <img
                  src={props.profile.img}
                  alt="avater"
                  className="shadow-sm rounded-circle w45"
                />
              </figure>
              <h4 className="fw-700 text-black font-xsssss mt-1">
                {" "}
                {props.profile.nickName}
                <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                  {props.item.created}
                </span>
              </h4>
            </div>

            <div className="card-body p-0 me-lg-5">
              <p className="text-black fw-700 lh-26 font-xs mb-2 text-break">
                {props.item.content}
              </p>
            </div>
          </div>

          <div className="card-body p-0 mb-1 d-flex"></div>
        </div>

        <div className="card-body d-block p-0">
          <div className="row ps-2 pe-2">
            <div className="col-sm-12 p-1 d-flex justify-content-center">
              <img
                className="rounded-3 pointer"
                alt="post"
                style={{maxHeight: "400px", maxWidth: "100%"}}
                src={props.item.img}
                onClick={toAdsDetail}
              />
            </div>
          </div>
        </div>

        {/* <div className="card-body d-flex  p-0">
          <div
            className="emoji-bttn pointer d-flex align-items-center fw-600 text-grey-600 text-dark lh-26 font-xsssss me-2"
          >
            <i className="feather-thumbs-up text-dark text-dark text-grey-600 btn-round-sm font-sm"></i>{" "}
            10 Liked
          </div>

          <a
            className="pointer d-flex align-items-center fw-600 text-grey-600 text-dark lh-26 font-xsssss"
          >
            <i className="feather-repeat text-dark text-grey-600 btn-round-sm font-sm"></i>
            <span className="d-none-xss">
              2 Reposted
            </span>
          </a>
        </div> */}
        <div className="position-absolute right-0 top-5 me-1">
          {/* <span className="text-grey-600">{">>>"}</span> */}
          <span className="fw-600">プロモーション</span>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementView;
