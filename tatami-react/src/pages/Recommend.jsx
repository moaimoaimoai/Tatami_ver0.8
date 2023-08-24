import React, { Fragment, useContext } from "react";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import RecommendEach from "./RecommendEach";
import { ApiContext } from "../context/ApiContext";
import AttributeEach from "../components/AttributeEach";
import { useCookies } from "react-cookie";
import LoginComponent from "../components/LoginComponent";
import ProfileRecommender from "../components/ProfileRecommender";

const Recommend = () => {
  const { monopages, pageattribute, pagesforintattribute, profile } =
    useContext(ApiContext);
  const [cookies] = useCookies(["current-token"]);
  const defaultshowpages = monopages.map((page) => (
    <RecommendEach key={page.id} pageData={page} />
  ));
  const listshowpages =
    pagesforintattribute &&
    pagesforintattribute.map((page) => (
      <RecommendEach key={page.id} pageData={page} />
    ));

  const listattributes = pageattribute
    .map((attribute, index) => <AttributeEach key={index} attributeData={attribute} />)
    .slice(0, 5);

  return (
    <Fragment>
      <Header />
      <Leftnav />
      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left pe-0">
            <div className="row">
              <div className="col-xl-12 ">
                <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                  <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900 d-flex align-items-center">
                    ホットな話題
                    {/* <form action="#" className='pt-0 pb-0 ms-auto'>
                                    <div className='search-form-2 ms-2'>
                                        <i className='ti-search font-xss'></i>
                                        <input type='text' value={inputValue} onChange={handleInputChange} className='form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0' placeholder='ユーザーを探す'/>
                                    </div>
                                </form> */}
                    {/* <a href='/' className='btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3'><i className='feather-filter font-xss text-grey-500'></i></a> */}
                  </h2>
                </div>
                {/* {!cookies["current-token"] ?
                                <div className='card w-100 shadow-xss rounded-xxl border-0 ms-2 mb-3 me-3 bg-current'>
                                <LoginComponent />
                                </div>:
                                <></>
                                }
                            
                            {!profile.id ?
                            <div className='card w-100 shadow-xss rounded-xxl border-0 mb-3 bg-current'>
                            <ProfileRecommender />
                            </div>:
                            <></>
                            }
                             */}

                <div className="d-flex">
                  <div className="col-xl-4 col-xxl-3 col-lg-4 pe-3">
                    <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 p-3">
                      {listattributes}
                    </div>
                  </div>
                  <div className="col-xl-8 col-xxl-9 col-lg-8">
                    <div className="row mb-3 pe-3 ps-2 d-flex">
                      {pagesforintattribute ? listshowpages : defaultshowpages}
                    </div>

                    <div className="card-body p-0 mb-3">
                      <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                        <div
                          className="snippet mt-2 ms-auto me-auto"
                          data-title=".dot-typing"
                        >
                          <div className="stage">
                            <div className="dot-typing"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0" style={{maxWidth: "100%"}}>
                        <div className="row">
                            <div className="col-xl-12 scroll-bar">
                                <div className='card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3'>
                                    <h2 className='fw-700 mb-0 mt-0 font-md text-grey-900 d-flex align-items-center'>ホットな話題
                                   

                                    </h2>

                                </div>
                                <div className="ps-2 pe-2 d-flex">
                                    <div className="col-lg-3 me-3 col-md-3 col-sm-3 d-flex">
                                    <div className='card p-3 shadow-xss rounded-xxl border-0 mb-3 '>
                                        {listattributes}


                                    </div>
                                    </div>
                                    
                                    <div className="col-lg-9 me-3 col-md-9 col-sm-9 mb-3 pe-2 ps-2 d-flex">
                                    
                                        {pagesforintattribute ?
                                            listshowpages:
                                            defaultshowpages}
                                    </div>  
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

      <Popupchat />
      <Appfooter />
    </Fragment>
  );
};

export default Recommend;
