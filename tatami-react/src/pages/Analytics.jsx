import React, { Component , Fragment } from "react";
import Chart from "react-apexcharts";

import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

class Analytics extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May' ,'Jun', 'Jul', 'Aug', 'Sep', 'Oct' , 'Nov', 'Dec'],
            series: [{
                name: '',
                data: [35, 66, 34, 56, 18 ,35, 66, 34, 56, 18 , 56, 18]
            },
            {
                name: '',
                data: [12, 34, 12, 11, 7 ,12, 34, 12, 11, 7 , 11, 7]
            }],
            options: {
                chart: {
                    type: 'bar',
                //   width:'100%',
                    height: 250,
                    stacked: true,
                    toolbar: {
                    show: false
                    },
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }],
                plotOptions: {
                    bar: {
                        horizontal: false,
                    },
                },
                legend: {
                    show: false
                },
                fill: {
                    opacity: 1
                },
            },
        };
    }
    render() {
        return (
            <Fragment>
                <Header />
                <Leftnav />

                <div className="main-content bg-white right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card w-100 border-0 shadow-none p-5 rounded-xxl bg-lightblue2 mb-3">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <img src="https://via.placeholder.com/420x270.png" alt="banner" className="w-100" />
                                            </div>
                                            <div className="col-lg-6 ps-lg-5">
                                                <h2 className="display1-size d-block mb-2 text-grey-900 fw-700">本当に効果のある広告を</h2>
                                                <p className="font-xssss fw-500 text-grey-500 lh-26">SNSに広告を出したいけど、本当に効果があるのかわからない... そんな悩みを抱えていませんか。Tatamiの広告はこれまでの従量課金制とは一味ちがう、ターゲット型。蓄積した膨大なデータを自由に分析して、本当に効果のある広告を出稿しませんか。</p>
                                                <a href="/analytics" className="btn w200 border-0 bg-primary-gradiant p-3 text-white fw-600 rounded-3 d-inline-block font-xssss">Advertise on Tatami</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 pe-2">
                                    <div className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3" style={{background:`#e5f6ff`}}>
                                        <div className="card-body d-flex p-0">
                                            <i className="btn-round-lg d-inline-block me-3 bg-primary-gradiant feather-home font-md text-white"></i>
                                            <h4 className="text-primary font-xl fw-700">2.3M <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">1日の閲覧回数</span></h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 pe-2 ps-2">
                                    <div className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3" style={{background:`#f6f3ff`}}>
                                        <div className="card-body d-flex p-0">
                                            <i className="btn-round-lg d-inline-block me-3 bg-secondary feather-lock font-md text-white"></i>
                                            <h4 className="text-secondary font-xl fw-700">44.6K <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">アクションユーザー</span></h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 pe-2 ps-2">
                                    <div className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3" style={{background:`#e2f6e9`}}>
                                        <div className="card-body d-flex p-0">
                                            <i className="btn-round-lg d-inline-block me-3 bg-success feather-command font-md text-white"></i>
                                            <h4 className="text-success font-xl fw-700">603 <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">クリック数</span></h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 ps-2">
                                    <div className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3" style={{background:`#fff0e9`}}>
                                        <div className="card-body d-flex p-0">
                                            <i className="btn-round-lg d-inline-block me-3 bg-warning feather-shopping-bag font-md text-white"></i>
                                            <h4 className="text-warning font-xl fw-700">3M <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">潜在ユーザー数</span></h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-3">
                                    <div className="card w-100 p-3 border-0 mb-3 rounded-xxl bg-lightblue2 shadow-none overflow-hidden">
                                        <Chart options={this.state.options}
                                        series={this.state.series}
                                        type="bar"
                                        width="100%"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Popupchat />
                <Appfooter />
            </Fragment>
        )
    }
 
}

export default Analytics;