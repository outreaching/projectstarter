
import React, { useEffect, useState } from 'react';
import './banner.scss';
import Navbar from '../header/Navbar';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core'
import useApprove from '../../../hooks/useApprove';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
const Banner = () => {

    const dark = useSelector(state => state.UserReducer.theme);


    return (
        <>
            <div className={dark}>
                <section className="main-banner " id="banner">
                    <Navbar />
                    <div className="container">
                        <div className="row ptb">
                            <div className="col-sm-6">
                                <div className="inner-content text-center">
                                    <div className="inner-img ">
                                      
                                        <h1 className=""> Projects That Even  </h1>
                                        <h1 className=''>We Would Invest In</h1>
                                       
                                        <ul className="list-inline d-sm-block d-none">
                                            <li className="list-inline-item mt-4">
                                                <Link to=''> <a href="#" target="_blank" className="btn-common "><img src="/projectstarter/banner/pancakeImg.svg" className="img-fluid mr-2 mb-1 pancakeBtn" alt="" /> Buy PSR</a></Link>
                                            </li>
                                            <li className="list-inline-item mt-4">
                                                <Link to='/idoform'><a href="#" target="_blank" className="btn-common">List Project</a></Link>
                                            </li>
                                            <li className="list-inline-item  mt-4">
                                                <Link to='/projects'> <a href="#" target="_blank" className="btn-common">View Projects</a></Link>
                                            </li>

                                        </ul>
                                        {/* <ul className="list-inline d-sm-block mt-2 d-none">
                                            <li className="list-inline-item mt-4">
                                                <Link to=''><a href="https://www.instagram.com/projectstarter.io" target="_blank" className="btn-common2">Join us Telegram</a></Link>
                                            </li>
                                            <li className="list-inline-item mt-4">
                                                <Link to=''> <a href="https://twitter.com/starter_project" target="_blank" className="btn-common2">Follow our Twitter</a></Link>
                                            </li>
                                            <li className="list-inline-item mt-4">
                                                <Link to=''> <a href="#" target="_blank" className="btn-common2">Github <img src="/projectstarter/banner/github.svg" className="img-fluid ml-2 mb-1 pancakeBtn " alt="" /></a></Link>
                                            </li>
                                            <li className="list-inline-item mt-4">
                                                <Link to='/rounds'> <a href="#" target="_blank" className="btn-common2">Seed Round<img src="/projectstarter/banner/github.svg" className="img-fluid ml-2 mb-1 pancakeBtn " alt="" /></a></Link>
                                            </li>
                                        </ul> */}

                                        {/* <div className='d-flex flex-column d-sm-none d-block'>
                                       <Link to=''> <button href="#" target="_blank" className="btn-common w-100 mt-3"><img src="/projectstarter/banner/pancakeImg.svg" className="img-fluid mr-2 mb-1  pancakeBtn" alt="" /> Buy on PancakeSwap</button></Link>
                                       <Link to='/idoform'><button href="#" target="_blank" className="btn-common w-100 mt-3">Apply for IDO</button></Link>
                                       <Link to='/projects'> <button href="#" target="_blank" className="btn-common w-100 mt-3">View All Projects</button></Link>
                                       </div> */}
                                       <div className='d-flex flex-column mt-5 d-sm-none d-block'>
                                       <Link to=''><button href="#" target="_blank" className="btn-common2 w-100">Join us Telegram</button></Link>
                                       <Link to=''> <button href="#" target="_blank" className="btn-common2 mt-1 w-100">Follow our Twitter</button></Link>
                                       <Link to=''> <button href="#" target="_blank" className="btn-common2 mt-1 w-100">Github <img src="/projectstarter/banner/github.svg" className="img-fluid ml-2 mb-1 pancakeBtn " alt="" /></button></Link>
                                       <Link to='/rounds'> <button href="#" target="_blank" className="btn-common2 mt-1 w-100">Seed Round <img src="/projectstarter/banner/github.svg" className="img-fluid ml-2 mb-1 pancakeBtn " alt="" /></button></Link>
                                       </div>


                                       <ul className='list-inline ptb20 mt-5'>
                                    <li className='list-inline-item'>
                                        <div className='inner-user'>
                                            <img src='\opencanvas-my-profile-assets\binancedex.png' className='img-fluid'></img>

                                        </div>

                                    </li>
                                    <li className='list-inline-item'>
                                        <div className='inner-text-r'>
                                            <h6 className='grey'>BINANCE</h6>
                                            <p className=''>SMART CHAIN</p>
                                        </div>
                                    </li>
                                </ul>
                                    </div>
                                </div>
                            </div>
<div className='col-sm-6'>
    <div className=''>

    </div>
</div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Banner;
