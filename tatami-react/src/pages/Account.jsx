import React, { Fragment } from "react";

import Header from '../components/Header';
import Leftnav from '../components/Leftnav'
import Appfooter from '../components/Appfooter'
import AccountEach from "../components/AccountEach";

const Account = () => {
    return (
        <Fragment>
            <Header />
            <Leftnav />
            <AccountEach />

            
            <Appfooter /> 
        </Fragment>
    )
    
}

export default Account;