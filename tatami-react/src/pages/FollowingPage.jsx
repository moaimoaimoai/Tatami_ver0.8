import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext'
import { useHistory } from "react-router-dom";


const FollowingPage = (monopage) => {
    const { newUserIntPage, getUserInterest } = useContext(
        ApiContext,
    );
    const history = useHistory()
    const toMonopage = () => {
        const createdIntData = new FormData()
        createdIntData.append("intPageId", monopage.monopage.id)
        newUserIntPage(createdIntData)
        // getUserInterest()
        // getUserInterest()
        // getUserInterest()
        // history.push("/mono")
    }

    return (
        <div className="pointer">
            <div className="card w-30 shadow-xss rounded-xxl border-0 pt-3 ps-3 pe-3 pb-2 me-2 ms-2 mb-2">
                <div className="card-body p-0 d-flex pointer" onClick={() => toMonopage()}>
                    <figure className="avatar me-3"><img src={monopage.monopage.img} alt="avater" className="shadow-sm rounded-3 w45" /></figure>
                    <h4 className="fw-700 text-grey-900 font-xssss"> {monopage.monopage.title}<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"> {monopage.monopage.created_on}</span>
                    </h4>
                </div>
            </div>
        </div>
    );
}

export default FollowingPage;