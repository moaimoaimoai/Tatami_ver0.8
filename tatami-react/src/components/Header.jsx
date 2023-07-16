import React from 'react';
import { Link , NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext'

import Darkbutton from './Darkbutton';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isNoti, setIsNoti] = useState(false)
    const toggleisNoti = () => setIsNoti( !isNoti);

    const { profile} = useContext(
        ApiContext
      );



    return (
        <div className="nav-header bg-white shadow-xs border-0">
            <div className="nav-top">
                <Link to="/home"><i className="feather-zap text-success display2-size me-3 ms-0"></i><span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Tatami </span> </Link>
                {/* <Link to="/videos" className="mob-menu me-2"><i className="feather-video text-grey-900 font-sm btn-round-md bg-greylight"></i></Link>
                <span  className="me-2 menu-search-icon mob-menu"><i className="feather-search text-grey-900 font-sm btn-round-md bg-greylight"></i></span> */}
                {/* <button onClick={this.toggleOpen} className={`nav-menu me-0 ms-2 ${buttonClass}`}></button> */}
            </div>
            

            


                
            <span className={`p-2 pointer text-center ms-auto menu-icon`} id="dropdownMenu3" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => toggleisNoti()}></span>

            { isOpen ?
            <div className={`dropdown-menu p-4 right-0 rounded-xxl border-0 shadow-lg show`} aria-labelledby="dropdownMenu3">
                <h4 className="fw-700 font-xss mb-4">通知</h4>
                <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                    <img src="assets/images/user.png" alt="user" className="w40 position-absolute left-0" />
                    <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">Kei Ichikawa <span className="text-grey-400 font-xsssss fw-600 float-right mt-1"> 3分前</span></h5>
                    <h6 className="text-grey-500 fw-500 font-xssss lh-4">少子化対策についてどう思う？に投稿が..</h6>
                </div>
                <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                    <img src="assets/images/user.png" alt="user" className="w40 position-absolute left-0" />
                    <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">Kei Ichikawa <span className="text-grey-400 font-xsssss fw-600 float-right mt-1"> 2分前</span></h5>
                    <h6 className="text-grey-500 fw-500 font-xssss lh-4">少子化対策についてどう思う？に投稿が..</h6>
                </div>

                <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                    <img src="assets/images/user.png" alt="user" className="w40 position-absolute left-0" />
                    <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">Kei Ichikawa <span className="text-grey-400 font-xsssss fw-600 float-right mt-1"> 1 分前</span></h5>
                    <h6 className="text-grey-500 fw-500 font-xssss lh-4">少子化対策についてどう思う？に投稿が..</h6>
                </div>
                <div className="card bg-transparent-card w-100 border-0 ps-5">
                    <img src="assets/images/user.png" alt="user" className="w40 position-absolute left-0" />
                    <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">Kei Ichikawa <span className="text-grey-400 font-xsssss fw-600 float-right mt-1"> 30秒前</span></h5>
                    <h6 className="text-grey-500 fw-500 font-xssss lh-4">少子化対策についてどう思う？に投稿が..</h6>
                </div>
            </div>: <></>
            }
            {/* <NavLink activeClassName="active" to="/home" className="p-2 text-center ms-3 menu-icon center-menu-icon"><i className="feather-home font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 "></i></NavLink>
            <NavLink activeClassName="active" to="/request" className="p-2 text-center ms-0 menu-icon center-menu-icon"><i className="feather-bell font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 "></i></NavLink> */}
            <Darkbutton />
            {profile.img ? 
            <Link to="/userpage" className="p-0 ms-3 menu-icon"><img src={profile.img} alt="user" className="w40 mt--1 rounded-circle" /></Link>:
            <Link to="/userpage" className="p-0 ms-3 menu-icon"><img src="https://ow6r85j5w096clt.site/media/image/サラリーマン.jpeg" alt="user" className="w40 mt--1 rounded-circle" /></Link>

            }

            <nav className="navigation scroll-bar">
                <div className="container ps-0 pe-0">
                    <div className="nav-content">
                        <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
                            <div className="nav-caption fw-600 font-xssss text-grey-500"><span></span>見つけよう</div>
                            <ul className="mb-1 top-content">
                                <li className="logo d-none d-xl-block d-lg-block"></li>
                                <li><Link to="/recommend" className="nav-content-bttn open-font"><i className="feather-zap btn-round-md bg-gold-gradiant me-3"></i><span>Topics</span></Link></li>
                                <li><Link to="/recommenduser" className="nav-content-bttn open-font"><i className="feather-user btn-round-md bg-success me-3"></i><span>Users</span></Link></li> 
                                {/* <li><Link to="/request" className="nav-content-bttn open-font"><i className="feather-bell btn-round-md bg-warning me-3"></i><span>Requests</span></Link></li>       */}
                                <li><Link to="/home" className="nav-content-bttn open-font"><i className="feather-home btn-round-md bg-orange me-3"></i><span>Home</span></Link></li>      

                            </ul>
                        </div>

                    
                        <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1">
                            <div className="nav-caption fw-600 font-xssss text-grey-500"><span></span> 拡張機能</div>
                            <ul className="mb-1">
                                <li className="logo d-none d-xl-block d-lg-block"></li>
                                <li><Link to="/owningpages" className="nav-content-bttn open-font h-auto pt-2 pb-2"><i className="font-sm feather-pie-chart me-3 text-grey-500"></i><span>購入したページ</span>
                                {/* <span className="circle-count bg-warning mt-0">企業限定</span> */}
                                </Link></li>
                                <li><Link to="/settings" className="nav-content-bttn open-font h-auto pt-2 pb-2"><i className="font-sm feather-settings me-3 text-grey-500"></i><span>設定</span></Link></li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            
            <div className="app-header-search">
                <form className="search-form">
                    <div className="form-group searchbox mb-0 border-0 p-1">
                        <input type="text" className="form-control border-0" placeholder="Search..." />
                        <i className="input-icon">
                            <ion-icon name="search-outline" role="img" className="md hydrated" aria-label="search outline"></ion-icon>
                        </i>
                        <span className="ms-1 mt-1 d-inline-block close searchbox-close">
                            <i className="ti-close font-xs" ></i>
                        </span>
                    </div>
                </form>
            </div>
            
        </div>
    );
    
}

export default Header;