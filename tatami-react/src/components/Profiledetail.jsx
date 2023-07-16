import React,{Component} from 'react';
import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext'



const Profiledetail = () => {
    const {profile, followinguser, mutualfollowinguser } = useContext(ApiContext)

    return (
        <div className='card w-100 shadow-xss rounded-xxl border-0 mb-3'>
            <div className='card-body d-block p-4'>
                <h4 className='fw-700 mb-3 font-xsss text-grey-900'>About</h4>
                <p className='fw-500 text-grey-500 lh-24 font-xssss mb-0'>{profile.caption}</p>
            </div>
            <div className="card-body d-flex pt-0">
                <i className="feather-user text-grey-500 me-3 font-lg"></i>
                <a href="/following">
                <h4 className="fw-700 text-grey-600 font-xssss mt-1 pointer">{followinguser.length}人のフォロー</h4></a>
            </div>
            <div className="card-body d-flex pt-0">
                <i className="feather-users text-grey-500 me-3 font-lg"></i>
                <a href="/mutualfollowing">
                <h4 className="fw-700 text-grey-600 font-xssss mt-1 pointer">{mutualfollowinguser.length}人の相互フォロー</h4></a>
            </div>
            <div className="card-body d-flex pt-0">
                <i className="feather-settings text-grey-500 me-3 font-lg"></i>
                <a href="/settings">
                <h4 className="fw-700 text-grey-600 font-xssss mt-1 pointer">設定</h4></a>
            </div>
        </div>
    )

}

export default Profiledetail;