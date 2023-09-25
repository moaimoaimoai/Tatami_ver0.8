import React, { Fragment, useState, useEffect } from "react";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Appfooter from "../components/Appfooter";
import RecommenduserEach from "../components/RecommenduserEach";
import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { useCookies } from "react-cookie";
import LoginComponent from "../components/LoginComponent";
import ProfileRecommender from "../components/ProfileRecommender";

const Recommenduser = () => {
  const { profiles, profile, profilesWithScroll } = useContext(ApiContext);

  const [inputValue, setInputValue] = useState();
  const [showprofiles, setShowprofiles] = useState();
  const [profilesbyscroll, setProfilesbyscroll] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  // const [profilesbyscroll, setProfilesbyscroll] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    search(e.target.value);
  };
  const [cookies] = useCookies(["current-token"]);

  const search = (value) => {
    // 検索欄への入力が空の場合は早期return
    if (value === "") {
      setShowprofiles(profiles);
      return;
    }

    const searchedprofiles = profiles.filter(
      (user) => user.nickName.toUpperCase().indexOf(value.toUpperCase()) > -1
    );
    setShowprofiles(searchedprofiles);
  };

  const defaultProfiles =
    profile.id &&
    profilesbyscroll &&
    profilesbyscroll.map((profile, index) => (
      <RecommenduserEach key={index} profileeach={profile} />
    ));

  const listProfiles =
    profile.id &&
    showprofiles &&
    showprofiles.map((profile) => (
      <RecommenduserEach key={profile.id} profileeach={profile} />
    ));

  const fetchData = async () => {
    setIsLoading(true);
    const result = await profilesWithScroll(count);

    setProfilesbyscroll(prevItems => [...prevItems, ...result]);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [count])  

  // Fetch more data when user scrolls to the bottom
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 5 >=
      document.documentElement.offsetHeight && !isLoading
    ) {
      setCount((prev) => prev + 1);
    }
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []); 

  return (
    <Fragment>
      <Header />
      <Leftnav />

      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left pe-0">
            <div className="row">
              <div className="col-xl-12">
                <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                  <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900 d-flex align-items-center">
                    ユーザー
                    <form className="pt-0 pb-0 ms-auto">
                      <div className="search-form-2 ms-1">
                        <i className="ti-search font-xss"></i>
                        <input
                          type="text"
                          value={inputValue}
                          onChange={handleInputChange}
                          className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
                          placeholder=""
                        />
                      </div>
                    </form>
                    {/* <a href='/' className='btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3'><i className='feather-filter font-xss text-grey-500'></i></a> */}
                  </h2>
                </div>
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
                  {inputValue ? listProfiles : defaultProfiles}
                </div>

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

      <Appfooter />
    </Fragment>
  );
};

export default Recommenduser;
