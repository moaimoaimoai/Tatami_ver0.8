import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { ApiContext } from "../context/ApiContext";
import Lightbox from "react-image-lightbox";
import { useLocation } from "react-router-dom";
import { SnackbarContext } from "../context/SnackbarContext";
import copy from '../context/clipboard';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const SpecificUserpageEach = (props) => {

  const { profile, newRequestFriend, intuser, followinguser, followPage, followingpage } =
    useContext(ApiContext);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const { pathname } = useLocation();
  const { newSnack } = useContext(SnackbarContext);

  const createNewRequest = () => {
    const uploadDataAsk = new FormData();
    uploadDataAsk.append("askTo", profile.userProfile);
    uploadDataAsk.append("approved", false);
    newRequestFriend(uploadDataAsk);
  };

  const isfollow = followinguser.find((item) => {
      return item.userProfile === intuser.userProfile;
  });

  const sharePage = () => {
    copy(window.location.href);
    newSnack("info", "リンクをコピーしました。");
  }

  return (
    <div className="card w-100 border-0  bg-white shadow-xss rounded-xxl">
      <div className="card-body d-block   pt-1 pb-0 ps-2 pe-2">
        {intuser.imgBackground ? (
          <div className="row ps-2 pe-2">
            <div className="col-sm-12 p-1">
              <img
                src={intuser.imgBackground}
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
        {intuser.id ? (
          // <figure className='avatar position-absolute w100 z-index-1' style={{top:'-40px',left:'30px'}}><img src={intuser.img} alt="avater" className='float-right p-1 bg-white rounded-circle w-100'/></figure>
          <div>
            {isOpenModal && (
              <Lightbox
                mainSrc={intuser.img}
                onCloseRequest={() => setIsOpenModal(false)}
              />
            )}
            <div onClick={() => setIsOpenModal(true)}>
              <figure
                className="avatar position-absolute w100 z-index-1"
                style={{ top: "-40px", left: "30px" }}
              >
                <img
                  src={intuser.img}
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
              src="https://ow6r85j5w096clt.site/media/image/サラリーマン.img"
              alt="avater"
              className="float-right p-1 bg-white rounded-circle w-100"
            />
          </figure>
        )}
        <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">
          {intuser.nickName}
          <span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">
            {intuser.created_on}
          </span>
        </h4>
        <div className="position-absolute bottom-15 mb-2 right-15">
          <button
            onClick={sharePage}
            className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
          >
            ユーザーをシェア
          </button>
          {!isfollow ? (
            <button
              className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
              onClick={() => createNewRequest()}
            >
              フォロー
            </button>
          ) : (
            <button
              className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
              disabled
            >
              フォロー中
            </button>
          )}
        </div>
      </div>

      <div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
        <ul
          className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4"
          id="pills-tab"
          role="tablist"
        >
          <li className="active list-inline-item me-5">
            <a
              className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block active"
              href="#navtabs1"
              data-toggle="tab"
            >
              投稿
            </a>
          </li>
          {/* <li className="list-inline-item me-5"><a className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block" href="#navtabs2" data-toggle="tab">モノ</a></li>
                    <li className="list-inline-item me-5"><a className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block" href="#navtabs3" data-toggle="tab">コト</a></li>
                    <li className="list-inline-item me-5"><a className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block" href="#navtabs4" data-toggle="tab">メディア</a></li> */}
        </ul>
      </div>
    </div>
  );
};

export default SpecificUserpageEach;
