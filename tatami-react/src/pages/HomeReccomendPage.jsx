import React,{ useContext,} from 'react';
import { ApiContext } from '../context/ApiContext'
import { useHistory } from "react-router-dom";
import LinearProgress from '@mui/joy/LinearProgress'

const HomeReccomendPage = (pageData) => {
    const history = useHistory()
    const page = pageData
    const { newUserIntPage,getUserInterest } =  useContext(
        ApiContext
    );

    const toMonopage = () => {
        const createdIntData = new FormData()
        createdIntData.append("intPageId",page.pageData.id)
        newUserIntPage(createdIntData)
        getUserInterest()
        history.push("/mono")
    }

    return (

        <div className="card w-100 p-0 hover-card shadow-xss border-0 rounded-3 overflow-hidden me-1 mb-3" onClick={toMonopage}>
            <div className="card-image w-100 mb-3">
                <a  href="#none" className="position-relative d-block"><img src={page.pageData.img} alt="hotel" className="w-100" /></a>
            </div>
            <div className="card-body pt-0">
                <i className="feather-bookmark font-md text-grey-500 position-absolute right-0 me-3"></i>
                <h4 className="fw-700 font-xss mt-0 lh-28 mb-0"><a href="/mono" className="text-dark text-grey-900">{page.pageData.title}</a></h4>
                <h6 className="font-xsssss text-grey-500 fw-600 mt-0 mb-2"> {page.pageData.created_on}</h6>

                <div className="card-body p-2">
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
                <span className="font-xsss fw-700 mt-0 pe-3 ls-2 lh-32 d-inline-block text-success float-left"><span className="font-xsssss">#</span> {page.pageData.summary} </span>
                <a href="/mono" className="position-absolute bottom-15 mb-2 right-15"><i className="btn-round-sm bg-primary-gradiant text-white font-sm feather-chevron-right"></i></a>
            </div>
        </div>
    )
} 

export default HomeReccomendPage;