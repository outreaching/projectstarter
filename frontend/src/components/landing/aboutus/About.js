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
                                    <h6 className="common">About <b>Projectstarter</b> </h6>
                                    <h4 className="ptb20">The 1st ever Crypto Launchpad was founded and managed by Singapore’s crypto-savvy team. Each has diverse backgrounds and vast experiences in key areas of Business Management, Digital Marketing, VC Fundraising, Software & Tech Development, Community and Influencer Management.</h4>
                                    <p className="grey">ProjectStarter founders are well-known speakers, entrepreneurs, and advisors to multiple large and fast-growing projects. The platform’s tech development and marketing team have numerous years of experience in building, promoting, and expanding various tech and crypto-related startups in the past. The management team is further aided and supported by an excellent team of Business and Strategic Advisors.</p>
                                    {/* <p className="grey ptb20">
                                        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur.
                                    </p> */}
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
