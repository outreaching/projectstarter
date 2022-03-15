import React from 'react';
import './community.scss';
import { useSelector } from 'react-redux'
const Community = () => {
    const dark = useSelector(state => state.UserReducer.theme);
    return (
        <>
            <section className="community ptb" id="community">
                <div className="container">
                    <div className="row d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        <div className="col-sm-12">
                            <div className="main-tile1">
                 
                                <ul className="list-inline ptb20">
                                    <li className="list-inline-item">
                                       <div className="inner-value">
                                           <h2 className="common">$85.8B+</h2>
                                           <h6 className="grey">Total volume</h6>
                                       </div>
                                    </li>
                                    <li className="list-inline-item">
                                       <div className="inner-value">
                                           
                                           <div className="brdr"></div>
                                       </div>
                                    </li>
                                    <li className="list-inline-item">
                                       <div className="inner-value">
                                           <h2 className="common">820K+</h2>
                                           <h6 className="grey">Total users</h6>
                                       </div>
                                    </li>
                                    <li className="list-inline-item">
                                       <div className="inner-value">
                                       <div className="brdr"></div>
                                       </div>
                                    </li>
                                    <li className="list-inline-item">
                                       <div className="inner-value">
                                           <h2 className="common">$4.97b</h2>
                                           <h6 className="grey">Total Liquidity (USD)</h6>
                                       </div>
                                    </li>
                                    <li className="list-inline-item">
                                       <div className="inner-value">
                                       <div className="brdr"></div>
                                       </div>
                                    </li>
                                    <li className="list-inline-item">
                                       <div className="inner-value">
                                           <h2 className="common">2,105</h2>
                                           <h6 className="grey">Total Liquidity (BNB)</h6>
                                       </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row d-block d-sm-none d-md-none d-lg-none d-xl-none">
                        <div className="col-sm-3">
                            <div className="main-tile1 text-center">
                                <div className="inner-value">
                                    <h2 className="common">$85.8B+</h2>
                                    <h6 className="grey">Total volume</h6>
                                </div>
                 
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="main-tile1 text-center">
                            <div className="inner-value">
                                           <h2 className="common">820K+</h2>
                                           <h6 className="grey">Total users</h6>
                                       </div>
                 
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="main-tile1 text-center">
                            <div className="inner-value">
                                           <h2 className="common">$4.97b</h2>
                                           <h6 className="grey">Total Liquidity (USD)</h6>
                                       </div>
                 
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="main-tile1 text-center">
                            <div className="inner-value">
                                           <h2 className="common">2,105</h2>
                                           <h6 className="grey">Total Liquidity (BNB)</h6>
                                       </div>
                 
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Community;
