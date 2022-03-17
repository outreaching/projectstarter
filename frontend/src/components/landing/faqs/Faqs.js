import React from 'react';
import './faqs.scss';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {
    TextField,
    Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux'
const Faqs = () => {
    const dark = useSelector(state => state.UserReducer.theme);
    return (
        <>
            <div className={dark}>
                <section className="main-faqs ptb" id="faqs">
                    <div className="container">
                        <div className="row ">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-8">
                                <div className="inner-content text-center ptb20">
                                    <h3 className="">The Projectstarter Protocol. <span className="common"><strong>People First.</strong></span></h3>
                                    <img src="\projectstarter\header\line.png" className="img-fluid" alt="" />
                                </div>
                                <div className='bg-img text-center'>
                                    <h3 className="white ptb20"><strong>Get Alerts For New Pools</strong></h3>
                                    <ul>
                                        <li>
                                            <div className="inside-btn">
                                                <button className="btn-black" data-toggle="modal" data-target="#exampleModal">Sign Up</button>
                                                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                                        <div className="modal-content">
                                                            <div className="modalHeader">
                                                                <div className='form-img'>
                                                                    <p>Welcome to the Future of Fundraising</p>
                                                                </div>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span className='modalCloser' aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body text-left">
                                                                <ValidatorForm className="form-contact">
                                                                    <div className='adminCard '>
                                                                        {/* <div className='form-img'>
                                                                        <p>Welcome to the Future of Fundraising</p>
                                                                    </div> */}
                                                                        <div className='adminCard-inner-inputs'>
                                                                            <div className="form-group ">
                                                                                <label className='p-main' For="name">Your Name </label>
                                                                                <TextField
                                                                                    type='text'
                                                                                    required
                                                                                    id="name"
                                                                                    name="name"
                                                                                    variant='outlined'
                                                                                    fullWidth
                                                                                    placeholder='Enter your username'
                                                                                    margin="dense"
                                                                                />
                                                                            </div>
                                                                            <div className="form-group ">
                                                                                <label className='p-main' For="name">Email Address</label>
                                                                                <TextField
                                                                                    required
                                                                                    type='email'
                                                                                    id="name"
                                                                                    name="name"
                                                                                    variant='outlined'
                                                                                    fullWidth
                                                                                    placeholder='Enter your email'
                                                                                    margin="dense"
                                                                                />

                                                                            </div>
                                                                            <div className="form-group ">
                                                                                <button className='btn-common w-100'>Subscribe</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </ValidatorForm>
                                                            </div>
                                                            {/* <div className="modal-footer text-center">
                                                            <button type="button" className="btn btn-common w-100">Subscribe</button>
                                                        </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-2"></div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default Faqs;
