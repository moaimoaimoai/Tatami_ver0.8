import React, { Fragment, useState } from "react";
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
// import ProfileRecommender from "../components/ProfileRecommender";


const Home = (props) => {
  const {
    profiles,
    profile,
    followinguserpost,
    //  monopages,
    followingpage,
    //  followinguser
  } = useContext(ApiContext);

  const [cookies] = useCookies(["current-token"]);
  //   const history = useHistory();

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

  const listMonoPosts = followinguserpost.map((post) => (
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

  // const listMonoPages =
  //     monopages.map(page =>
  //         <HomeReccomendPage
  //         key = {page.id}
  //         pageData= {page}/>
  //     )

  const listFollowingPages = (
    <List>
      {
        followingpage.map((item) => {
          return <FollowingPage url={item.pageUrl}/>
        })
      }
    </List>
  )

  const [num, setNum] = useState(1);
  const [display, setDisplay] = useState(null);

  const slice = (arr, size) =>
    arr.flatMap((_, i, a) => (i % size ? [] : [a.slice(i, i + size)]));
  const slicedpostlist = slice(listMonoPosts, 5);

  const getMorePosts = () => {
    const next = num + 1;
    setNum(next);
    const slicedpostlistdisplay = slicedpostlist.slice(0, num);
    const display = slicedpostlistdisplay.map((posts) => <>{posts}</>);
    setDisplay(display);
  };

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
                {/* {listMonoPages[num]} */}
                {num === 1 ? slicedpostlist[0] : display}
                <div className="card-body p-0 mb-3">
                  <div className="text-center">
                    <Button
                      className=" fw-700 text-white font-xssss text-center bg-current "
                      onClick={() => getMorePosts()}
                      size="sm"
                      variant="solid"
                    >
                      さらに読み込み
                    </Button>
                  </div>
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
