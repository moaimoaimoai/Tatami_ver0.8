import React, {  StrictMode } from 'react';
import { CookiesProvider } from 'react-cookie';
import ApiContextProvider from "./context/ApiContext";



import "./main.scss"

// ユーザー毎の機能
import Home from "./pages/Home"
import RecommendPosts from "./pages/ReccomendPosts";
import Recommend from "./pages/Recommend";
import Userpage from "./pages/Userpage";
import Recommenduser from "./pages/Recommenduser";
import Request from "./pages/Request";
import Users from "./pages/Users";
import Following from './pages/Following';
import MutualFollowing from './pages/MutualFollowing';
import Followed from './pages/Followed';
import FollowingPageList from './pages/FollowingPageList';
import GetPage from './pages/GetPage';
import GotPage from './pages/GotPage';
import OwningPage from './pages/OwningPage';
import OwningPages from './pages/OwningPages';

// 内容
import Mono from "./pages/Mono";
import SpecificUserpage from "./pages/SpecificUserpage";

// 初期設定
import Login from "./pages/Login";
import Logout from './pages/Logout';

// 設定
import Settings from "./pages/Settings";
import Account from "./pages/Account";

// アナリティクス
import Analytics from "./pages/Analytics";

import { BrowserRouter, Switch, Route  } from 'react-router-dom';

import { CartProvider } from 'use-shopping-cart'

const App = () => {
    console.log(process.env.PUBLIC_URL)

        return(
            <ApiContextProvider>
            <StrictMode>
            <BrowserRouter basename="/">
                <CookiesProvider>
                <CartProvider
                    mode="payment"
                    cartMode="client-only"
                    stripe='pk_test_51NNq26BweimbndG7ZTF4PRIb3YuirtsHFCP0UqtJiHhnnJojYzAPU87AwNeiqmrtginNR33DRJwGIbk0Ffs8fwdJ00Zv3ekPaK'
                    currency="JPY"
                    successUrl="https://tatami.site/gotpage"
                    cancelUrl="https://tatami.site/mono"
                    billingAddressCollection={true}
                    >
                    <Route exact path = "/login" component={Login}/>
                    <Route exact path = "/home" component={Home}/>
                    <Route exact path = "/reccomendposts" component={RecommendPosts}/>
                    <Route exact path = "/recommend" component={Recommend}/>
                    <Route exact path = "/userpage" component={Userpage}/>
                    <Route exact path = "/recommenduser" component={Recommenduser}/>
                    <Route exact path = "/users" component={Users}/>
                    <Route exact path = "/mono" component={Mono}/>
                    <Route exact path = "/request" component={Request}/>
                    <Route exact path = "/login" component={Login}/>
                    <Route exact path = "/logout" component={Logout}/>
                    <Route exact path = "/settings" component={Settings}/>
                    <Route exact path = "/account" component={Account}/>
                    <Route exact path = "/analytics" component={Analytics}/>
                    <Route exact path = "/specificuserpage" component={SpecificUserpage}/>
                    <Route exact path = "/following" component={Following}/>
                    <Route exact path = "/mutualfollowing" component={MutualFollowing}/>
                    <Route exact path = "/followed" component={Followed}/>
                    <Route exact path = "/followingpagelist" component={FollowingPageList}/>
                    <Route exact path = "/getpage" component={GetPage}/>
                    <Route exact path = "/gotpage" component={GotPage}/>
                    <Route exact path = "/owningpage" component={OwningPage}/>
                    <Route exact path = "/owningpages" component={OwningPages}/>
                </CartProvider>
                </CookiesProvider>
            </BrowserRouter>
            </StrictMode>
            </ApiContextProvider>
            
        )
    
}


export default App;