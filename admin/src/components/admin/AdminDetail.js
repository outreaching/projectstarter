import React, { useState, useEffect } from 'react';
import './admin-detail.scss'
import { useParams } from 'react-router';
import Navbar from '../landing/header/Navbar'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ApiUri } from '../../utils/apiUrl';
import { toast } from 'react-toastify';
import { Backdrop } from '@material-ui/core';
// import { useWeb3React } from '@web3-react/core'
// import { useCallback } from 'react'
// import useWeb3 from './useWeb3'
// import { getPoolContract } from '../../utils/contractHelpers';
import axios from 'axios';
import {
    TextField,
    Typography,
} from '@material-ui/core';
import FooterSecondary from '../footerSecondary/FooterSecondary';
import { useSelector } from 'react-redux'
function AdminDetail() {
    const [photo, setPhoto] = useState();
    const [photo1, setPhoto1] = useState();
    const [opens, setOpens] = useState(false);
    const [uploadImage, updateuploadImage] = useState('');
    const [uploadImage1, updateuploadImage1] = useState("");
    const [singleproject, setsingleproject] = useState({
        contractAddress: '', projectName: '', symbol: '', projectDescription: '', contactPersonWalletAddress: '', contactPersonName: '', contactPersonEmail: '',
        Website: '', Twitter: '', Telegram: '', totalSupplyOfToken: '', amountAllocatedForPresale: '', tokenDecimals: '', tokenPriceInBNB: '', preSaleStartDateAndTime: '',
        preSaleEndDateAndTime: '', FCFSStartdate: '', maxAllocation1: '', maxAllocation2: '', maxAllocation3: '', maxAllocation4: '', maxAllocation5: '', maxAllocation6: '',
        minAllocation1: '', minAllocation2: '', minAllocation3: '', minAllocation4: '', minAllocation5: '', minAllocation6: '',
        noofVesting: '', tier1MaxCap: '', tier2MaxCap: '', tier3MaxCap: '', tier4MaxCap: '', tier5MaxCap: '', tier6MaxCap: '', softCapPercentage: '', kycFirstName: '',
        kycSecondName: ''
    }
    );
    // const arg = {
    //     nameOfProject: singleproject.projectName,
    //     // _saleStartTime: new Date(singleproject.preSaleStartDateAndTime).getTime() / 1000.0,
    //     // _fcfsStartTime: new Date(singleproject.FCFSStartdate).getTime() / 1000.0,
    //     // _fcfsEndTime: new Date(singleproject.preSaleEndDateAndTime).getTime() / 1000.0,
    //     // _saleEndTime: new Date(singleproject.preSaleEndDateAndTime).getTime() / 1000.0,
    //     _projectOwner: singleproject.contactPersonWalletAddress,
    //     _tokenSender: singleproject.contactPersonWalletAddress,
    //     maxAllocTierOne: singleproject.maxAllocation1,
    //     maxAllocTierTwo: singleproject.maxAllocation2,
    //     maxAllocTierThree: singleproject.maxAllocation3,
    //     maxAllocTierFour: singleproject.maxAllocation4,
    //     maxAllocTierFive: singleproject.maxAllocation5,
    //     maxAllocTierSix: singleproject.maxAllocation6,
    //     minAllocTierOne: singleproject.minAllocation1,
    //     minAllocTierTwo: singleproject.minAllocation2,
    //     minAllocTierThree: singleproject.minAllocation3,
    //     minAllocTierFour: singleproject.minAllocation4,
    //     minAllocTierFive: singleproject.minAllocation5,
    //     minAllocTierSix: singleproject.minAllocation6,
    //     tokenToIDO: singleproject.contractAddress,
    //     tokenDecimals: singleproject.tokenDecimals,
    //     _numberOfIdoTokensToSell: singleproject.amountAllocatedForPresale,
    //     _tokenPriceInBUSD: singleproject.tokenPriceInBNBm,
    //     _tierOneMaxCap: singleproject.tier1MaxCap,
    //     _tierTwoMaxCap: singleproject.tier2MaxCap,
    //     _tierThreeMaxCap: singleproject.tier3MaxCap,
    //     _tierFourMaxCap: singleproject.tier4MaxCap,
    //     _tierFiveMaxCap: singleproject.tier5MaxCap,
    //     _tierSixMaxCap: singleproject.tier6MaxCap,
    //     _softCapPercentage: singleproject.softCapPercentage,
    //     _numberOfVestings: singleproject.noofVesting,
    //      _vestingPercentages: singleproject.tier6MaxCap,
    //      _vestingUnlockTimes: singleproject.tier6MaxCap,
    // }

    // const CreatePool = () => {
    //     const web3 = useWeb3();
    //     const { account } = useWeb3React();
    //     try {
    //         const ApproveTokens = useCallback(async () => {
    //             const contract = getPoolContract('0x6acd5C127CCF07B2a92A33F7F8Ffd7Aac28E4455', web3)
    //             const approved = await contract.methods.deployProjectOnLaunchpad(arg).send({ from: account, value: web3.utils.toWei(JSON.stringify((vals)), 'ether') })
    //                 .on('transactionHash', (tx) => { return tx.transactionHash });
    //             return approved
    //         }, [account])
    //         return { ApproveTokens }
    //     } catch (err) {
    //         console.log("approve err", err)
    //         throw err
    //     }
    // }

    const dark = useSelector(state => state.UserReducer.theme);
    const { id } = useParams();
    // console.log("your id was", id)
    async function catchImage(e) {
        try {
            const file = e.target.files[0]
            setPhoto(file)
            updateuploadImage(URL.createObjectURL(e.target.files[0]));
        } catch (e) {
            console.log(e)
        }
    }
    async function catchImage1(e) {
        try {
            const file = e.target.files[0]
            setPhoto1(file)
            updateuploadImage1(URL.createObjectURL(e.target.files[0]));
        } catch (e) {
            console.log(e)
        }
    }

    const singleprojectdetail = (e) => {
        setOpens(true)
        axios.post(`${ApiUri}/v1/Project/getDetailOfSingleProjectById`, { _id: id })
            .then((response) => {
                setOpens(false)
                setsingleproject(response.data.data)
                updateuploadImage(response.data.data.logoURL)
                updateuploadImage1(response.data.data.kycPassportPicture)
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
    const handleChange = (event) => {
        const { name, value } = event.target;
        setsingleproject(singleproject => ({ ...singleproject, [name]: value }));
        // const value = event.target.value;
        // setsingleproject(singleproject => ({ ...singleproject, projectName: value }));
        // [event.target.name] = event.target.value;
        // setsingleproject({ formData });
        // console.log("============================", event.target.value)
    }

    // console.log("================", singleproject.formData.PContractAddress)

    const editBanner = async () => {
        // setOpen(true)
        const data1 = new FormData();

        data1.append("contractAddress", singleproject.contractAddress)
        data1.append("_id", id)
        data1.append("kycPassportPicture", photo1)
        data1.append("logoURL", photo)
        data1.append("projectName", singleproject.projectName)
        data1.append("symbol", singleproject.symbol)
        data1.append("projectDescription", singleproject.projectDescription)
        data1.append("contactPersonWalletAddress", singleproject.contactPersonWalletAddress)
        data1.append("contactPersonName", singleproject.contactPersonName)
        data1.append("contactPersonEmail", singleproject.contactPersonEmail)
        data1.append("websiteLink", singleproject.websiteLink)
        data1.append("twitterLink", singleproject.twitterLink)
        data1.append("telegramlink", singleproject.telegramlink)
        data1.append("totalSupplyOfToken", singleproject.totalSupplyOfToken)
        data1.append("amountAllocatedForPresale", singleproject.amountAllocatedForPresale)
        data1.append("tokenDecimals", singleproject.tokenDecimals)
        data1.append("tokenPriceInBNB", singleproject.tokenPriceInBNB)
        data1.append("preSaleStartDateAndTime", singleproject.preSaleStartDateAndTime)
        data1.append("preSaleEndDateAndTime", singleproject.preSaleEndDateAndTime)
        data1.append("FCFSStartdate", singleproject.FCFSStartdate)
        data1.append("FCFSEnddate", singleproject.preSaleEndDateAndTime)
        // data1.append("listingPriceInBNB", data.ListingPriceBNB)
        // data1.append("liquidityPercentageForPancake", data.pancakePercentage)
        data1.append("maxAllocation1", singleproject.maxAllocation1)
        data1.append("minAllocation1", singleproject.minAllocation1)
        data1.append("maxAllocation2", singleproject.maxAllocation2)
        data1.append("minAllocation2", singleproject.minAllocation2)
        data1.append("maxAllocation3", singleproject.maxAllocation3)
        data1.append("minAllocation3", singleproject.minAllocation3)
        data1.append("maxAllocation4", singleproject.maxAllocation4)
        data1.append("minAllocation4", singleproject.minAllocation4)
        data1.append("maxAllocation5", singleproject.maxAllocation5)
        data1.append("minAllocation5", singleproject.minAllocation5)
        data1.append("maxAllocation6", singleproject.maxAllocation6)
        data1.append("minAllocation6", singleproject.minAllocation6)
       
        data1.append("noofVesting", singleproject.noofVesting)

        data1.append("tier1MaxCap", singleproject.tier1MaxCap)
        data1.append("tier2MaxCap", singleproject.tier2MaxCap)
        data1.append("tier3MaxCap", singleproject.tier3MaxCap)
        data1.append("tier4MaxCap", singleproject.tier4MaxCap)
        data1.append("tier5MaxCap", singleproject.tier5MaxCap)
        data1.append("tier6MaxCap", singleproject.tier6MaxCap)

        // data1.append('attributes', singleproject.attributes)
        data1.append("softCapPercentage", singleproject.softCapPercentage)
        data1.append("kycFirstName", singleproject.kycFirstName)
        data1.append("kycSecondName", singleproject.kycSecondName)

        console.log("=====>", id)
        axios.post(`${ApiUri}/v1/project/editProjectById`, data1, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                console.log("success", response)
            }).catch((err) => {
                console.log("error", err)
            })
    }
    useEffect(() => {
        singleprojectdetail()
    }, [id])
    const approveproject = async () => {
        setOpens(true)
        try {
            await axios.post(`${ApiUri}/v1/Project/setApprovedProjectById`, { _id: id })
                .then((response) => {
                    setOpens(false)
                    toast.success('Approve Project Successfully', {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    // singleprojectdetail()
                })
        }
        // .catch((err) => {
        //     setOpens(false)
        //     toast.warning('Error While Approving Project', {
        //         position: "top-right",
        //         autoClose: 3000,
        //     });
        //     return false;
        // }
        catch (err) {
            console.log("catcj", err);
            toast.error('Invalid Form Submission', {
                position: "bottom-center",
                autoClose: 2000,
            });
            // setOpen(false)
            return false
        }
    }

    const unapproveproject = async () => {
        setOpens(true)
        await axios.post(`${ApiUri}/v1/Project/setNotApprovedProjectById`, { _id: id })
            .then((response) => {
                setOpens(false)
                toast.error('Reject Project Successfully', {
                    position: "top-right",
                    autoClose: 3000,
                });
                // singleprojectdetail()
            })
            .catch((err) => {
                setOpens(false)
                toast.warning('Error While Rejecting Project', {
                    position: "top-right",
                    autoClose: 3000,
                });
                return false;
            })
    }

    return (
        <>
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
                                            <div className="col-md-8 col-12 order-md-0 order-1">
                                                <div className="row p-md-0">
                                                    <div className="col-md-6 pl-md-0">
                                                        <div className="form-group ">
                                                            <label For="name">Project Name <span className='text-danger'>*</span></label>
                                                            <TextField
                                                                required
                                                                id="projectName"
                                                                onChange={handleChange}
                                                                value={singleproject?.projectName}
                                                                name="projectName"
                                                                variant='outlined'
                                                                fullWidth
                                                                placeholder='Enter your project name'
                                                                margin="dense"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 pr-md-0">
                                                        <div className="form-group ">
                                                            <label For="name">Project Symbol <span className='text-danger'>*</span></label>
                                                            <TextField
                                                                required
                                                                id="symbol"
                                                                onChange={handleChange}
                                                                value={singleproject?.symbol}
                                                                name="symbol"
                                                                variant='outlined'
                                                                fullWidth
                                                                placeholder='Enter your project symbol'
                                                                margin="dense"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 p-md-0">
                                                        <div className='form-group shsjsjsx'>
                                                            <label For='name'>Description</label>
                                                            <TextField
                                                                required
                                                                id="projectDescription"
                                                                onChange={handleChange}
                                                                value={singleproject?.projectDescription}
                                                                type="number"
                                                                name="projectDescription"
                                                                variant='outlined'
                                                                fullWidth
                                                                placeholder="What is your project about (just quickly)"
                                                                margin="dense"
                                                                multiline
                                                                rows={4}
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className="col-12 p-md-0">
                                                        <div className='form-group'>
                                                            <label For='name'>Project Contract Address <span className='text-danger'>*</span></label>
                                                            <TextField
                                                                required
                                                                id="contractAddress"
                                                                // disabled
                                                                onChange={handleChange}
                                                                value={singleproject?.contractAddress}
                                                                name="contractAddress"
                                                                variant='outlined'
                                                                fullWidth
                                                                placeholder='Enter project contract address'
                                                                margin="dense"
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 pl-md-0">


                                                        <div className="form-group ">
                                                            <label For="name">Contact Person Name <span className='text-danger'>*</span></label>
                                                            <TextField
                                                                required
                                                                id="contactPersonName"
                                                                onChange={handleChange}
                                                                value={singleproject?.contactPersonName}
                                                                type="text"
                                                                name="contactPersonName"
                                                                variant='outlined'
                                                                fullWidth
                                                                placeholder='Enter Contact Person Name'
                                                                margin="dense"
                                                            />
                                                        </div>

                                                    </div>
                                                    <div className="col-md-6 pr-md-0">
                                                        <div className="form-group">
                                                            <label For="name">Contact Person Email <span className='text-danger'>*</span></label>
                                                            <TextField
                                                                required
                                                                id="contactPersonEmail"
                                                                type="text"
                                                                onChange={handleChange}
                                                                value={singleproject?.contactPersonEmail}
                                                                name="contactPersonEmail"
                                                                variant='outlined'
                                                                fullWidth
                                                                placeholder='Enter contact person email'
                                                                margin="dense"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 p-md-0">
                                                        <div className='form-group'>
                                                            <label For='name'>Token Owner Wallet Address <span className='text-danger'>*</span></label>
                                                            <TextField
                                                                required
                                                                id="contactPersonWalletAddress"
                                                                onChange={handleChange}
                                                                value={singleproject?.contactPersonWalletAddress}
                                                                name="contactPersonWalletAddress"
                                                                variant='outlined'
                                                                fullWidth
                                                                placeholder='Enter token owner wallet address'
                                                                margin="dense"
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className="col-12 p-md-0">
                                                        <hr className='borderbotom my-5'></hr>
                                                    </div>
                                                    <section className='pesale-details'>
                                                        <div className="row">
                                                            <div className="col-12 p-0">
                                                                <h5>Pesale Details</h5>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Total Supply of Token<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="totalSupplyOfToken"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.totalSupplyOfToken}
                                                                        name="totalSupplyOfToken"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total supply of token'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pr-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Amount Allocated For Pesale<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="amountAllocatedForPresale"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.amountAllocatedForPresale}
                                                                        name="amountAllocatedForPresale"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Amount allocated for pesale'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Total Decimals<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="tokenDecimals"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.tokenDecimals}
                                                                        name="tokenDecimals"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total Decimals'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pr-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Pesale Price In BSUD <span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="tokenPriceInBNB"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.tokenPriceInBNB}
                                                                        name="tokenPriceInBNB"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Pesale Price In BNB'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            {/* <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Listing Price In BNB <span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="name"
                                                                        disabled
                                                                        value={singleproject?.listingPriceInBNB}
                                                                        name="name"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Listing Price In BNB*'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div> */}
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className='form-group'>
                                                                    <label For='name'>Pesale Start Date & Time(UTC)<span className='text-danger'>*</span></label>
                                                                    <TextField

                                                                        required
                                                                        // type="date"
                                                                        id="preSaleStartDateAndTime"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.preSaleStartDateAndTime.split('Z')[0]}
                                                                        name="preSaleStartDateAndTime"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='DDD/MMM/YYY'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pr-md-0">
                                                                <div className='form-group'>
                                                                    <label For='name'>Pesale End Date & Time(UTC)<span className='text-danger'>*</span></label>
                                                                    <TextField

                                                                        required
                                                                        id="preSaleEndDateAndTime"
                                                                        // type="date"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.preSaleEndDateAndTime.split('Z')[0]}
                                                                        name="preSaleEndDateAndTime"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='DDD/MMM/YYY'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">FCFS Start Date<span className='text-danger'>*</span></label>
                                                                    <TextField

                                                                        required
                                                                        // type="date"
                                                                        id="FCFSStartdate"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.FCFSStartdate.split('Z')[0]}
                                                                        name="FCFSStartdate"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Liquidity Percentage For Pancake'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 p-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Soft Cap Percentage<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="softCapPercentage"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.softCapPercentage}
                                                                        name="softCapPercentage"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='LaunchPad Fee Percentage'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                    <div className="col-12 p-md-0">
                                                        <hr className='borderbotom my-5'></hr>
                                                    </div>
                                                    <section className='pesale-details'>
                                                        <div className="row">
                                                            <div className="col-12 p-0">
                                                                <h5>Allocation Limits</h5>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Min Allocation For Tier1<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="minAllocation1"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.minAllocation1}
                                                                        name="minAllocation1"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total Decimals'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Max Allocation For Tier1<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="maxAllocation1"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.maxAllocation1}
                                                                        name="maxAllocation1"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total Decimals'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Min Allocation For Tier2<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="minAllocation2"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.minAllocation2}
                                                                        name="minAllocation2"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total Decimals'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Max Allocation For Tier2<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="maxAllocation2"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.maxAllocation2}
                                                                        name="maxAllocation2"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total Decimals'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Min Allocation For Tier3<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="minAllocation3"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.minAllocation3}
                                                                        name="minAllocation3"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total Decimals'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Max Allocation For Tier3<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="maxAllocation3"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.maxAllocation3}
                                                                        name="maxAllocation3"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total Decimals'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Min Allocation For Tier4<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="minAllocation4"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.minAllocation4}
                                                                        name="minAllocation4"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total Decimals'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Max Allocation For Tier4<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="maxAllocation4"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.maxAllocation4}
                                                                        name="maxAllocation4"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total Decimals'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Min Allocation For Tier5<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="minAllocation5"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.minAllocation5}
                                                                        name="minAllocation5"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total Decimals'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Max Allocation For Tier5<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="maxAllocation5"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.maxAllocation5}
                                                                        name="maxAllocation5"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total Decimals'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Min Allocation For Tier6<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="minAllocation6"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.minAllocation6}
                                                                        name="minAllocation6"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total Decimals'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Min Allocation For Tier6<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="maxAllocation6"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.maxAllocation6}
                                                                        name="maxAllocation6"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total Decimals'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                    <div className="col-12 p-md-0">
                                                        <hr className='borderbotom my-5'></hr>
                                                    </div>

                                                    <section className='pesale-details'>
                                                        <div className="row">
                                                            <div className="col-12 p-0">
                                                                <h5>Hard Cap</h5>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Tier1MaxCap<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="tier1MaxCap"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.tier1MaxCap}
                                                                        name="tier1MaxCap"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total Decimals'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Tier2MaxCap<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="tier2MaxCap"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.tier2MaxCap}
                                                                        name="tier2MaxCap"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total Decimals'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Tier3MaxCap<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="tier3MaxCap"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.tier3MaxCap}
                                                                        name="tier3MaxCap"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total Decimals'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Tier4MaxCap<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="tier4MaxCap"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.tier4MaxCap}
                                                                        name="tier4MaxCap"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total Decimals'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Tier5MaxCap<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="tier5MaxCap"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.tier5MaxCap}
                                                                        name="tier5MaxCap"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total Decimals'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Tier6MaxCap<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="tier6MaxCap"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.tier6MaxCap}
                                                                        name="tier6MaxCap"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total Decimals'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">No of Vesting<span className='text-danger'>*</span></label>
                                                                    <TextField

                                                                        required
                                                                        id="noofVesting"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.noofVesting}
                                                                        name="noofVesting"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Total Decimals'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            {/* <div className="App mt-3">
                                                                {inputList.map((x, i) => {
                                                                    return (
                                                                        <div className="box">
                                                                            <div className="row ">
                                                                                <div className="col-sm-6 pl-0">
                                                                                    <label>Vesting Percentages</label>
                                                                                    <div class="form-group">
                                                                                        <TextValidator
                                                                                            fullWidth
                                                                                            type="text"
                                                                                            name="VestingPercentages"
                                                                                            // value={allData.form.description}
                                                                                            // onChange={handleChange}
                                                                                            // value={x.type}
                                                                                            value={x.trait_type}
                                                                                            onChange={e => handleInputChange(e, i)}
                                                                                            placeholder="Enter Vesting Percentages"
                                                                                            className="input-fields"
                                                                                            variant="outlined"
                                                                                        // validators={['required']}
                                                                                        // errorMessages={['Trait Type is empty']}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-6 pr-md-0">
                                                                                    <label>Vesting Unlock Times</label>
                                                                                    <div class="form-group">
                                                                                        <TextValidator
                                                                                            fullWidth
                                                                                            type="text"
                                                                                            name="VestingUnlockTimes"
                                                                                            // value={allData.form.description}
                                                                                            // onChange={handleChange}
                                                                                            value={x.value}
                                                                                            onChange={e => handleInputChange(e, i)}
                                                                                            placeholder="Enter Name"
                                                                                            className="ml10"
                                                                                            variant="outlined"
                                                                                        // validators={['required']}
                                                                                        // errorMessages={['Trait Name is Empty']}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="btn-box">
                                                                                    <ul className="list-inline mb-4">
                                                                                        <li className="list-inline-item ">
                                                                                            {inputList.length !== 1 && <button
                                                                                                className="  btn-common btn-common-1"
                                                                                                onClick={() => handleRemoveClick(i)}>Remove</button>}<br></br>
                                                                                        </li>
                                                                                        <li className="list-inline-item">
                                                                                            {inputList.length - 1 === i && <button className=" btn-common" onClick={handleAddClick}> Add More</button>}
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div> */}

                                                        </div>
                                                    </section>

                                                    <div className="col-12 p-md-0">
                                                        <hr className='borderbotom my-5'></hr>
                                                    </div>
                                                    <section className='pesale-details'>
                                                        <div className="row">
                                                            <div className="col-12 p-0">
                                                                <h5>Project Socials</h5>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Website URL</label>
                                                                    <TextField
                                                                        required
                                                                        id="websiteLink"
                                                                        name="websiteLink"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.websiteLink}
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Website URL'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pr-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Telegram Group Link </label>
                                                                    <TextField
                                                                        required
                                                                        id="telegramlink"
                                                                        name="telegramlink"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.telegramlink}
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Telegram Group Link'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Twitter</label>
                                                                    <TextField
                                                                        required
                                                                        id="twitterLink"
                                                                        onChange={handleChange}
                                                                        value={singleproject?.twitterLink}
                                                                        name="twitterLink"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Enter Twitter account'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                    <div className="col-12 p-md-0">
                                                        <hr className='borderbotom my-5'></hr>
                                                    </div>
                                                    {/* <section className='pesale-details'>
                                                        <div className="row">
                                                            <div className="col-12 p-0">
                                                                <h5>Allocation Limits</h5>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Min Allocation Per User (BNB)<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="name"
                                                                        name="name"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Min Allocation Per User (BNB)'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pr-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Max Allocation Per User (BNB) <span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        id="symbol"
                                                                        name="symbol"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Max Allocation Per User (BNB)*'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section> */}
                                                    {/* <div className="col-12 p-md-0">
                                                        <hr className='borderbotom my-5'></hr>
                                                    </div> */}
                                                    <section className='pesale-details'>
                                                        <div className="row">
                                                            <div className="col-12 p-0">
                                                                <h5>KYC Details</h5>
                                                            </div>
                                                            <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">First name of project owner<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        onChange={handleChange}
                                                                        value={singleproject?.kycFirstName}
                                                                        id="kycFirstName"
                                                                        name="kycFirstName"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='First name of project owner'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 pr-md-0">
                                                                <div className="form-group ">
                                                                    <label For="name">Last name of project owner<span className='text-danger'>*</span></label>
                                                                    <TextField
                                                                        required
                                                                        onChange={handleChange}
                                                                        value={singleproject?.kycSecondName}
                                                                        id="kycSecondName"
                                                                        name="kycSecondName"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Last name of project owner*'
                                                                        margin="dense"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-12 pl-md-0 mb-4">
                                                                <div className='form-group'>
                                                                    <label For='name'>Upload id or passport <span className='text-danger'>*</span></label>
                                                                    <div className='upload-div text-center'>
                                                                        <label className='upload-btn' for='files'>
                                                                            <img src="\projectstarter\project-card\cloud-image.svg" alt="" className="img-fluid overlay" />
                                                                            <p><span className='dimColor'>Drag & drop or </span>Browse </p>
                                                                        </label>
                                                                        {uploadImage1 && (
                                                                            <img src={uploadImage1} alt="" className="img-fluid  imoo" />
                                                                        )}
                                                                    </div>
                                                                    <input
                                                                        fullWidth
                                                                        accept="image/gif, image/jpg, image/jpeg, image/png"
                                                                        type='file'
                                                                        name='image'
                                                                        autoComplet='off'
                                                                        onChange={catchImage1}
                                                                        className='input-fields d-none'
                                                                        id='files'
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 pr-md-0">
                                                                <ul className="list-inline mt-3 text-md-auto shdbshbdshd text-center">
                                                                    <li className="list-inline-item">
                                                                        <button className='btn-common' type="button" onClick={approveproject}>Approve</button>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <button className=' btn-red' onClick={unapproveproject}>Reject</button>
                                                                    </li>

                                                                    <li className="list-inline-item">
                                                                        <button className=' btn-red btn-greennn' onClick={editBanner}>Edit</button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </div>

                                            </div>
                                            <div className="col-md-4 col-12 order-md-1 order-0">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className='form-group'>
                                                            <label For='name'>Logo <span className='text-danger'>*</span></label>
                                                            <div className='upload-div text-center'>
                                                                <label className='upload-btn' for='filess'>
                                                                    <img src="\projectstarter\project-card\cloud-image.svg" alt="" className="img-fluid overlay" />
                                                                    <p><span className='dimColor'>Drag & drop or </span>Browse </p>
                                                                </label>
                                                                {uploadImage && (
                                                                    <img src={uploadImage} alt="" className="img-fluid  imoo" />
                                                                )}
                                                            </div>
                                                            <input
                                                                fullWidth
                                                                accept="image/gif, image/jpg, image/jpeg, image/png"
                                                                type='file'
                                                                name='image'
                                                                autoComplet='off'
                                                                onChange={catchImage}
                                                                className='input-fields d-none'
                                                                id='filess'
                                                            />
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
