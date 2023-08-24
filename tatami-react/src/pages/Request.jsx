import React, { Fragment } from "react";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Pagetitle from "../components/Pagetitle";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import RequestEach from "../components/RequestEach";
import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { useCookies } from "react-cookie";
import LoginComponent from "../components/LoginComponent";
import ProfileRecommender from "../components/ProfileRecommender";

const Request = () => {
  const { profiles, profile, friendrequest } = useContext(ApiContext);
  const [cookies] = useCookies(["current-token"]);
  const listProfiles =
    profile.id &&
    friendrequest.map((ask) => (
      <RequestEach
        key={ask.id}
        ask={ask}
        prof={profiles.find((item) => {
          return item.userProfile === ask.askFrom;
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
                <Pagetitle title="フレンド申請" />
                <div className="row ps-3 pe-3">
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
                  {listProfiles}
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

export default Request;
