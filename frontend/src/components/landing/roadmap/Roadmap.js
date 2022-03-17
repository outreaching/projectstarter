import React from 'react';
import './roadmap.scss';
import { useSelector } from 'react-redux'
const Roadmap = () => {
    const dark = useSelector(state => state.UserReducer.theme);
    return (
        <>
            <div className={dark}>
                <div className="row">
                    <div className="col-sm-12 p-0">
                        <div className="inner-img text-center">
                            <img src={dark==='dark' ? '/projectstarter-dark/curve-bottom.png':'/projectstarter/curve-bottom.png' } className="img-fluid w100" alt="" />
                        </div>
                    </div>
                </div>
                <section className="main-rewards" id="roadmap">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="inner-img text-center">
                                    <h1 className="common">ROUND 2 - FCFS ROUND</h1>
                                </div>
                            </div>
                        </div>
                        <div className="row ptb">
                            <div className="col-sm-7">
                                <div className="inner-content ptb">
                                    <h4 className="ptb20">In round 2, the unsold tokens from the first round are made available on a FCFS basis, only to guaranteed tiers (Gold and above). These members can purchase an additional amount that is determined by a tier-based formula. This round is open until all tokens are sold, typically lasting for only a few minutes. After all the tokens are sold, the IDO is concluded.</h4>
                                    <p className="grey">WE WILL BE COLLECTING BOTH DATA AND FEEDBACK ON THE IDO STRUCTURE IN ORDER TO OPTIMIZE THE SYSTEM OVER TIME AS WELL AS TAKING INTO CONSIDERATION COMMUNITY FEEDBACK AND POTENTIAL DAO PROPOSALS.</p>
                                    <p className="grey ptb20">Our system is a predictable and provably fair system giving our users the proper incentives to accumulate and hold tokens and support each and every project launched. Over time, we will tweak weights, add new tiers and change other parameters as necessary to keep the system functional, competitive and rewarding for all community members.<br></br>$PSR is the next evolution of blockchain launchpads solving the fundamental flaws that plague existing launchpads. This platform benefits all holders of the token and allows for fair launches giving traders of all sizes the opportunity to invest in the best upcoming Binance Smart Chain projects.
</p>
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <div className="inner-img text-center">
                                    <img src="\projectstarter\round-two\round-two-illustration.svg" className="img-fluid" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Roadmap;
