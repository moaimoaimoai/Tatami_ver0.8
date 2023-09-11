import React, { useState } from "react";
import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import SpecificUserPageAdsEach from "./SpecificUserPageAdsEach";

const SpecificUserpageAds = (props) => {
    const { ads } = useContext(ApiContext);

    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
            <div className="card-body d-flex align-items-center  p-4">
                <h4 className="fw-700 mb-0 font-xssss text-grey-900">RecentAds</h4>
                {/* <a href="/home" className="fw-600 ms-auto font-xssss text-primary">全て見る</a> */}
            </div>
            <div className="card-body d-block pt-0 pb-2">
                {
                    ads.map((item, index) => {
                        if (item.userId == props.userId) {
                            return (
                                <SpecificUserPageAdsEach
                                    item={item}
                                    key={index}
                                />
                            )
                        } else {
                            return <></>
                        }
                    })
                }
            </div>
            {/* <div className="card-body d-block w-100 pt-0">
                <a href="/home" className="p-2 lh-28 w-100 d-block bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"><i className="feather-external-link font-xss me-2"></i> More</a>
            </div> */}
        </div>
    );
};

export default SpecificUserpageAds;
