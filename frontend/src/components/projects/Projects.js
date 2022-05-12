
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
                                                Open Now
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
                                               Projects Closed
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="row ptb">
                                    {/* <div className="col-sm-12">
                                        <div className="row"> */}
                                       <div className="col-sm-6">
                                        <div className="upcoming_lock"><img src="./coming-soon-placeholder.png" alt="img" className='img-fluid'/></div>
                                        </div>
                                        <div className="col-sm-6">
                                        <div className="upcoming_lock"><img src="./coming-soon-placeholder.png" alt="img" className='img-fluid'/></div>
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
                                                Projects Coming Soon
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
