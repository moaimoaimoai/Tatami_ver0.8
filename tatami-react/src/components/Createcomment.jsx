import React,{useCallback, useState} from 'react';
import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext'
import "./styles.css";
export const ASPECT_RATIO = 2 / 1;
export const CROP_WIDTH = 400;

const Createcomment = (commentTo, profileData) => {
    const { profile, createdcomment,setCreatedcomment,getUserInterest, createMonoComment} = useContext(ApiContext)
      
    const handleInputChange = () => event => {
        const value = event.target.value 
        const name = event.target.name 
        setCreatedcomment({...createdcomment, [name]:value, post: commentTo.commentTo})
        getUserInterest()

    }

    return (
        <form action="#">
        <div className='card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-1 pe-4 pb-2 mt-2'>
            <div className='card-body p-0 mt-3 position-relative'>
                <figure className='avatar position-absolute ms-2 mt-1 top-5'><img src={profile.img} alt="icon" className='shadow-sm rounded-circle w30'/>
                </figure>
                <textarea onChange={handleInputChange()} name='text' className='h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg' cols="30" rows="10" placeholder='コメントする...'></textarea>
            </div>
            
            <div className='card-body p-0 mt-0 mb-1 position-relative'>
                <div className='card-body p-0'>
                {createdcomment ? (
                <a className="pointer bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block" onClick={() => createMonoComment()}>投稿</a>)
                :   (
                <a className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block" disabled>投稿</a>)}
                </div>
            </div>

        </div>
        </form>
    )
}


export default Createcomment