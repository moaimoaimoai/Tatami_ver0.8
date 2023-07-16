import React, {useContext} from 'react'
import { ApiContext } from '../context/ApiContext'
import { useHistory } from "react-router-dom";


export const RequestleftEach = ({ prof}) => {
    const { profile, newUserIntUser, getUserInterest,changeApprovalRequest, followinguser, newRequestFriend, getFriendRequest } = useContext(ApiContext);
    const history = useHistory()

    // const changeApproval = () => {
    //     const uploadDataAsk = new FormData();
    //     uploadDataAsk.append("askTo", ask.askTo);
    //     uploadDataAsk.append("approved", true);
    //     changeApprovalRequest(uploadDataAsk, ask);
    //     getFriendRequest()
    //   };
    
    const toSpecificUserPage = () => {
    if (profile.userProfile === prof.userProfile) {
        console.log("本人")
        history.push("/userpage")
    
    } else {
    const createdIntData = new FormData()
    createdIntData.append("intUserId", prof.userProfile)
    newUserIntUser(createdIntData)
    console.log("ちがう")
    getUserInterest()
    history.push("/specificuserpage")}
    }

    const createNewRequest = () => {
        const uploadDataAsk = new FormData();
        uploadDataAsk.append("askTo",prof.userProfile)
        uploadDataAsk.append("approved", false);
        newRequestFriend(uploadDataAsk);
      };

      const isfollow = 
      followinguser.find(item =>
        {return item.userProfile === prof.userProfile})
        

    
    
    return (
        <div className='wrap'>
            <div className='card-body d-flex pt-0 ps-4 pe-4 pb-0 bor-0'>
                <figure className='avatar me-3 pointer'onClick={() => toSpecificUserPage()}><img src ={prof.img} alt="avator" className='shadow-sm rounded-circle w45'/></figure>
                <h4 className='fw-700 text-grey-900 font-xssss mt-1'>{prof.nickName}<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{prof.created_on}にTatamiに参加</span></h4>
                
            </div>
            <div className='card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-2'>
                
                {/* {!isfollow?
                    <button  className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white" onClick={() => createNewRequest()}>フォロー</button>:
                    <button  className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white" disabled>フォロー中</button>} */}
                {/* <a href='' onClick={() => createNewRequest()} className='p-2 lh-20 w100 bg-primary-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl'>承認</a>
                <a className='p-2 lh-20 w100 bg-grey text-grey-800 text-center font-xssss fw-600 ls-1 rounded-xl'>削除</a> */}

            </div>
        </div>
        
    )
}

