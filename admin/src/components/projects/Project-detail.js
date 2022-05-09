
import React, { useState } from 'react';
import './projects.scss';
import Navbar from '../landing/header/Navbar.js';
import Footer from '../landing/footer/Footer.js';
import Faqs from '../landing/faqs/Faqs.js'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
const ProjectDetail = () => {
    const dark = useSelector(state => state.UserReducer.theme);
    return (
        <>
            <div className={dark}>
                <section className="main-projectdetail">
                    <Navbar />
                    <div className="container">
                        <div className="row ptb">
                            <div className="col-md-6">
                                <div className="inner-content">
                                    <div className="inner-img">
                                        <div className="row">
                                            <div className="col-md-12 pl-0">
                                                <ul className="list-inline ptb20 d-flex align-items-center">
                                                    <li className="list-inline-item">
                                                        <div className="inner-logo">
                                                            <img src="\projectstarter\projectdetail-page\logo-one.png" className="img-fluid" alt="" />
                                                        </div>
                                                    </li>
                                                    <li className="list-inline-item d-flex justify-content-between align-item-center w-100">
                                                        <div className="inner-logo">
                                                            <h4 className="white">RocoFinance</h4>
                                                            <h5 className="white">ROCO</h5>
                                                        </div>
                                                        <div className="">
                                                            <button target="_blank" className="open-btn">open</button>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-md-12 p-0">
                                                <ul className="list-inline mt-3 d-flex align-items-center">
                                                    <li className="list-inline-item">
                                                        <img src="projectstarter/socials/world.svg" alt="" />
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <img src="projectstarter/socials/m-detail.svg" alt="" />
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <img src="projectstarter/socials/telegram-detail.svg" alt="" />
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <img src="projectstarter/socials/Twitter-detail.svg" alt="" />
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <p className="ptb20 white">At vero eos et accusamus et iusto odio dignissimos ducimus qui blandis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati.</p>
                                        <ul className="list-inline">
                                            <li className="list-inline-item ptb20">
                                                <a href="#" target="_blank" className="btn-white">Approve</a>
                                            </li>
                                            <li className="list-inline-item ptb20">
                                                <a href="#" target="_blank" className="btn-white">Join Pool</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='inner-contentCard my-5 my-md-0'>
                                    <div className="row mb-3">
                                        <div className="col-5">
                                            <div>
                                                <p>Your Balance</p>
                                                <h5 className='p-main'>0.0000 BUSD</h5>
                                                <h5 className='p-main'>0.0000 BNB</h5>
                                            </div>
                                        </div>
                                        <div className="col-5 p-0">
                                            <div>
                                                <p>Your approved amount:</p>
                                                <h5 className='p-main'>0.0000 BUSD</h5>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div>
                                                <p>Your Tier</p>
                                                <h5 className='p-main'>- -</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row my-4">
                                        <div className="col-md-5 col-6">
                                            <div>
                                                <p>Swapped</p>
                                                <h5 className='p-main'>0.0000 BUSD</h5>
                                                <p className='p-main1 font-weight-bold'>Roco</p>
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-6 p-0">
                                            <div>
                                                <p>Remaining Allocation</p>
                                                <h5 className='p-main'>0.0000 BUSD</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-1 mt-3">
                                        <div className="col-11 ">
                                            <h6 className="grey">Pool Progress</h6>
                                        </div>
                                        <div className="col-1 pl-0">
                                            <div className="inner-btn">
                                                <p className="grey font-weight-bold">50%</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={{ width: "30%" }} aria-valuenow="70"
                                                    aria-valuemin="20" aria-valuemax="100">
                                                </div>
                                            </div>
                                            <h6 className="common font-weight-bolder text mt-1">BUSD 500,000/$1,000,000</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="main-projectdetailtabs ptb">
                    <div className="container">
                        <div className="row ptb20">
                            <div className="col-md-12">
                                <nav>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Project Detail</a>
                                        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Schedule</a>
                                        <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Your Allocation</a>
                                    </div>
                                </nav>
                                <div className="tab-content mt-3" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                        <div className="row">
                                            <div className="col-md-6 pl-0">
                                                <div className="main-table">
                                                    <div className="table-responsive">
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Pool Information</th>
                                                                    <th scope="col"></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>

                                                                    <td>Opens</td>
                                                                    <td>2021-11-04 08:00:00 UTC</td>

                                                                </tr>
                                                                <tr>

                                                                    <td>FCFS Opens</td>
                                                                    <td>2021-11-04 08:00:00 UTC</td>

                                                                </tr>
                                                                <tr>

                                                                    <td>Closes</td>
                                                                    <td>2021-11-04 08:00:00 UTC</td>

                                                                </tr>
                                                                <tr>

                                                                    <td>Swap Rate</td>
                                                                    <td>1 BUSD = 142.8571 BITORB</td>

                                                                </tr>
                                                                <tr>

                                                                    <td>Cap</td>
                                                                    <td>119000 BUSD</td>

                                                                </tr>
                                                                <tr>

                                                                    <td>Total Users Participated</td>
                                                                    <td>2920</td>

                                                                </tr>
                                                                <tr>

                                                                    <td>Total Funds Swapped</td>
                                                                    <td>119000.8839 BUSD</td>

                                                                </tr>
                                                                <tr>

                                                                    <td>Access Type</td>
                                                                    <td>Private</td>

                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 pl-0">
                                                <div className="main-table">
                                                    <div className="table-responsive">
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Token Information</th>
                                                                    <th scope="col"></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>

                                                                    <td>Opens</td>
                                                                    <td>2021-11-04 08:00:00 UTC</td>

                                                                </tr>
                                                                <tr>

                                                                    <td>FCFS Opens</td>
                                                                    <td>2021-11-04 08:00:00 UTC</td>

                                                                </tr>
                                                                <tr>

                                                                    <td>Closes</td>
                                                                    <td>2021-11-04 08:00:00 UTC</td>

                                                                </tr>
                                                                <tr>

                                                                    <td>Swap Rate</td>
                                                                    <td>2021-11-04 08:00:00 UTC</td>

                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                        <div className="row">
                                            <div className="col-md-8 pl-0">
                                                <div className="main-table">
                                                    <div className="table-responsive">
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Round</th>
                                                                    <th scope="col">Opens</th>
                                                                    <th scope='col'>Closes</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>

                                                                    <td>Alloction</td>
                                                                    <td>2021-11-04 08:00:00 UTC</td>
                                                                    <td>FCFS-Start</td>

                                                                </tr>
                                                                <tr>

                                                                    <td>FCFS-Prepare</td>
                                                                    <td>2021-11-04 08:00:00 UTC</td>
                                                                    <td>2021-11-04 08:00:00 UTC</td>

                                                                </tr>
                                                                <tr>

                                                                    <td>FCFS-Start</td>
                                                                    <td>2021-11-04 08:00:00 UTC</td>
                                                                    <td>2021-11-04 08:00:00 UTC</td>

                                                                </tr>
                                                                <tr>

                                                                    <td>.</td>
                                                                    <td></td>
                                                                    <td></td>

                                                                </tr>
                                                                <tr>

                                                                    <td>.</td>
                                                                    <td></td>
                                                                    <td></td>

                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                        <div className="row">
                                            <div className="col-md-9 pl-md-0 order-md-0 order-1">
                                                <div className="main-table">
                                                    <div className="table-responsive">
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">NO.</th>
                                                                    <th scope="col">Allocation</th>
                                                                    <th scope='col'>Percentage</th>
                                                                    <th scope="col">Date</th>
                                                                    <th scope="col">Claimed</th>
                                                                    <th scope='col'>Aciton</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>

                                                                    <td>1</td>
                                                                    <td>0.0000</td>
                                                                    <td>10.00%</td>
                                                                    <td>Dex Listing</td>
                                                                    <td>0.0000</td>
                                                                    <td><button className='btn-common mt-0'>Claim Token</button></td>

                                                                </tr>

                                                                <tr>

                                                                    <td>2</td>
                                                                    <td>0.0000</td>
                                                                    <td>10.00%</td>
                                                                    <td>Dex Listing</td>
                                                                    <td>0.0000</td>
                                                                    <td><button className='btn-common mt-0'>Claim Token</button></td>

                                                                </tr>
                                                                <tr>

                                                                    <td>3</td>
                                                                    <td>0.0000</td>
                                                                    <td>10.00%</td>
                                                                    <td>Dex Listing</td>
                                                                    <td>0.0000</td>
                                                                    <td><button className='btn-common mt-0'>Claim Token</button></td>

                                                                </tr>
                                                                <tr>
                                                                    <td>4</td>
                                                                    <td>0.0000</td>
                                                                    <td>10.00%</td>
                                                                    <td>Dex Listing</td>
                                                                    <td>0.0000</td>
                                                                    <td><button className='btn-common mt-0'>Claim Token</button></td>

                                                                </tr>
                                                                <tr>
                                                                    <td>5</td>
                                                                    <td>0.0000</td>
                                                                    <td>10.00%</td>
                                                                    <td>Dex Listing</td>
                                                                    <td>0.0000</td>
                                                                    <td><button className='btn-common mt-0'>Claim Token</button></td>

                                                                </tr>
                                                                <tr>
                                                                    <td>6</td>
                                                                    <td>0.0000</td>
                                                                    <td>10.00%</td>
                                                                    <td>Dex Listing</td>
                                                                    <td>0.0000</td>
                                                                    <td>
                                                                        <button className='btn-common mt-0'>Claim Token</button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 text-center pr-md-0 my-2 order-md-1 order-0">
                                                <button className='btn-common w-100' data-toggle="modal" data-target="#exampleModalCenter">Add Token to MetaMask</button>
                                            </div>
                                        </div>


                                        {/* <!-- Modal --> */}
                                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">

                                                    <div class="modal-body">
                                                        <div className='text-center modal-inner-data ptb20'>
                                                            <p>Token Quantity</p>
                                                            <h3>  4132,311,121 PSR</h3>
                                                        </div>
                                                    </div>
                                                    <div class="ptb20 text-center">
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item">
                                                                <button className="btn-common">Add Token to MetaMask</button>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <button type="button" class="btn-common-outline" data-dismiss="modal">Cancel</button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Faqs />
                </section>

                <Footer />
            </div>
        </>
    )
}

export default ProjectDetail;