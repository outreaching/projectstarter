import React from 'react';
import './about.scss';
import { useSelector } from 'react-redux'
const About = () => {
    const dark = useSelector(state => state.UserReducer.theme); 
    return (
        <>
            <div className={dark}>
                <section className="main-about ptb" id="aboutus">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="inner-img text-center">
                                    <img src={dark==='dark'?"/projectstarter/about-us/Projectstarter_Project-Detail dark.svg":"/projectstarter/about-us/Projectstarter_Project-Detail.svg"} className="img-fluid" alt="" />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="inner-content pt-3">
                                    <h6 className="common">Our <b>Story</b> </h6>
                                    <h4 className="ptb20">The crypto investor landscape today offers those with insider information an unfair advantage. We are here to give you that unfair advantage, revealing industry secrets and insider insights to you, our investors and stakers.</h4>
                                    <h4 className="">More importantly, unlike many other Launchpads out there, even the biggest ones, we will only list projects that we ourselves would invest in. We are not here to make money from you, we are here to make money with you. Together as a community, everyone wins.</h4>
                                    <h4 className='text-center pt-3'><strong>OUR FOUNDERS WILL INVEST ALONGSIDE YOU. YES WE ARE SERIOUS</strong></h4>
                                    {/* <p className="grey ptb20">
                                        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur.
                                    </p> */}
                                </div>
                                {/* <div className="inner-content pt-5">
                                    <h6 className="common">Introducing <b>ProjectStarter</b> </h6>
                                    <h4 className="ptb20">Founded by a team of crypto-savvy investors who are experts in different arenas of the crypto landscape. We are drawn together by the common purpose of making crypto and blockchain projects accessible to anyone who wants to get involved at the early stage.</h4>
                                    <h4 className="">We believe that everyone deserves a fair shot at success in the world of crypto. No matter how early or late you decide to get involved, we are here for you. And we want to prove it.</h4>
                                    <h4 className=''>By investing in these projects ourselves, we hope that it will be the vote of confidence and direction our community needed to take that leap of faith with us.</h4>
                                  
                                </div> */}
                            </div>
                        </div>
                        <div className="row ptb">

                        <div className="col-sm-6">
                                <div className="inner-content pt-5">
                                    <h6 className="common">Introducing <b>ProjectStarter</b> </h6>
                                    <h4 className="ptb20">Founded by a team of crypto-savvy investors who are experts in different arenas of the crypto landscape. We are drawn together by the common purpose of making crypto and blockchain projects accessible to anyone who wants to get involved at the early stage.</h4>
                                    <h4 className="">We believe that everyone deserves a fair shot at success in the world of crypto. No matter how early or late you decide to get involved, we are here for you. And we want to prove it.</h4>
                                    <h4 className=''>By investing in these projects ourselves, we hope that it will be the vote of confidence and direction our community needed to take that leap of faith with us.</h4>
                                  
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="inner-img text-center">
                                    <img src={dark==='dark'?"/projectstarter/about-us/Projectstarter_Project-Detail dark.svg":"/projectstarter/about-us/Projectstarter_Project-Detail.svg"} className="img-fluid" alt="" />
                                </div>
                            </div>
                         
                        </div>
                    </div>
                </section>
                <div className="row">
                    <div className="col-sm-12 p-0">
                        <div className="inner-img text-center">
                            <img src={dark==='dark'?"/projectstarter-dark/curve-top.png":"/projectstarter/curve-top.png"} className="img-fluid w100" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;
