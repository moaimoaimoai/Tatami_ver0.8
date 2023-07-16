import React from 'react';
import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext'



const SpecificUserProfiledetail = () => {
    const {intuser } = useContext(ApiContext)

    return (
        <div className='card w-100 shadow-xss rounded-xxl border-0 mb-3'>
            <div className='card-body d-block p-4'>
                <h4 className='fw-700 mb-3 font-xsss text-grey-900'>About</h4>
                <p className='fw-500 text-grey-500 lh-24 font-xssss mb-0'>{intuser.caption}</p>
            </div>
        </div>
    )

}

export default SpecificUserProfiledetail;