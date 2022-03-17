import React from 'react';
import './features.scss';
import { useSelector } from 'react-redux'
const Features = () => {
    const dark = useSelector(state => state.UserReducer.theme);
    return (
        <>
            <div className={dark}>
                <section className="alocation ptb" id="whyus">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="main-tile1">
                                    <h1 className="common text-center">ROUND 1 - ALLOCATION ROUND</h1>
                                </div>
                            </div>
                        </div>
                        <div className="row ptb20">
                            <div className="col-sm-4">
                                <div className="main-tile active">
                                    <h5>Emerald</h5>
                                    <div className="brdr"></div>
                                    <p className="mt-4">Stake Requirement</p>
                                    <h3><strong>1,000 PSR</strong></h3>
                                    <p className="mt-4">Staking Length Required</p>
                                    <h5 className="">3 hours before Allocation<br /> Round opens</h5>
                                    <h5></h5>
                                    <p className="mt-4">Whitelist Requirement Twitter</p>
                                    <h5>Like, Comment & Retweet</h5>
                                    <p className="mt-4">Lottery Tickets</p>
                                    <h5 className=''>1</h5>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="main-tile">
                                    <h5>Ruby</h5>
                                    <div className="brdr"></div>
                                    <p className="mt-4">Stake Requirement</p>
                                    <h3><strong>2,000 PSR</strong></h3>
                                    <p className="mt-4">Staking Length Required</p>
                                    <h5 className="">3 hours before Allocation<br /> Round opens</h5>
                                    <h5></h5>
                                    <p className="mt-4">Whitelist Requirement Twitter</p>
                                    <h5>Like, Comment & Retweet</h5>
                                    <p className="mt-4">Lottery Tickets</p>
                                    <h5>3</h5>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="main-tile">
                                    <h5>Sapphire</h5>
                                    <div className="brdr"></div>
                                    <p className="mt-4">Stake Requirement</p>
                                    <h3><strong>3,000 PSR</strong></h3>
                                    <p className="mt-4">Staking Length Required</p>
                                    <h5 className="">3 hours before Allocation<br /> Round opens</h5>
                                    <h5></h5>
                                    <p className="mt-4">Whitelist Requirement Twitter</p>
                                    <h5>Like, Comment & Retweet</h5>
                                    <p className="mt-4">Lottery Tickets</p>
                                    <h5>6</h5>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="main-tile">
                                    <h5>Gold</h5>
                                    <div className="brdr"></div>
                                    <p className="mt-4">Stake Requirement</p>
                                    <h3><strong>10,000 PSR</strong></h3>
                                    <p className="mt-4">Staking Length Required</p>
                                    <h5 className="">3 hours before Allocation<br /> Round opens</h5>
                                    <h5></h5>
                                    <p className="mt-4">Whitelist Requirement Twitter</p>
                                    <h5>None</h5>
                                    <p className="mt-4">Guaranteed Allocation</p>
                                    <h5>Yes</h5>
                                    <p className="mt-4">Pool Weight</p>
                                    <h5>10</h5>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="main-tile">
                                    <h5>Platinum</h5>
                                    <div className="brdr"></div>
                                    <p className="mt-4">Stake Requirement</p>
                                    <h3><strong>20,000 PSR</strong></h3>
                                    <p className="mt-4">Staking Length Required</p>
                                    <h5 className="">3 hours before Allocation<br /> Round opens</h5>
                                    <h5></h5>
                                    <p className="mt-4">Whitelist Requirement Twitter</p>
                                    <h5>None</h5>
                                    <p className="mt-4">Guaranteed Allocation</p>
                                    <h5>Yes</h5>
                                    <p className="mt-4">Pool Weight</p>
                                    <h5>30</h5>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="main-tile">
                                    <h5>Diamond</h5>
                                    <div className="brdr"></div>
                                    <p className="mt-4">Stake Requirement</p>
                                    <h3><strong>30,000 PSR</strong></h3>
                                    <p className="mt-4">Staking Length Required</p>
                                    <h5 className="">3 hours before Allocation<br /> Round opens</h5>
                                    <h5></h5>
                                    <p className="mt-4">Whitelist Requirement Twitter</p>
                                    <h5>None</h5>
                                    <p className="mt-4">Guaranteed Allocation</p>
                                    <h5>Yes</h5>
                                    <p className="mt-4">Pool Weight</p>
                                    <h5>50</h5>
                                </div>
                            </div>
                        </div>
                        <p className="grey text-center ptb20">In the first round, called the “Allocation Round”, users can purchase the amount allotted to them based on their tier.</p>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Features;
