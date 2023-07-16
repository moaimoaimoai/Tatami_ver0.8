import React from 'react';
import { useHistory } from "react-router-dom";
import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';

const FriendRecommendslider = (profileeach) => {
    const history = useHistory()
    const {profile, newRequestFriend, newUserIntUser, getUserInterest, followinguser } = useContext(ApiContext);
    const createNewRequest = () => {
        const uploadDataAsk = new FormData();
        uploadDataAsk.append("askTo",profileeach.profileeach.userProfile)
        uploadDataAsk.append("approved", false);
        newRequestFriend(uploadDataAsk);
      };

    const isfollow = 
      followinguser.find(item =>
        {return item.userProfile === profileeach.profileeach.userProfile})
    
    

    const toSpecificUserPage = () => {
    if (profile.userProfile === profileeach.profileeach.userProfile) {
        console.log("本人")
        history.push("/userpage")
    
    } else {
    const createdIntData = new FormData()
    createdIntData.append("intUserId", profileeach.profileeach.userProfile)
    newUserIntUser(createdIntData)
    console.log("ちがう")
    getUserInterest()
    history.push("/specificuserpage")}
    }




    return (
            <div className="card w150 d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 me-3 ">
                <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                    <figure className=" pointer overflow-hidden avatar ms-auto me-auto mb-0 position-relative w65 z-index-1" onClick={() => toSpecificUserPage()}><img src={profileeach.profileeach.img} alt="avater" className="float-right p-0 bg-white rounded-circle w-100 shadow-xss" /></figure>
                    <div className="clearfix"></div>
                    <h4 className="fw-700 font-xssss mt-3 mb-1 d-block w-100"> {profileeach.profileeach.nickName} </h4>
                    <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3 lh-2">{profileeach.profileeach.created_on}</p>
                    {!isfollow?
                    <button  className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white" onClick={() => createNewRequest()}>フォロー</button>:
                    <button  className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white" disabled>フォロー中</button>}


                </div>
            </div>
    )
    
}

export default FriendRecommendslider;