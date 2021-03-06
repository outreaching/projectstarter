import React from 'react';
import './footer.scss';
import { useSelector } from 'react-redux'
const Footer = () => {
    const dark = useSelector(state => state.UserReducer.theme);
    return (
        <>
            <div className={dark}>
                <section className="main-footer ptb">

                    <div className="container">
                        <p className='footer_para'>ProjectStarter © Copyright 2022. All rights reserved.</p>
                        <p className='footer_para_bottom'>All trademarks and copyrights belong to their respective owners.</p>
                        {/* <div className="row">
                            <div className="col-sm-3 text-center">
                                <div className="inner-icon">
                                    <a className="navbar-brand" href="/">
                                        <img src={dark==='dark'?"/projectstarter-dark/logo-footer.svg":'/projectstarter/footer-logo.svg'} className="img-fluid" alt="" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-sm-2 text-center">
                                <div className="inner-icon">
                                    <h4><strong className='text-uppercase'>Social</strong></h4>
                                    <ul>
                                        <li>
                                            <a>Medium</a>
                                        </li>
                                        <li>
                                            <a>Telegram Community</a>
                                        </li>
                                        <li>
                                            <a>Telegram Announcements</a>
                                        </li>
                                        <li>
                                            <a>Twitter</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-2 text-center">
                                <div className="inner-icon">
                                    <h4><strong className='text-uppercase'>Token</strong></h4>
                                    <ul>
                                        <li>
                                            <a>CoinGecko</a>
                                        </li>
                                        <li>
                                            <a>CoinMarketCap</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-2 text-center">
                                <div className="inner-icon">
                                    <h4><strong className='text-uppercase'>Help</strong></h4>
                                    <ul>
                                        <li>
                                            <a>Terms of Services</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3 text-center">
                                <div className="inner-icon">
                                    <h4><strong className='text-uppercase'>Smart Contracts</strong></h4>
                                    <ul>
                                        <li>
                                            <a>Github</a>
                                        </li>
                                        <li>
                                            <a>Smart Contracts Audit (Coming Soon)</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div> */}

                    </div>
                </section>
            </div>

        </>
    )
}

export default Footer;
