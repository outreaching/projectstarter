
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './projects.scss';
import Navbar from '../landing/header/Navbar.js';
import Footer from '../landing/footer/Footer.js';
import Faqs from '../landing/faqs/Faqs.js'
import axios from 'axios';
import { API_URL } from '../../utils/ApiURL';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import ComingSoon from './Comingsoon';
import OpenNow from './Opennow';
import ClosedNow from './Closednow';

const Projects = () => {
    const dark = useSelector(state => state.UserReducer.theme);
    const [opens, setOpens] = useState(false);

    const [openProject, setOpenProject] = useState([]);
    const [closedProject, setClosedProject] = useState([]);
    const [upcommingProject, setUpcommingProject] = useState([]);
    const GetOpenProject = async () => {
        try {
            setOpens(true)
            axios.post(`${API_URL}/v1/project/getAllOpenProject`)
                .then((response) => {
                    setOpens(false)
                    setOpenProject(response.data.data);
                    // toast.success('Project Added Successfully, Your Project will be Displayed Once admin approve', {
                    //     position: "top-right",
                    //     autoClose: 2000,
                    // });
                    // history.push("/");
                    // console.log("success response", response)
                }).catch((err) => {
                    setOpens(false)
                    toast.warning('Error While Adding Project', {
                        position: "top-right",
                        autoClose: 2000,
                    });
                    // console.log("error responce", err)
                })
        }
        catch (e) {
            console.log(e)
        }
    };

    const GetcloseProject = async () => {
        try {
            setOpens(true)
            axios.post(`${API_URL}/v1/project/getAllClosedProject`)
                .then((response) => {
                    setOpens(false);
                    setClosedProject(response.data.data);
                    // toast.success('Project Added Successfully, Your Project will be Displayed Once admin approve', {
                    //     position: "top-right",
                    //     autoClose: 2000,
                    // });
                    // history.push("/");
                    // console.log("success response", response)
                }).catch((err) => {
                    setOpens(false)
                    toast.warning('Error While Adding Project', {
                        position: "top-right",
                        autoClose: 2000,
                    });
                    // console.log("error responce", err)
                })
        }
        catch (e) {
            console.log(e)
        }
    };

    // console.log("data in projects:::::",upcommingProject)

    const GetupcommingProject = async () => {
        try {
            setOpens(true)
            axios.post(`${API_URL}/v1/project/getAllComingSoonPresaleProject`)
                .then((response) => {
                    setOpens(false)
                    // console.log("dataaaa",response.data.data)
                    setUpcommingProject(response.data.data)
                }).catch((err) => {
                    setOpens(false)
                    toast.warning('Error While Adding Project', {
                        position: "top-right",
                        autoClose: 2000,
                    });
                    // console.log("error responce", err)
                })
        }
        catch (e) {
            console.log(e)
        }
    };
    useEffect(() => {
        GetOpenProject()
        GetcloseProject()
        GetupcommingProject()
    }, [])
    return (
        <>
            <div className={dark}>
                <section className='projects-main '>
                    <Navbar />
                    {/* <OpenNow upcommingProject={openProject} />
                    <ClosedNow upcommingProject={closedProject} /> */}
                    <div className={dark}>
                        <section className="main-coming main-open">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="inner-content">
                                            <h2 className='inner_project_text'>
                                                <strong>Projects Open Now</strong>{" "}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="row ptb">
                                    {/* <div className="col-sm-12"> */}
                                        {/* <div className="row"> */}
                                        <div className="col-sm-6">
                                        <div className="upcoming_lock"><img src="./coming-soon-placeholder.png" alt="img" className='img-fluid'/></div>
                                        </div>
                                        <div className="col-sm-6">
                                        <div className="upcoming_lock"><img src="./coming-soon-placeholder.png" alt="img" className='img-fluid'/></div>
                                        </div>
                                            {openProject?.map((item, index) => {
                                                return (
                                                    // <div className="row">
                                                    <div className="col-sm-6">
                                                        <div key={index}>
                                                            <OpenNow item={item} />
                                                        </div>
                                                    </div>
                                                    // </div>
                                                )
                                            })}
                                        {/* </div> */}
                                    {/* </div> */}
                                </div>
                            </div>
                        </section>

                        <section className="main-coming main-open">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="inner-content">
                                            <h2 className='inner_project_text'>
                                                <strong>Projects Closed</strong>{" "}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="row ptb">
                                    {/* <div className="col-sm-12">
                                        <div className="row"> */}
                                        <div className='col-sm-6'>
                                       
                                        <div className="inner-card">
                                        <div className="lock"><i class="fas fa-lock"></i></div>
                                          <div className="row">
                                              <div className="col-9 text-left p-0">
                                                  <ul className="list-inline d-flex align-items-center">
                                                      <li className="list-inline-item ">
                                                          <div className="inner-img">
                                                              <img src="\projectstarter\project-card\project-logo.png" className="img-fluid" alt="" />
                                                          </div>
                                                      </li>
                                                      <li className="list-inline-item">
                                                          <div className="inner-img">
                                                              <h5>Yay Games</h5>
                                                              <p className="grey"><small>1 YAY = 12.23131 PSR</small></p>
                                                          </div>
                                                      </li>
                                                  </ul>
                                              </div>
                                              <div className="col-3 text-right p-0">
                                                  <div className="inner-btn">
                                                      <button className="project-closed">Open</button>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="progress-div">
                                              <div className="row mb-1 mt-3">
                                                  <div className="col-11 p-0">
                                                      <h5 className="grey">Pool Progress</h5>
                                                  </div>
                                                  <div className="col-1 p-0">
                                                      <div className="inner-btn">
                                                          <p className="grey">50%</p>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="row">
                                                  <div className="col-sm-12 p-0">
                                                      <div className="progress">
                                                          <div className="progress-bar" role="progressbar" style={{ width: "30%" }} aria-valuenow="70"
                                                              aria-valuemin="20" aria-valuemax="100">

                                                          </div>
                                                      </div>
                                                      <h5 className="common mt-1">BUSD 500,000/$1,000,000</h5>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="brdr"></div>
                                          <div className="ptb10 inner-small-cards">
                                              <div className="row">
                                                  <div className="col-sm-4 col-6 p-0">
                                                      <ul className='list-inline small-cards-ul d-flex align-items-center'>
                                                          <li className='list-inline-item'>
                                                              <img src={dark === 'dark' ? "/projectstarter/project-card/perticipants-icon-dark.svg" : "/projectstarter/project-card/perticipants-icon.svg"} className='img-fluid smallLogo' alt="" />
                                                          </li>
                                                          <div className="list-inline-item small-cards-ul-li2">
                                                              <p>Participants</p>
                                                              <p>20,250</p>
                                                          </div>
                                                      </ul>
                                                  </div>
                                                  <div className="col-sm-4 col-6 p-0">
                                                      <ul className='list-inline small-cards-ul d-flex align-items-center'>
                                                          <li className='list-inline-item'>
                                                              <img src={dark === 'dark' ? "/projectstarter/project-card/start-date-icon-dark.svg" : "/projectstarter/project-card/start-date-icon.svg"} className='img-fluid smallLogo' alt="" />
                                                          </li>
                                                          <div className="list-inline-item small-cards-ul-li2">
                                                              <p>Start-date</p>
                                                              <p>17-Dec-2021</p>
                                                          </div>
                                                      </ul>
                                                  </div>
                                                  <div className="col-sm-4 col-6 p-0">
                                                      <ul className='list-inline small-cards-ul d-flex align-items-center'>
                                                          <li className='list-inline-item'>
                                                              <img src={dark === 'dark' ? "/projectstarter/project-card/token-price-icon-dark.svg" : "/projectstarter/project-card/token-price-icon.svg"} className='img-fluid smallLogo' alt="" />
                                                          </li>
                                                          <div className="list-inline-item small-cards-ul-li2">
                                                              <p>Token Price</p>
                                                              <p>$0.30</p>
                                                          </div>
                                                      </ul>
                                                  </div>

                                                  <div className="col-sm-4  mt-sm-4 mt-0 col-6 p-0">
                                                      <div className='bgb d-md-block d-none'></div>
                                                      <ul className='list-inline small-cards-ul d-flex align-items-center'>
                                                          <li className='list-inline-item'>
                                                              <img src={dark === 'dark' ? "/projectstarter/project-card/access-icon-dark.svg" : "/projectstarter/project-card/access-icon.svg"} className='img-fluid smallLogo' alt="" />
                                                          </li>
                                                          <div className="list-inline-item small-cards-ul-li2 small-cards-ul-li2-2">
                                                              <p>Access</p>
                                                              <p>Private</p>
                                                          </div>
                                                      </ul>
                                                  </div>
                                                  <div className="col-sm-4 mt-sm-4 mt-0 col-6 p-0">
                                                      <div className='bgb d-md-block d-none'></div>
                                                      <ul className='list-inline small-cards-ul d-flex align-items-center'>
                                                          <li className='list-inline-item'>
                                                              <img src={dark === 'dark' ? "/projectstarter/project-card/token-sold-icon-dark.svg" : "/projectstarter/project-card/token-sold-icon.svg"} className='img-fluid smallLogo' alt="" />
                                                          </li>
                                                          <div className="list-inline-item small-cards-ul-li2 small-cards-ul-li2-2">
                                                              <p>Token Sold</p>
                                                              <p>1M</p>
                                                          </div>
                                                      </ul>
                                                  </div>
                                                  <div className="col-sm-4  mt-sm-4 mt-0 col-6 p-0">
                                                      <div className='bgb d-md-block d-none'></div>
                                                      <ul className='list-inline small-cards-ul d-flex align-items-center'>
                                                          <li className='list-inline-item'>
                                                              <img src={dark === 'dark' ? "/projectstarter/project-card/token-distribution-icon-dark.svg" : "/projectstarter/project-card/token-distribution-icon.svg"} className=' smallLogo' alt="" />
                                                          </li>
                                                          <div className="list-inline-item small-cards-ul-li2 small-cards-ul-li2-2">
                                                              <p className=' text-truncate w-75'>Token Distribution</p>
                                                              <p>20</p>
                                                          </div>
                                                      </ul>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                        </div>
                                        <div className='col-sm-6'>
                                       
                                        <div className="inner-card">
                                        <div className="lock"><i class="fas fa-lock"></i></div>
                                          <div className="row">
                                              <div className="col-9 text-left p-0">
                                                  <ul className="list-inline d-flex align-items-center">
                                                      <li className="list-inline-item ">
                                                          <div className="inner-img">
                                                              <img src="\projectstarter\project-card\project-logo.png" className="img-fluid" alt="" />
                                                          </div>
                                                      </li>
                                                      <li className="list-inline-item">
                                                          <div className="inner-img">
                                                              <h5>Yay Games</h5>
                                                              <p className="grey"><small>1 YAY = 12.23131 PSR</small></p>
                                                          </div>
                                                      </li>
                                                  </ul>
                                              </div>
                                              <div className="col-3 text-right p-0">
                                                  <div className="inner-btn">
                                                      <button className="project-closed">Open</button>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="progress-div">
                                              <div className="row mb-1 mt-3">
                                                  <div className="col-11 p-0">
                                                      <h5 className="grey">Pool Progress</h5>
                                                  </div>
                                                  <div className="col-1 p-0">
                                                      <div className="inner-btn">
                                                          <p className="grey">50%</p>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="row">
                                                  <div className="col-sm-12 p-0">
                                                      <div className="progress">
                                                          <div className="progress-bar" role="progressbar" style={{ width: "30%" }} aria-valuenow="70"
                                                              aria-valuemin="20" aria-valuemax="100">

                                                          </div>
                                                      </div>
                                                      <h5 className="common mt-1">BUSD 500,000/$1,000,000</h5>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="brdr"></div>
                                          <div className="ptb10 inner-small-cards">
                                              <div className="row">
                                                  <div className="col-sm-4 col-6 p-0">
                                                      <ul className='list-inline small-cards-ul d-flex align-items-center'>
                                                          <li className='list-inline-item'>
                                                              <img src={dark === 'dark' ? "/projectstarter/project-card/perticipants-icon-dark.svg" : "/projectstarter/project-card/perticipants-icon.svg"} className='img-fluid smallLogo' alt="" />
                                                          </li>
                                                          <div className="list-inline-item small-cards-ul-li2">
                                                              <p>Participants</p>
                                                              <p>20,250</p>
                                                          </div>
                                                      </ul>
                                                  </div>
                                                  <div className="col-sm-4 col-6 p-0">
                                                      <ul className='list-inline small-cards-ul d-flex align-items-center'>
                                                          <li className='list-inline-item'>
                                                              <img src={dark === 'dark' ? "/projectstarter/project-card/start-date-icon-dark.svg" : "/projectstarter/project-card/start-date-icon.svg"} className='img-fluid smallLogo' alt="" />
                                                          </li>
                                                          <div className="list-inline-item small-cards-ul-li2">
                                                              <p>Start-date</p>
                                                              <p>17-Dec-2021</p>
                                                          </div>
                                                      </ul>
                                                  </div>
                                                  <div className="col-sm-4 col-6 p-0">
                                                      <ul className='list-inline small-cards-ul d-flex align-items-center'>
                                                          <li className='list-inline-item'>
                                                              <img src={dark === 'dark' ? "/projectstarter/project-card/token-price-icon-dark.svg" : "/projectstarter/project-card/token-price-icon.svg"} className='img-fluid smallLogo' alt="" />
                                                          </li>
                                                          <div className="list-inline-item small-cards-ul-li2">
                                                              <p>Token Price</p>
                                                              <p>$0.30</p>
                                                          </div>
                                                      </ul>
                                                  </div>

                                                  <div className="col-sm-4  mt-sm-4 mt-0 col-6 p-0">
                                                      <div className='bgb d-md-block d-none'></div>
                                                      <ul className='list-inline small-cards-ul d-flex align-items-center'>
                                                          <li className='list-inline-item'>
                                                              <img src={dark === 'dark' ? "/projectstarter/project-card/access-icon-dark.svg" : "/projectstarter/project-card/access-icon.svg"} className='img-fluid smallLogo' alt="" />
                                                          </li>
                                                          <div className="list-inline-item small-cards-ul-li2 small-cards-ul-li2-2">
                                                              <p>Access</p>
                                                              <p>Private</p>
                                                          </div>
                                                      </ul>
                                                  </div>
                                                  <div className="col-sm-4 mt-sm-4 mt-0 col-6 p-0">
                                                      <div className='bgb d-md-block d-none'></div>
                                                      <ul className='list-inline small-cards-ul d-flex align-items-center'>
                                                          <li className='list-inline-item'>
                                                              <img src={dark === 'dark' ? "/projectstarter/project-card/token-sold-icon-dark.svg" : "/projectstarter/project-card/token-sold-icon.svg"} className='img-fluid smallLogo' alt="" />
                                                          </li>
                                                          <div className="list-inline-item small-cards-ul-li2 small-cards-ul-li2-2">
                                                              <p>Token Sold</p>
                                                              <p>1M</p>
                                                          </div>
                                                      </ul>
                                                  </div>
                                                  <div className="col-sm-4  mt-sm-4 mt-0 col-6 p-0">
                                                      <div className='bgb d-md-block d-none'></div>
                                                      <ul className='list-inline small-cards-ul d-flex align-items-center'>
                                                          <li className='list-inline-item'>
                                                              <img src={dark === 'dark' ? "/projectstarter/project-card/token-distribution-icon-dark.svg" : "/projectstarter/project-card/token-distribution-icon.svg"} className=' smallLogo' alt="" />
                                                          </li>
                                                          <div className="list-inline-item small-cards-ul-li2 small-cards-ul-li2-2">
                                                              <p className=' text-truncate w-75'>Token Distribution</p>
                                                              <p>20</p>
                                                          </div>
                                                      </ul>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                        </div>
                                            {closedProject?.map((item, index) => {
                                                return (

                                                    <div className="col-sm-6">
                                                        <div key={index}>
                                                            <ClosedNow item={item} />
                                                        </div>
                                                    </div>

                                                )
                                            })}
                                        {/* </div>
                                    </div> */}
                                </div>
                            </div>
                        </section>

                        <section className="main-coming main-open">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="inner-content">
                                            <h2 className='inner_project_text'>
                                                <strong>Projects Coming Soon</strong>{" "}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="row ptb">
                                    {/* <div className="col-sm-12">
                                        <div className="row">
                                           
                                        </div> */}

                                        <div className="col-sm-6">
                                        <div className="upcoming_lock"><img src="./coming-soon-placeholder.png" alt="img" className='img-fluid'/></div>
                                        </div>
                                        <div className="col-sm-6">
                                        <div className="upcoming_lock"><img src="./coming-soon-placeholder.png" alt="img" className='img-fluid'/></div>
                                        </div>
                                        {upcommingProject?.map((item, index) => {
                                            return (
                                                <div className="col-sm-6">
                                                <div key={index}>
                                                    <ComingSoon item={item} />
                                                </div>
                                                </div>
                                            )
                                        })}
                                    {/* </div> */}
                                </div>
                            </div>
                        </section>

                    </div>
                    {/* <section className='counter-no main-open'>
                    <div className="container">
                        <div className="row ">
                            <div className="col-12">
                                <div class="btn-toolbar d-flex justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
                                    <div class="btn-group mr-2" role="group" aria-label="First group">
                                        <button type="button" class="btn btn-primary">1</button>
                                        <button type="button" class="btn btn-primary">2</button>
                                        <button type="button" class="btn btn-primary">3</button>
                                        <button type="button" class="btn btn-primary">4</button>
                                    </div>
                                    <div class="btn-group mr-2" role="group" aria-label="Second group">
                                        <button type="button" class="btn btn-primary">5</button>
                                        <button type="button" class="btn btn-primary">6</button>
                                        <button type="button" class="btn btn-primary">...</button>
                                    </div>
                                    <div class="btn-group" role="group" aria-label="Third group">
                                        <button type="button" class="btn btn-primary">⏩</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
                    {/* <section className="last-tiles">
                <div className="container">

                    <div className="row">
                        <div className="col-sm-4">
                            <div className="inner-card">
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                        <div className="inner-check">
                                            <img src="\projectstarter\check-icon.svg" className="img-fluid" alt="" />
                                        </div>
                                    </li>
                                    <li className="list-inline-item">
                                        <div className="inner-check">
                                            <h6>Nam libero tempore</h6>
                                        </div>
                                    </li>
                                </ul>
                                <p className="grey"><small>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus  omnis voluptas assumenda est.</small></p>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="inner-card">
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                        <div className="inner-check">
                                            <img src="\projectstarter\check-icon.svg" className="img-fluid" alt="" />
                                        </div>
                                    </li>
                                    <li className="list-inline-item">
                                        <div className="inner-check">
                                            <h6>Nam libero tempore</h6>
                                        </div>
                                    </li>
                                </ul>
                                <p className="grey"><small>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus  omnis voluptas assumenda est.</small></p>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="inner-card">
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                        <div className="inner-check">
                                            <img src="\projectstarter\check-icon.svg" className="img-fluid" alt="" />
                                        </div>
                                    </li>
                                    <li className="list-inline-item">
                                        <div className="inner-check">
                                            <h6>Nam libero tempore</h6>
                                        </div>
                                    </li>
                                </ul>
                                <p className="grey"><small>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus  omnis voluptas assumenda est.</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
                </section>
            </div>
            <Footer />
        </>
    )
}

export default Projects;
