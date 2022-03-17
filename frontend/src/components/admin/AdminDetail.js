import React, { useState, useEffect, useCallback } from 'react';
import './admin-detail.scss'
import { useParams } from 'react-router';
import Navbar from '../landing/header/Navbar'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { API_URL } from '../../utils/ApiURL';
import { toast } from 'react-toastify';
import { Backdrop } from '@material-ui/core';
import { Finilzeee } from '../../hooks/tierInfoFetchers';
// import { useWeb3React } from '@web3-react/core'
// import { useCallback } from 'react'
// import useWeb3 from './useWeb3'
// import { getPoolContract } from '../../utils/contractHelpers';
import axios from 'axios';
import {
    TextField,
    Typography,
} 
from '@material-ui/core';
import FooterSecondary from '../footerSecondary/FooterSecondary';
import { useSelector } from 'react-redux'
function AdminDetail() {
    const [opens, setOpens] = useState(false);
    const [uploadImage, updateuploadImage] = useState('');
    const [uploadImage1, updateuploadImage1] = useState("");
    const [Finalizestatus, setFinalizestatus] = useState('');
    const { FSale } = Finilzeee();
    const [singleproject, setsingleproject] = useState({
        contractAddress: '', projectName: '', symbol: '', projectDescription: '', contactPersonWalletAddress: '', contactPersonName: '', contactPersonEmail: '',
        Website: '', Twitter: '', Telegram: '', totalSupplyOfToken: '', amountAllocatedForPresale: '', tokenDecimals: '', tokenPriceInBNB: '', preSaleStartDateAndTime: '',
        preSaleEndDateAndTime: '', FCFSStartdate: '', maxAllocation1: '', maxAllocation2: '', maxAllocation3: '', maxAllocation4: '', maxAllocation5: '', maxAllocation6: '',
        minAllocation1: '', minAllocation2: '', minAllocation3: '', minAllocation4: '', minAllocation5: '', minAllocation6: '',
        noofVesting: '', tier1MaxCap: '', tier2MaxCap: '', tier3MaxCap: '', tier4MaxCap: '', tier5MaxCap: '', tier6MaxCap: '', softCapPercentage: '', kycFirstName: '',
        kycSecondName: ''
        }
    );

    const dark = useSelector(state => state.UserReducer.theme);
    const { id } = useParams();
    // console.log("your id was", id)

    const FinalizeSale = useCallback(async () => {
        try {
            // setShowLoader(true)
            setOpens(true);
            const tx = await FSale(singleproject?.contractAddressDeployed);
            if (tx.status) {
                Finaliz();
                // await setTxstatus(tx.status);
                // await setstackbalance("");
                setOpens(false);
                // await getStakedbalance();
                // setShowLoader(false)
                // setInputBusd('')
                // close()
            }
        } catch (err) {
            setOpens(false);
            // setShowLoader(false)
            console.log("err22", err);
        }
    });

    const singleprojectdetail = (e) => {
        setOpens(true)
        axios.post(`${API_URL}/v1/Project/getDetailOfSingleProjectById`, { _id: id })
            .then((response) => {
                setOpens(false)
                setsingleproject(response.data.data)
                console.log("single project detail", response)
            })
            .catch((err) => {
                setOpens(false)
                toast.warning('Error While Geting Detail', {
                    position: "top-right",
                    autoClose: 3000,
                });
                return false;
            })
    }
    
    const Finaliz = () => {
        console.log("sigle id we have", singleproject._id)
        setOpens(true)
        axios.post(`${API_URL}/v1/Project/finalizeProjectStatus`, { _id: singleproject._id })
            .then((response) => {
                setOpens(false)
                setFinalizestatus(response.data.data.finalizeStatus)
                toast.success('Project successfully finalize', {
                    position: "top-right",
                    autoClose: 3000,
                });

                window.location.reload();

                // console.log("we have here finalize project here", response)
            })
            .catch((err) => {
                setOpens(false)
                toast.warning('Error While Geting Detail', {
                    position: "top-right",
                    autoClose: 3000,
                });
                return false;
            })
    }

    const lottery = () => {
        // console.log("sigle id we have", singleproject._id)   
        setOpens(true)
        axios.post(`${API_URL}/v1/Lottery/addLottery`, { contractAddressDeployed: singleproject.contractAddressDeployed })
            .then((response) => {
                setOpens(false)
                setFinalizestatus(response.data.data)
                toast.success('Lottery successfully Done', {
                    position: "top-right",
                    autoClose: 3000,
                });

                // window.location.reload();

                // console.log("we have here lottery project here", response)
            })
            .catch((err) => {
                setOpens(false)
                toast.warning('Error While Geting Detail', {
                    position: "top-right",
                    autoClose: 3000,
                });
                return false;
            })
    }

    const FinalizeSaless = () => {
        toast.error('You have already finalize your sakle', {
            position: "top-right",
            autoClose: 5000,
        });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setsingleproject(singleproject => ({ ...singleproject, [name]: value }));
        // const value = event.target.value;
        // setsingleproject(singleproject => ({ ...singleproject, projectName: value }));
        // [event.target.name] = event.target.value;
        // setsingleproject({ formData });
        // console.log("============================", event.target.value)
    }


    useEffect(() => {
        singleprojectdetail()
        // finalizetrue()
    }, [id])

    // useEffect(() => {
    //     finalizetrue()
    // }, [])

    return (
        <>
            {/* <button className="ahbashb" onClick={Finaliz}>please finalize</button> */}
            <Backdrop className="loader" sx={{ color: '#fff' }} open={opens}>
                <img src="/projectstarter/header/loader.svg" alt="" className="img-fluid shdshhgdss" />
            </Backdrop>
            <div className={dark}>
                <section className='adminDetail-main'>
                    <Navbar />
                    <div className="container-fluid ptb">
                        <div className="row">
                            <div className="col-10 m-auto">
                                <div className="idoform ">
                                    <ValidatorForm className="form-contact">
                                        <div className="row">
                                            <div className="col-md-12 col-12 order-md-1 order-0">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className='form-group'>
                                                            <h3 className="ahashab">Please Finalize Your Project Here</h3>
                                                            <p className="avsas">First click and agree on finalize button</p>
                                                            {singleproject?.finalizeStatus == true ?
                                                              <button className="ahbashb sjbndsjbdsjd" onClick={FinalizeSaless}>Finalize</button>
                                                             :
                                                             <button className="ahbashb" onClick={FinalizeSale}>Finalize</button>
                                                            }
                                                        </div>
                                                        <div className="col-12 p-0">
                                                        <div className='form-group'>
                                                            <h3 className="ahashab">Start Your Lottery Here</h3>
                                                              <button className="ahbashb sjbndsjbdsjd" onClick={lottery}>Start Lottery</button>
                                                        </div>
                                                    </div>
                                                    </div>
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

export default AdminDetail
