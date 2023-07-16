import React, {useState, Fragment, useContext} from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import Slider from "react-slick";
import 'react-image-lightbox/style.css';
import LinearProgress from '@mui/joy/LinearProgress'
import MonoPicture from "../components/MonoPicture";
import Createpost from '../components/Createpost';
import Postview from './Postview';
import { ApiContext } from '../context/ApiContext'
import Button from '@mui/joy/Button';
import { useCookies } from "react-cookie";
import LoginComponent from "../components/LoginComponent";
import ProfileRecommender from "../components/ProfileRecommender";
import { useHistory } from "react-router-dom";


const Mono = () => {
    const history = useHistory()

    const hotelsettings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: false,
        variableWidth: false,
        responsive: [{
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 420,
            settings: {
                slidesToShow: 1,
            }
        }]
    };

    const { profile, profiles, intpage, postsforintpage, followPage, followingpage,affiliates,owningpage, getUserInterest, newUserIntPage} =  useContext(
        ApiContext
    );

    const [cookies, setCookie, removeCookie] = useCookies(["current-token"]);

    const listMonoPosts = 
    profiles && 
        postsforintpage.map( post =>
            <Postview
            key={post.id}
            postData= {post}
            profileData = {profiles.find((item) =>{return item.userProfile === Number(post.userPost)})}
            reposting = {post.reposting}
            repostingProfileData = {profiles.find((item) => {return item.userProfile === post.repostingFromUser})}
                />)

    const [num, setNum] =useState(1)
    const [display, setDisplay] = useState(null)

    
    const slice = (arr, size) => arr.flatMap((_, i, a) => i % size ? [] : [a.slice(i, i + size)]);

    const slicedpostlist=slice(listMonoPosts, 5)


    const getMorePosts = () => {
        const next = num +1
        setNum(next)
        const slicedpostlistdisplay = slicedpostlist.slice(0, num)
        const display = slicedpostlistdisplay.map((posts) =>
        <>
        {posts}
        </>
        )
        setDisplay(display)
    }

    const toGetPage = () => {
        const createdIntData = new FormData()
        createdIntData.append("intPageId",intpage.intPageId)
        newUserIntPage(createdIntData)
        getUserInterest()
        getUserInterest()
        getUserInterest()
        getUserInterest()
        history.push("/getpage")
    }

    const toOwnPage = () => {
        const createdIntData = new FormData()
        createdIntData.append("intPageId",intpage.intPageId)
        newUserIntPage(createdIntData)
        getUserInterest()
        getUserInterest()
        getUserInterest()
        getUserInterest()
        history.push("/owningpage")
    }

    const rates = postsforintpage.map((post) => {
        return post.rating
    })
    let sum = 0
    for (let i = 0; i<rates.length; i++){
        sum += rates[i]
    }
    const rate = Math.round(sum/rates.length)

    const isfollow =
        followingpage.find(item=>
            {return item.id === intpage.id})
    
    const isown =
    owningpage.find(item=>
        {return item.id === intpage.id})

    

    return (
        <Fragment>
            <Header />
            <Leftnav />

            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-8 col-xxl-9 col-lg-8">
                            <div className="pe-2">
                                <img src={intpage.img} alt="avater" className="rounded-3 img-fluid w-100" />
                            </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-8 col-xxl-9 col-lg-8">

                                <div className="card d-block mt-3 border-0 shadow-xss bg-white p-lg-5 pt-4 p-4">
                                    {!isown ? 
                                    <span className="pointer font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-3 ls-2 bg-primary-gradiant d-inline-block text-white " onClick={() => toGetPage()}>このページの情報を取得しませんか？</span>:
                                    <span className="pointer font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-3 ls-2 bg-dark d-inline-block text-white " onClick={() => toOwnPage()}>購入済みのページ</span>}
                                    <h2 className="fw-700 font-lg mt-3 mb-2">{intpage.title}</h2>
                                    <p className="font-xsss fw-500 text-grey-500 lh-30 pe-3 mt-3">{intpage.summary}</p>
                                    <div>

                                    {/* <a href="/defaulthoteldetails" className="btn-round-lg ms-2 d-inline-block rounded-3 bg-greylight"><i className="feather-share-2 font-sm text-grey-700"></i></a>
                                    <a href="/defaulthoteldetails" className="btn-round-lg ms-2 d-inline-block rounded-3 bg-danger"><i className="feather-bookmark font-sm text-white"></i> </a> */}
                                    {!isfollow ?
                                    <Button className="bg-success  border-0 text-white fw-600 text-uppercase font-xssss float-left rounded-3 d-inline-block mt-0 p-2 lh-34 text-center pointer ls-3 w200 mb-3" onClick={() => followPage(intpage.id)}>この話題をフォロー</Button>
                                    :
                                    <Button className="bg-success border-0 text-white fw-600 text-uppercase font-xssss float-left rounded-3 d-inline-block mt-0 p-2 lh-34 text-center pointer ls-3 w200 mb-3" disabled >フォロー済み</Button>
                                    }
                                    </div>

                                    <div className="card w-100 border-0 mt-3 mb-4 p-lg-4 p-3 shadow-xss position-relative rounded-3 bg-white">
                                    <div className="section full mb-4 p-4 bg-light theme-dark-bg theme-light-bg rounded-3">
                                    
                                        <div className="row">
                                            <div className="col-12 text-center">
                                                <h4 className="font-xss text-grey-600 fw-600 mt-2">総シンパシー</h4>
                                            </div>
                                            {rate?
                                            <div className="col-12 text-center">
                                            <h2 className="display2-size lh-1 m-0 text-grey-900 fw-700">{rate}%</h2>
                                            </div>:
                                            <div className="col-12 text-center">
                                            <h2 className="display2-size lh-1 m-0 text-grey-900 fw-700">0%</h2>
                                            </div>
                                            }
                                            <div className="col-12 text-center">
                                                <h4 className="font-xssss text-grey-600 fw-600 mt-2">{postsforintpage.length}件のPost</h4>
                                            </div>
                                        </div>
                                        {rate ?
                                        <LinearProgress
                                        color="primary"
                                        determinate
                                        size="lg"
                                        value={rate}
                                        variant="soft"
                                        />:
                                        <LinearProgress
                                                color="primary"
                                                determinate
                                                size="lg"
                                                value={0}
                                                variant="soft"
                                                />
                                        }
                                        
                                    </div>
                                    
                                </div>


                                <div className="card d-block border-0 rounded-3 overflow-hidden p-4 shadow-xss mt-4 alert-success mb-4">
                                    <h2 className="fw-700 font-sm mb-3 mt-1 ps-1 text-success mb-4">概要</h2>
                                    <h4 className="font-xssss fw-500 text-grey-600 mb-3 pl-35 position-relative lh-24"><i className=" ti-check font-xssss btn-round-xs bg-success text-white position-absolute left-0 top-5"></i>{intpage.goodpoint}</h4>
                                    <h4 className="font-xssss fw-500 text-grey-600 mb-3 pl-35 position-relative lh-24"><i className="ti-close   font-xssss btn-round-xs bg-success text-white position-absolute left-0 top-5"></i>{intpage.badpoint}</h4>


                                </div>

                                <MonoPicture />

                                    <div className="card-body p-0 mt-4 d-flex">
                                        <div className="card-body p-0 mb-1">
                                                
                                            <div className="card shadow-xss rounded-xxl border-0 p-1 mb-0">
                                                
                                                <div className="card-body pointer">
                                                    <figure className="avatar"><img src={affiliates.img} alt="avater" className="shadow-sm rounded-3 img-fluid" /></figure>
                                                    <h4 className="fw-500 text-grey-500 font-xssss "> {affiliates.title}
                                                    </h4>
                                                    
                                                </div>
                                            </div>
                                           
                                        </div>
                                    </div>

                                </div>
                                {!cookies["current-token"] ?
                                <div className='card w-100 shadow-xss rounded-xxl border-0 mb-3 bg-current'>
                                <LoginComponent />
                                </div>:
                                <></>
                                }
                                {!profile.id ?
                                <div className='card w-100 shadow-xss rounded-xxl border-0 mb-3 bg-current'>
                                <ProfileRecommender />
                                </div>:
                                <></>
                                }

                                <Createpost 
                                postTo = {intpage.id}
                                profileData = {profile}/>

                                {num === 1 ?
                                    slicedpostlist[0]
                                    :
                                    display
                                }
                                <div className="card-body p-0 mb-3">
                                    <div className="text-center" >
                                        <Button
                                        className=" fw-700 text-white font-xssss text-center bg-current "
                                        onClick={() => getMorePosts()}
                                        size="sm"
                                        variant="solid"
                                        >さらに読み込み
                                        </Button>
                                    </div>
                                </div>
                                <div className="card-body p-0 mb-3">
                                <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                                <div className="snippet mt-2 ms-auto me-auto" data-title=".dot-typing">
                                    <div className="stage">
                                    <div className="dot-typing"></div>
                                    </div>
                                </div>
                                </div>
                                </div>          

                            </div>
                            <div className="col-xl-4 col-xxl-3 col-lg-4 ps-0">


                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Popupchat />
            <Appfooter /> 
        </Fragment>
    );
    
}

export default Mono;