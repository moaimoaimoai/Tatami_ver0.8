import React,{useContext} from 'react';
import { Link } from 'react-router-dom';

import { ApiContext } from '../context/ApiContext'
import { useHistory } from "react-router-dom";
import LinearProgress from '@mui/joy/LinearProgress'

const OwningEach = (pageData, isfollow) => {
    const history = useHistory()
    const page = pageData
    const { newUserIntPage,getUserInterest } =  useContext(
        ApiContext
    );
    

    const toOwnPage = () => {
        newUserIntPage(page.pageData.id)
        getUserInterest()
        history.push("/owningpage")
    }

    return (
        <div className="col-md-5 col-sm-6 pe-2 ps-2">
        <div className="card w-100 p-0 hover-card shadow-xss border-0 rounded-3 overflow-hidden me-2 ms-2 mb-3" onClick={() => toOwnPage()}>
            {/* {value.feature ? <span className="font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-3 ls-2 bg-primary-gradiant d-inline-block text-white position-absolute mt-3 ms-3 z-index-1">Featured</span> : ''} */}
            <div className="card-image w-100 mb-3">
                <span className="position-relative d-block pointer"><img src={page.pageData.img} alt="hotel" className="w-100" /></span>
            </div>
            <div className="card-body pt-0">
                {/* <i className="feather-bookmark font-md text-grey-500 position-absolute right-0 me-3"></i> */}
                <h4 className="fw-700 font-xss mt-0 lh-28 mb-0 pe-3"><a href="/mono" className="text-dark text-grey-900">{page.pageData.title}</a></h4>
                <h6 className="font-xsssss text-grey-500 fw-600 mt-0 mb-2"> {page.pageData.created_on}</h6>

                <div className="card-body p-1 mb-3">
                <div className="row">
                    <div className="col-12">
                        <h2 className="font-xss  lh-1 mt-2 text-grey-900 fw-300">{pageData.pageData.rating}</h2>
                    </div>
                </div>
                <LinearProgress
                    color="info"
                    determinate
                    size="sm"
                    value= {pageData.pageData.rating}
                    variant="plain"
                    />
                </div>
                <div className="clearfix"></div>
                <span className="font-xsss fw-700 mt-0 pe-5 ls-2 lh-32 d-inline-block text-success float-left"><span className="font-xssss"></span>
                 {/* {page.pageData.summary.slice(0,10)}.. */}
                 </span>
                <Link to={`/mono/${page.pageData.id}`} className="position-absolute bottom-15 mb-5 ms-2 right-15"><i className="btn-round-sm bg-primary-gradiant text-white font-sm feather-chevron-right"></i></Link>
            </div>
        </div>
        </div>

    )
} 

export default OwningEach;