import React, { Fragment, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Appfooter from "../components/Appfooter";
import FriendRecommendslider from "./FriendRecommendslider";
import Postview from "./Postview";
import HomePicture from "../components/HomePicture";
import Requestleft from "../components/Requestleft";
// import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
// import HomeReccomendPage from "./HomeReccomendPage";
import FollowingPage from "./FollowingPage";
import Button from "@mui/joy/Button";
import { useCookies } from "react-cookie";
import LoginComponent from "../components/LoginComponent";
import List from '@material-ui/core/List';
import AdvertisementView from "../components/AdvertisementView";
import { SnackbarContext } from "../context/SnackbarContext";
// import ProfileRecommender from "../components/ProfileRecommender";


const Home = (props) => {
  const {
    profiles,
    profile,
    // followinguserpost,
    //  monopages,
    postWithScroll,
    followingpage,
    ads
    //  followinguser
  } = useContext(ApiContext);

  // const { newSnack } = useContext(SnackbarContext);
  const [cookies] = useCookies(["current-token"]);
  //   const history = useHistory();
  const [count, setCount] = useState(0);
  const [postsbyscroll, setPostsbyscroll] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const result = await postWithScroll(count);
    console.log(result);
    setPostsbyscroll(prevItems => [...prevItems, ...result]);
    if (result != [])
    setIsLoading(false);
  }

  useEffect(() => {
    console.log('pageId:'+count);
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

  const friendsettings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: true,
  };

  const listFriendRecommendSliderLists =
    profile.id &&
    profiles.map((user) => (
      <FriendRecommendslider key={user.id} profileeach={user} />
    ));


  const getSpecificProfile = (id) => {
    return profiles.filter((item) => { return item.userProfile === id })[0];
  }

  const listFollowingPages =
    followingpage.map(page =>
      <FollowingPage
        key={page.id}
        monopage={page} />
    ).slice(0, 2)

  return (
    <Fragment>
      <Header />
      <Leftnav />

      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left">
            <div className="row feed-body">
              <div className="col-xl-8 col-xxl-9 col-lg-8">
                {!cookies["current-token"] ? (
                  <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 bg-current">
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
                <Slider {...friendsettings}>
                  {listFriendRecommendSliderLists}
                </Slider>

                <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 p-0">
                  <div className="ard-body d-flex align-items-center ps-4 pe-4 pt-3 pb-3">
                    <h4 className="fw-700 mb-0 font-xssss text-grey-900">
                      最近フォローした話題
                    </h4>
                    <Link
                      to="/followingpagelist"
                      className="fw-600 ms-auto font-xssss text-primary"
                    >
                      全て表示
                    </Link>
                  </div>
                  {listFollowingPages}
                </div>

                <Requestleft />

                <HomePicture />
                {
                  profiles &&
                  postsbyscroll.map((post, index) => (
                    <span key={index}>
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
                      {
                        index % 3 == 2 && parseInt(index / 3) < ads.length ?
                          <AdvertisementView
                            profile={getSpecificProfile(ads[parseInt(index / 3)].userId)}
                            item={ads[parseInt(index / 3)]}
                          /> :
                          <></>
                      }
                    </span>
                  ))
                }
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
              <div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
                {/* <Requestleft />
                                <HomePicture />
                                <div className='card w-100 shadow-xss rounded-xxl border-0 mb-3'>
                                    <div className='ard-body d-flex align-items-center p-4'>
                                        <h4 className='fw-700 mb-0 font-xssss text-grey-900'>フォロー中のページ</h4>
                                    </div>
                                    {listFollowingPages}


                                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Appfooter />
    </Fragment>
  );
};

export default Home;
