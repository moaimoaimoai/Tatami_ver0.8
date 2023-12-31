import React,{useState, useContext} from 'react';
import { ApiContext } from '../context/ApiContext'
import { useHistory } from "react-router-dom";
import Commentview from './Commentview';
import Createcomment from '../components/Createcomment';
import LinearProgress from '@mui/joy/LinearProgress';
import Lightbox from 'react-image-lightbox';

const Postview = ({postData, profileData,reposting, repostingProfileData}) =>  {
    const history = useHistory()
    const { profile,monocomments,  commentsforintpost,  monopages, profiles, newUserIntPage,likePost,newUserIntUser , getUserInterest,newUserIntPost, createRepost, monoposts} =  useContext(
        ApiContext, 
    );

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [tab1, setTab1] = useState(0)


    const toSpecificUserPage = () => {
        if (profile.userProfile === profileData.userProfile) {
            console.log("本人")
            history.push("/userpage")
        
        } else {
        const createdIntData = new FormData()
        createdIntData.append("intUserId", profileData.userProfile)
        newUserIntUser(createdIntData)
        console.log("ちがう")
        getUserInterest()
        history.push("/specificuserpage")
            
        }
    }

    const toSpecificUserPageRepost = () => {
        if (profile.userProfile === repostingProfileData.userProfile) {
            console.log("本人")
            history.push("/userpage")
        
        } else {
        const createdIntData = new FormData()
        createdIntData.append("intUserId", repostingProfileData.userProfile)
        newUserIntUser(createdIntData)
        console.log("ちがう")
        getUserInterest()
        history.push("/specificuserpage")
            
        }
    }

    const showcomment = () => {
        getUserInterest()
        const createdIntData = new FormData()
        createdIntData.append("intPostId", postData.id)
        newUserIntPost(createdIntData)
        getUserInterest()
        setIsOpen(!isOpen)
    }

    


    const listMonoComment =
    commentsforintpost &&
    commentsforintpost.map(comment =>
        <Commentview
        key={comment.id}
        commentData={comment}
        profileData= {profiles.find((item) => {return item.userProfile === Number(comment.userComment)})}
        />)
    
    const comments = monocomments.filter((item) => {return item.post === Number(postData.id)})
    const repostedtimes = monoposts.filter((item) => {return item.repostingFrom === Number(postData.id)})
    const targetpost = monoposts.find((item) => {
        return item.id === Number(postData.id)})
    const likedtimes = targetpost.liked


    const monopage = monopages.find((item) => {return item.id === Number(postData.reviewTo)})


    const toMonopage = () => {
        const createdIntData = new FormData()
        createdIntData.append("intPageId",postData.reviewTo)
        newUserIntPage(createdIntData)
        getUserInterest()
        getUserInterest()
        getUserInterest()
        history.push("/mono")
    }

    

    



    return (
        

        <div className="card w-100 shadow-xss rounded-xxl border-0 ps-3 pe-3 pt-3 pb-2 mb-3">
           
            {!reposting ?<>

            <div className="card-body ps-1 pe-1 pt-0 pb-0 d-flex">
                <div>
                    <div className="card-body p-0 d-flex"> 
                    { profileData ? <figure className="avatar me-3 pointer" onClick={() => toSpecificUserPage()} ><img src={profileData.img} alt="avater" className="shadow-sm rounded-circle w40"  /></figure>:
                    <figure className="avatar me-3"><img src="https://ow6r85j5w096clt.site/media/image/サラリーマン.img" alt="avater" className="shadow-sm rounded-circle w45" /></figure>}
                    {profileData ? <h4 className="fw-700 text-grey-900 font-xssss mt-1"> {profileData.nickName} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"> {postData.created_on}</span>
                    </h4>:
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1"> Nick Name<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"> {postData.created_on}</span>
                    </h4>}
                    </div>

                    <div className="card-body p-0 me-lg-5" >
                        <p className="fw-600 text-grey-600 lh-26 font-xssss w-100 mb-2">{postData.text}</p>
                    </div>
                </div>                
            </div>

             
            
            
            <div className="card-body d-block ps-1 pe-1 pt-0 pb-0">
            {postData.img ?
                <div className="row ps-2 pe-2">
                    <div className="col-sm-12 p-1">
                        {/* <img src={postData.img} className="rounded-3 w-100" alt="post" /> */}
                        {isOpenModal && (
                            <Lightbox
                                mainSrc={postData.img}
                                onCloseRequest={() => setIsOpenModal(false)}
                            />
                        )}
                         <div onClick={() => setIsOpenModal(true)}>
                            <a>
                                <img src={`${postData.img}`}  className="img-fluid rounded-3 w-100"/>
                            </a>
                        </div>
                    </div>                                        
                </div>
                : <></>}
            </div>
            <div className="pointer ">
            <div className="card shadow-xss rounded-xxl border-0 pt-3 pb-2 pe-3 ps-3 mb-0">
                <div className="card-body p-0 d-flex pointer" onClick={() => toMonopage()}>
                    <figure className="avatar me-3"><img src={monopage.img} alt="avater" className="shadow-sm rounded-3 w45" /></figure>
                    <h4 className="fw-600 text-grey-600 font-xssss"> {monopage.title.slice(0,12)}..
                    <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"> {monopage.created_on}</span>
                    </h4>
                    
                </div>

                <div className="card-body p-0 mb-2">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="font-xsssss  lh-1 mt-2 text-grey-600 fw-500">話題へのシンパシー：{postData.rating}%</h2>
                        </div>
                    </div>
                    <LinearProgress
                        color="info"
                        determinate
                        size="sm"
                        value= {postData.rating}
                        variant="soft"
                        />
                </div>
            </div>
            </div>

            <div className="card-body d-flex p-0 mt-1">
                <div className="emoji-bttn pointer d-flex align-items-center fw-600 text-grey-600 text-dark lh-26 font-xsssss me-2" onClick={() => likePost(postData)} ><i className="feather-thumbs-up text-dark text-grey-600 btn-round-sm font-sm"></i> {
                likedtimes.length} Liked</div>


                <a className="pointer d-flex align-items-center fw-600 text-grey-600 text-dark lh-26 font-xsssss" onClick={() => createRepost(postData)}><i className="feather-repeat text-dark text-grey-600 btn-round-sm font-sm"></i><span className="d-none-xss">{repostedtimes.length} Reposted</span></a>

                <a className="pointer d-flex align-items-center fw-600 text-grey-600 text-dark lh-26 font-xsssss" onClick={() => {
                    showcomment();}}><i className="feather-message-circle text-dark text-grey-600 btn-round-sm font-sm"></i><span className="d-none-xss">{comments.length} Comments</span></a>
                
            </div> 

            <div className="card-body d-block p-0">
                
                {isOpen ?
                <>
                {listMonoComment}
                <Createcomment
                commentTo = {postData.id}
                profileData= {profile}
                />
                </>
                : 
                <></>
                }
            </div></>


            :<>
            <div className="card-body ps-1 pe-1 pt-0 pb-0 d-flex">
                    { profileData ? <figure className="avatar me-3 pointer" onClick={() => toSpecificUserPage()} ><img src={profileData.img} alt="avater" className="shadow-sm rounded-circle w40"  /></figure>:
                    <figure className="avatar me-3"><img src="https://ow6r85j5w096clt.site/media/image/サラリーマン.img" alt="avater" className="shadow-sm rounded-circle w45" /></figure>}
                    {profileData ? <h4 className="fw-700 text-grey-900 font-xssss mt-1"> {profileData.nickName} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"> {postData.created_on}</span>
                    </h4>:
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1"> Nick Name<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"> {postData.created_on}</span>
                    </h4>}

                    

                </div>

            <div className="card w-100 shadow-xss rounded-xxl border-0 p-3 mb-1">
                <div className="card-body p-0 d-flex">
                    <div>
                        <div className="card-body p-0 d-flex">
                        { repostingProfileData ? <figure className="avatar me-3 pointer" onClick={() => toSpecificUserPageRepost()} ><img src={repostingProfileData.img} alt="avater" className="shadow-sm rounded-circle w30"  /></figure>:
                        <figure className="avatar me-3"><img src="https://ow6r85j5w096clt.site/media/image/サラリーマン.img" alt="avater" className="shadow-sm rounded-circle w45" /></figure>}
                        {repostingProfileData ? <h4 className="fw-700 text-grey-600 font-xsssss mt-1"> {repostingProfileData.nickName} <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500"> {postData.created_on}</span>
                        </h4>:
                        <h4 className="fw-700 text-grey-600 font-xsssss mt-1"> Nick Name<span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500"> {postData.created_on}</span>
                        </h4>}
                        </div>

                        <div className="card-body p-0 me-lg-5" >
                            <p className="fw-600 text-grey-500 lh-26 font-xssss w-100 mb-2">{postData.text}</p>
                        </div>
                        
                    </div>

                   
                    
                    <div className="card-body p-0 mb-1 d-flex">
                   
                    </div>
 
                    
                    
                </div>

                <div className="card-body d-block p-0">
                    {postData.img ?
                        <div className="row ps-2 pe-2">
                            <div className="col-sm-12 p-1"><img src={postData.img} className="rounded-3 w-100" alt="post" /></div>        
                                                            
                        </div>

                        : <></>}
                
                </div>
                <div className="pointer">
                            
                <div className="card shadow-xss rounded-xxl border-0 pt-3 pb-2 pe-3 ps-3 mb-0">
                    
                    <div className="card-body p-0 d-flex pointer" onClick={() => toMonopage()}>
                        <figure className="avatar me-3"><img src={monopage.img} alt="avater" className="shadow-sm rounded-3 w45" /></figure>
                        <h4 className="fw-600 text-grey-600 font-xssss"> {monopage.title.slice(0,12)}..<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"> {monopage.created_on}</span>
                        </h4>
                        
                    </div>
                    <div className="card-body p-0 mb-2">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="font-xsssss  lh-1 mt-2 text-grey-600 fw-500">話題へのシンパシー：{postData.rating}%</h2>
                        </div>
                    </div>
                    <LinearProgress
                        color="info"
                        determinate
                        size="sm"
                        value= {postData.rating}
                        variant="soft"

                        />
                    </div>
                </div>
                </div>
                </div>


            <div className="card-body d-flex  p-0">
                <div className="emoji-bttn pointer d-flex align-items-center fw-600 text-grey-600 text-dark lh-26 font-xsssss me-2" onClick={() => likePost(postData)} ><i className="feather-thumbs-up text-dark text-dark text-grey-600 btn-round-sm font-sm"></i> {
                likedtimes.length} Liked</div>

                <a className="pointer d-flex align-items-center fw-600 text-grey-600 text-dark lh-26 font-xsssss" onClick={() => showcomment()}><i className="feather-message-circle text-dark text-grey-600 btn-round-sm font-sm"></i><span className="d-none-xss">{comments.length} Comments</span></a>
                
            </div> 

            <div className="card-body d-block p-0">
                
                {isOpen ?
                <>
                {listMonoComment}
                <Createcomment
                commentTo = {postData.id}
                profileData= {profile}
                />
                </>
                : 
                <></>
                }
            </div>
            
            
            </>}
        </div>


    );
    
}

export default Postview;