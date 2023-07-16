import React  from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext'


const Appfooter = () => {
    const { profile} = useContext(
        ApiContext
      );

        return (
            <div className="app-footer border-0 shadow-lg bg-primary-gradiant">
                <Link to="/home" className="nav-content-bttn nav-center"><i className="feather-home"></i></Link>
                <Link to="/recommend" className="nav-content-bttn"><i className="feather-trending-up"></i></Link>
                <Link to="/recommenduser" className="nav-content-bttn" data-tab="chats"><i className="feather-user"></i></Link>           
                <Link to="/owningpages" className="nav-content-bttn"><i className="feather-zap"></i></Link>
                <Link to="/userpage" className="nav-content-bttn">
                { profile.id ?
                <img src={profile.img} alt="user" className="w40 shadow-xss rounded-circle" />:
                <img src="https://ow6r85j5w096clt.site/media/image/サラリーマン.jpeg" alt="user" className="w40 shadow-xss rounded-circle" />}

                </Link>
            </div>        
        );
    
}

export default Appfooter;