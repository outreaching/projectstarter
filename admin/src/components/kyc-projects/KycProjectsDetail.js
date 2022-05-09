import React, { useState, useEffect } from 'react';
import './kyc.scss'
import Navbar from '../landing/header/Navbar'
import { useParams } from 'react-router';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {
    TextField,
    Typography,
} from '@material-ui/core';
import { ApiUri } from '../../utils/apiUrl';
import axios from 'axios';
import FooterSecondary from '../footerSecondary/FooterSecondary';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { Backdrop } from '@material-ui/core';
function KycProjectsDetail() {
    const [photo, setPhoto] = useState();
    const [uploadImage, updateuploadImage] = useState("");
    const [singlekyc, setsinglekyc] = useState();
    const [opens, setOpens] = useState(false);
    console.log("new single kyc dat",singlekyc)
    const dark = useSelector(state => state.UserReducer.theme);
    async function catchImage(e) {
        try {
            const file = e.target.files[0]
            setPhoto(file)
            updateuploadImage(URL.createObjectURL(e.target.files[0]));
        } catch (e) {
            console.log(e)
        }
    }
    const { walletAddress } = useParams();
    console.log("your address was", walletAddress)
    const singlekycdetail= () => {
        setOpens(true)
        // console.log("your id was", id)
        axios.post(`${ApiUri}/v1/Kyc/getDetailOfSingleKyc`, { walletAddress: walletAddress })
            .then((response) => {
                setOpens(false)
                setsinglekyc(response.data.data)
                // console.log("single project detail", response)
            })
            .catch((err) => {
                setOpens(false)
                return false;
            })
    }

    useEffect(() => {
        singlekycdetail()
    }, [walletAddress])
    const approvekyc = async () => {
        setOpens(true)
        await axios.post(`${ApiUri}/v1/Kyc/setApprovedKycByWalletAddress`, { walletAddress: walletAddress })
            .then((response) => {
                setOpens(false)
                toast.success('KYC Approved Successfully', {
                    position: "top-right",
                    autoClose: 3000,
                });
                singlekycdetail()
                // statusOfApplication(response.data.result.statusOfApplication)
                // setapprovestatusss(response.data.data.isApproved)
                // console.log("aprroved status", response.data.result.isApproved)
            })
            .catch((err) => {
                setOpens(false)
                return false;
            })
    }
    const unapprovekyc = async () => {
        setOpens(true)
        await axios.post(`${ApiUri}/v1/Kyc/setNotApprovedKycByWalletAddress`, { walletAddress: walletAddress })
            .then((response) => {
                setOpens(false)
                toast.success('KYC Rejected Successfully', {
                    position: "top-right",
                    autoClose: 3000,
                });
                singlekycdetail()
                
                // setapprovestatusss(response.data.result.statusOfApplication)
                // setapprovestatusss(response.data.data.isApproved)
                // console.log("aprroved status", response.data.result.isApproved)
            })
            .catch((err) => {
                setOpens(false)
                toast.warning('Error while rejecting', {
                    position: "top-right",
                    autoClose: 3000,
                });
                return false;
            })
    }

    return (
        <>
            <div className={dark}>
                <section className='kycProjects-Detail'>
                    <Navbar />
                    <div className="container-fluid ptb20">
                        <div className="row">
                            <div className="col-10 m-auto">
                                <div className="idoform ">
                                    <ValidatorForm className="form-contact">
                                        <div className="row">

                                            <div className="col-lg-8 col-12 order-md-0 order-1">
                                                <div className="row p-md-0">

                                                    <section className='pesale-details ptb20'>
                                                        <div className="row">
                                                            <div className="col-12 p-0">
                                                                <h5>KYC Details</h5>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">User name of project owner</label>
                                                                    <TextField
                                                                        required
                                                                        id="name"
                                                                        name="name"
                                                                        disabled
                                                                        value={singlekyc?.name}
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='First name of project owner'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pr-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Wallet Address</label>
                                                                    <TextField
                                                                        required
                                                                        id="symbol"
                                                                        disabled
                                                                        name="symbol"
                                                                        value={singlekyc?.walletAddress}
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Last name of project owner*'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Email Address</label>
                                                                    <TextField
                                                                        required
                                                                        disabled
                                                                        value={singlekyc?.email}
                                                                        id="name"
                                                                        name="name"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='john.doe@gmail.com'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pr-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Country</label>
                                                                    <TextField
                                                                        required
                                                                        id="symbol"
                                                                        disabled
                                                                        value={singlekyc?.country}
                                                                        name="symbol"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='+1-202-555-0122'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">


                                                                <div className="form-group ">
                                                                    <label For="name">Front ID Image</label>
                                                                    <div className='idCard-Img'>
                                                                        <img src={singlekyc?.kycImageFrontSide} alt="Card Front Side" className='img-fluid' />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className="col-md-6 pr-md-0">
                                                                <div className="form-group">
                                                                    <label For="name">Back ID Image</label>
                                                                    <div className='idCard-Img'>
                                                                    <img src={singlekyc?.kycImageBackSide} alt="Card Front Side" className='img-fluid'/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6  pr-md-0">
                                                                <ul className="list-inline mt-3 text-md-auto text-center">
                                                                    <li className="list-inline-item">
                                                                        <button className='btn-common' onClick={approvekyc}>Approve</button>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <button className='btn-red' onClick={unapprovekyc}>Reject</button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </div>

                                            </div>

                                        </div>
                                    </ValidatorForm>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <FooterSecondary />
            </div>
        </>
    )
}

export default KycProjectsDetail
