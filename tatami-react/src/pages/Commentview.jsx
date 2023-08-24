import React,{useContext} from 'react';
import { ApiContext } from '../context/ApiContext'
import { useHistory } from "react-router-dom";

const Commentview = ({commentData, profileData}) =>  {
    const history = useHistory()
    const { newUserInterest, getUserInterest, profile } =  useContext(
        ApiContext
    );

    const toSpecificUserPage = () => {
        if (profile.userProfile === profileData.userProfile) {
          console.log("本人");
          history.push("/userpage");
        } else {
          // const createdIntData = new FormData();
          // createdIntData.append("intUserId", profileeach.userProfile);
          // newUserIntUser(profileeach.userProfile);
          // console.log("ちがう");
          // getUserInterest();
          // getUserInterest();
          // getUserInterest();
          history.push(`/specificuserpage/${profileData.userProfile}`);
        }
      };

    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pe-4 pt-3 mb-2 mt-2">
            <div className="card-body p-0 d-flex pointer" onClick={() => toSpecificUserPage()}>
                {profileData ? <figure className="avatar me-3"><img src={profileData.img} alt="avater" className="shadow-sm rounded-circle w45" /></figure> :
                    <figure className="avatar me-3"><img src={process.env.REACT_APP_API_URL+"/media/image/サラリーマン.img"} alt="avater" className="shadow-sm rounded-circle w45" /></figure>}
                {profileData ? <h4 className="fw-700 text-grey-900 font-xssss mt-1"> {profileData.nickName} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"> {commentData.created_on}</span>
                </h4>:
                <h4 className="fw-700 text-grey-900 font-xssss mt-1"> Nick Name<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"> {commentData.created_on}</span>
                </h4>}
                
                {/* <div className="ms-auto pointer"><i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></div> */}
                
            </div>
            <div className="card-body p-0 me-lg-5" >
                <p className="fw-500 text-grey-600 lh-26 font-xssss w-100">{commentData.text}</p>
            </div>
        </div>
    );
    
}

export default Commentview;