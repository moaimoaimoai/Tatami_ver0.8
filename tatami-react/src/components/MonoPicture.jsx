
import React, { useState } from "react";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext'





const MonoPicture = () => {
    const { postsforintpage } =  useContext(
        ApiContext
    );
    const [tab1, setTab1] = useState(0)
    const [isOpen, setIsOpen] =useState(false)
    const listpostimg = postsforintpage.map(post =>
        post.img &&
         post.img)
    const listimg=listpostimg.filter(v=>v)



    const TabOne = [
        {
            image: '01',
            bigImage: listimg[0],
        },
        {
            image: '02',
            bigImage: listimg[1],
        },
        {
            image: '03',
            bigImage: listimg[2],
        },
        {
            image: '04',
            bigImage: listimg[3],
        },
        {
            image: '05',
            bigImage: listimg[4],
        },
        {
            image: '06',
            bigImage: listimg[5],
        },].slice(0,listimg.length)

    const closeRequest= () => {
        const a = (tab1 + TabOne.length - 1) % TabOne.length
        setTab1(a)
    }
    const moveNextRequest=()=>{
        const b = (tab1 + 1) % TabOne.length
        setTab1(b)
    }

    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
            <div className="card-body d-flex align-items-center  p-4">
                <h4 className="fw-700 mb-0 font-xssss text-grey-900">最近の画像</h4>
                {/* <a href="/home" className="fw-600 ms-auto font-xssss text-primary">全て見る</a> */}
            </div>
            <div className="card-body d-block pt-0 pb-2">
                <div className="row ps-3 pe-3">
                    {TabOne.map((value , index) => (
                        <div className="col-6 mb-1 p-1" key={index}>
                        {isOpen && (
                            <Lightbox
                                mainSrc={TabOne[tab1].bigImage}
                                onCloseRequest={() => setIsOpen(false)}
                                onMovePrevRequest={() => closeRequest()
                                }
                                onMoveNextRequest={() => moveNextRequest()
                                }
                            />
                        )}
                        
                        <div onClick={() => {setIsOpen(true);
                        setTab1(index)}}>
                            <a href="#portfolio-details">
                                <img src={`${value.bigImage}`}  className="img-fluid rounded-3 w-100"/>
                            </a>
                
                        </div>
                    
                    </div>
                    ))}
                </div>
            </div>
            {/* <div className="card-body d-block w-100 pt-0">
                <a href="/home" className="p-2 lh-28 w-100 d-block bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"><i className="feather-external-link font-xss me-2"></i> More</a>
            </div> */}
        </div>
    );
    
}

export default MonoPicture;