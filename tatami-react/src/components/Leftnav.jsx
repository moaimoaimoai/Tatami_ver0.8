import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const Leftnav = () => {
  return (
    <div className="navigation scroll-bar">
      <div className="container ps-0 pe-0">
        <div className="nav-content">
          <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
            <div className="av-caption fw-600 font-xssss text-grey-500">
              <span>見つけよう</span>
            </div>
            <ul className="mb-1 top-content">
              <li className="logo d-none d-xl-block d-lg-block"></li>
              <li>
                <Link to="/recommend" className="nav-content-bttn open-font">
                  <i className="feather-tv btn-round-md bg-blue-gradiant me-3"></i>
                  <span>投稿</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/revommendpages"
                  className="nav-content-bttn open-font"
                >
                  <i className="feather-globe btn-round-md bg-gold-gradiant me-3"></i>
                  <span>ページ</span>
                </Link>
              </li>
              <li>
                <Link to="/videos" className="nav-content-bttn open-font">
                  <i className="feather-zap btn-round-md bg-mini-gradiant me-3"></i>
                  <span>ユーザー</span>
                </Link>
              </li>
              <li>
                <Link to="/users" className="nav-content-bttn open-font">
                  <i className="feather-zap btn-round-md bg-mini-gradiant me-3"></i>
                  <span>ユーザー</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1">
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              <span></span>拡張機能
            </div>
            <ul className="mb-1">
              <li className="logo d-none d-xl-block d-lg-block"></li>
              <li>
                <Link
                  to="/analytics"
                  className="nav-content-bttn open-font h-auto pt-2 pb-2"
                >
                  <i className="font-sm feather-pie-chart me-3 text-grey-500"></i>
                  <span>Analytics</span>
                  <span className="circle-count bg-warning mt-0">企業限定</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="nav-content-bttn open-font h-auto pt-2 pb-2"
                >
                  <i className="font-sm feather-settings me-3 text-grey-500"></i>
                  <span>設定</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftnav;
