
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
                            <div className="col-sm-12">
                                <div className="inner-content text-center">
                                    <div className="inner-img ">
                                        <h6 className="common mb-3">Welcome to <b>Projectstarter</b> </h6>
                                        <h1 className=""> Launchpad ipsam quia dolor voluptatem quia<span className="common ">voluptas sit aspernatur aut odit </span></h1>
                                        <p className="ptb20 grey">At vero eos et accusamus et iusto odio dignissimos ducimus qui blandis praesentium voluptatum deleniti <br /> atque corrupti quos dolores et quas molestias excepturi sint occaecati.</p>
                                        <ul className="list-inline d-sm-block d-none">
                                            <li className="list-inline-item mt-4">
                                                <Link to=''> <a href="#" target="_blank" className="btn-common "><img src="/projectstarter/banner/pancakeImg.svg" className="img-fluid mr-2 mb-1 pancakeBtn" alt="" /> Buy on PancakeSwap</a></Link>
                                            </li>
                                            <li className="list-inline-item mt-4">
                                                <Link to='/idoform'><a href="#" target="_blank" className="btn-common">Apply for IDO</a></Link>
                                            </li>
                                            <li className="list-inline-item  mt-4">
                                                <Link to='/projects'> <a href="#" target="_blank" className="btn-common">View All Projects</a></Link>
                                            </li>

                                        </ul>
                                        <ul className="list-inline d-sm-block mt-2 d-none">
                                            <li className="list-inline-item mt-4">
                                                <Link to=''><a href="#" target="_blank" className="btn-common2">Join us Telegram</a></Link>
                                            </li>
                                            <li className="list-inline-item mt-4">
                                                <Link to=''> <a href="#" target="_blank" className="btn-common2">Follow our Twitter</a></Link>
                                            </li>
                                            <li className="list-inline-item mt-4">
                                                <Link to=''> <a href="#" target="_blank" className="btn-common2">Github <img src="/projectstarter/banner/github.svg" className="img-fluid ml-2 mb-1 pancakeBtn " alt="" /></a></Link>
                                            </li>
                                            <li className="list-inline-item mt-4">
                                                <Link to='/rounds'> <a href="#" target="_blank" className="btn-common2">Seed Round<img src="/projectstarter/banner/github.svg" className="img-fluid ml-2 mb-1 pancakeBtn " alt="" /></a></Link>
                                            </li>
                                        </ul>

                                        <div className='d-flex flex-column d-sm-none d-block'>
                                       <Link to=''> <button href="#" target="_blank" className="btn-common w-100 mt-3"><img src="/projectstarter/banner/pancakeImg.svg" className="img-fluid mr-2 mb-1  pancakeBtn" alt="" /> Buy on PancakeSwap</button></Link>
                                       <Link to='/idoform'><button href="#" target="_blank" className="btn-common w-100 mt-3">Apply for IDO</button></Link>
                                       <Link to='/projects'> <button href="#" target="_blank" className="btn-common w-100 mt-3">View All Projects</button></Link>
                                       </div>
                                       <div className='d-flex flex-column mt-5 d-sm-none d-block'>
                                       <Link to=''><button href="#" target="_blank" className="btn-common2 w-100">Join us Telegram</button></Link>
                                       <Link to=''> <button href="#" target="_blank" className="btn-common2 mt-1 w-100">Follow our Twitter</button></Link>
                                       <Link to=''> <button href="#" target="_blank" className="btn-common2 mt-1 w-100">Github <img src="/projectstarter/banner/github.svg" className="img-fluid ml-2 mb-1 pancakeBtn " alt="" /></button></Link>
                                       <Link to='/rounds'> <button href="#" target="_blank" className="btn-common2 mt-1 w-100">Seed Round <img src="/projectstarter/banner/github.svg" className="img-fluid ml-2 mb-1 pancakeBtn " alt="" /></button></Link>
                                       </div>


                                    </div>
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
