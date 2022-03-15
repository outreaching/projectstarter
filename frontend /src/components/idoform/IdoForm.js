import React from "react";
import { useState, useEffect } from "react";
import "./idoform.scss";
import Navbar from "../landing/header/Navbar";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Backdrop } from "@material-ui/core";
import Footer from "../landing/footer/Footer.js";
import * as Yup from "yup";
import BigNumber from "big-number";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../../hooks/useWeb3";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../utils/ApiURL";
import {
  getIERC20Contract,
  getPoolContract,
} from "../../utils/contractHelpers";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Typography } from "@material-ui/core";
import Faqs from "../landing/faqs/Faqs";
import { useSelector } from "react-redux";
import Environment from "../../utils/Environment";
function IdoForm() {
  const [photo, setPhoto] = useState();
  const [photo1, setPhoto1] = useState();
  const { account } = useWeb3React();
  const [uploadImage, updateuploadImage] = useState("");
  const [kycStatus, setKycStatus] = useState(null);
  const [opens, setOpens] = useState(false);
  const [uploadImage1, updateuploadImage1] = useState("");
  const [priceproject, updatepriceproject] = useState(1);
  const [transactionstatus, settransactionstatus] = useState(false);
  const dark = useSelector((state) => state.UserReducer.theme);
  let call = useSelector((state) => state.UserReducer.status);
  console.log("status::::::::",call)
  const history = useHistory();
  // const handleChange = (event) => {
    //     const { formData } = allFormData;
    //     formData[event.target.name] = event.target.value;
    //     setAllFormData({ formData });
  // }
  // const [allFormData, setAllFormData] = useState({
  //     formData: {
  //         Projectname: '', symbol: '', description: '', PContractAddress: '', ContactPersonName: '', ContactPersonEmail: '', OwnerWalletAddress: '', TotalTokenSupply: '',
  //         AmountAllocatedPresale: '', Decimals: '', PresalePriceBNB: '', ListingPriceBNB: '', preStartdate: '', preEnddate: '', pancakePercentage: '', LaunchPadPercentage: '',
  //         website: '', Telegram: '', Twitter: '', MinAllocation: '', MaxAllocation: '', OwnerFname: '', OwnerLname: ''
  //     },
  // })
  // console.log("formdata", allFormData)
  const [inputList, setInputList] = useState([
    { VestingPercentages: "", VestingUnlockTimes: "" },
  ]);
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { VestingPercentages: "", VestingUnlockTimes: "" },
    ]);
  };
  async function catchImage(e) {
    try {
      const file = e.target.files[0];
      setPhoto(file);
      updateuploadImage(URL.createObjectURL(e.target.files[0]));
    } catch (e) {
      console.log(e);
    }
  }
  console.log("new feild data was ", kycStatus);
  async function catchImage1(e) {
    try {
      const file = e.target.files[0];
      setPhoto1(file);
      updateuploadImage1(URL.createObjectURL(e.target.files[0]));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (account) {
      var data = JSON.stringify({
        walletAddress: account,
      });

      var config = {
        method: "post",
        url: `${API_URL}/v1/Kyc/getDetailOfSingleKyc`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          if (response.data.data?.responseFromBlockPass) {
            setKycStatus(response.data.data.responseFromBlockPass);
            console.log("response", response.data.data);
          } else {
            setKycStatus(null);
          }
        })
        .catch(function (error) {
          console.log(error);
          // dispatch({
          //   type: "GET_USER",
          //   payload: null,
          // });
        });
    }
  }, [account]);

  const CreatePool = async (arg) => {
    console.log("aprrove we have shdshdvhs",arg)
    try {
      setOpens(true);
      const contract = getPoolContract(Environment.deployerContractAddress,web3);
      const approved = await contract.methods
        .deployProjectOnLaunchpad(arg)
        .send({ from: account, value: web3.utils.toWei("1", "ether") })
        .on("transactionHash", (tx) => {
          return tx.transactionHash;
        });
      setOpens(false);
      return approved;
    } catch (err) {
      setOpens(false);
      console.log("pool err", err);
      throw err;
    }
  };

  const web3 = useWeb3();
  const loadWeb3 = async () => {
    setOpens(true);
    try {
      const res = await web3.eth.sendTransaction({
        from: account,
        to: "0x10F58B651A76ac4178d736ec31bb85d7341F12C5",
        value: web3.utils.toWei(priceproject.toString(), "ether"),
      });
      console.log("res skskskcskcm", res);
      if (res.status) {
        settransactionstatus(res.status);
        setOpens(false);
        toast.success("Payement Successfully Done", {
          position: "top-right",
          autoClose: 5000,
        });
        return res.status;
      } else {
        setOpens(false);
      }
    } catch (error) {
      setOpens(false);
      toast.warning("Error while connecting metamask", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  // submit form all data

  const validationSchema = Yup.object().shape({
    Projectname: Yup.string()
      .required('Project name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(20, 'Name must not exceed 20 characters'),
    symbol: Yup.string()
      .required('Project symbol is required')
      .min(1, 'Name must be at least 1 characters')
      .max(10, 'Name must not exceed 5 characters'),
    description: Yup.string()
      .required('description is required')
      .min(16, 'description must be at least 16 characters')
      .max(255, 'description must not exceed 255 characters'),
    PContractAddress: Yup.string()
      .required('Project Contract Address is required'),
    ContactPersonName: Yup.string()
      .required('Contact Person Name is required'),
    ContactPersonEmail: Yup.string()
      .required('Contact Person Email is required'),
    TotalTokenSupply: Yup.string()
      .required('Total Token Supply is required'),
    AmountAllocatedPresale: Yup.string()
      .required('Amount Allocated Presale is required'),
    Decimals: Yup.string()
      .required('Decimals is required'),
    PresalePriceBNB: Yup.string()
      .required('Presale Price is required'),
    FCFSStartdate: Yup.string()
      .required('FCFS Start Date is required'),
    preStartdate: Yup.string()
      .required('Starting Date is required'),
    preEnddate: Yup.string()
      .required('Ending Date is required'),
    SoftCapPercentage: Yup.string()
      .required('SotCap Percentage is required'),
    // LaunchPadPercentage: Yup.string()
    //     .required('LaunchPad Percentage is required'),
    OwnerFname: Yup.string()
      .required('Owner First Name is required'),
    OwnerLname: Yup.string()
      .required('Owner Last Name is required'),

    MinAllocation1: Yup.number()
      .typeError('MinAllocation1 is required'),

    MaxAllocation1: Yup.number()
      .typeError('MaxAllocation1 is required')
      .moreThan(Yup.ref('MinAllocation1'), "Max should be greater then min"),

    MinAllocation2: Yup.number()
      .typeError('MinAllocation2 is required'),

    MaxAllocation2: Yup.number()
      .typeError('MaxAllocation2 is required')
      .moreThan(Yup.ref('MinAllocation2'), "Max should be greater then min"),

    MinAllocation3: Yup.number()
      .typeError('MinAllocation3 is required'),

    MaxAllocation3: Yup
      .number()
      .typeError('MaxAllocation3 is required')
      .moreThan(Yup.ref('MinAllocation3'), "Max should be greater then min"),

    MinAllocation4: Yup.number()
      .typeError('MinAllocation4 is required'),

    MaxAllocation4: Yup
      .number()
      .typeError('MaxAllocation4 is required')
      .moreThan(Yup.ref('MinAllocation4'), "Max should be greater then min"),

    MinAllocation5: Yup.number()
      .typeError('MinAllocation5 is required'),

    MaxAllocation5: Yup
      .number()
      .typeError('MaxAllocation5 is required')
      .moreThan(Yup.ref('MinAllocation5'), "Max should be greater then min"),

    MinAllocation6: Yup.number()
      .typeError('MinAllocation6 is required'),

    MaxAllocation6: Yup
      .number()
      .typeError('MaxAllocation6 is required')
      .moreThan(Yup.ref('MinAllocation6'), "Max should be greater then min"),

    NoofVesting: Yup.number()
    .typeError('Vesting is required'),
    Tier1MaxCap: Yup.number()
      .typeError('Tier1Cap is required'),
    Tier2MaxCap: Yup.number()
      .typeError('Tier2Cap is required'),
    Tier3MaxCap: Yup.number()
      .typeError('Tier3Cap is required'),
    Tier4MaxCap: Yup.number()
      .typeError('Tier4Cap is required'),
    Tier5MaxCap: Yup.number()
      .typeError('Tier5Cap is required'),
    Tier6MaxCap: Yup.number()
      .typeError('Tier6Cap is required'),
  });
  const onSubmit = async (data) => {
    // debugger
    console.log("Data Project IDO", data);
    let contractAddressDeployed = null;
    let dummArr = inputList;
    let a = new Date(data.preStartdate).toUTCString()
    let b = new Date(data.preEnddate).toUTCString()
    let c = new Date(data.FCFSStartdate).toUTCString()
    let d = new Date(data.preEnddate).toUTCString()
    setOpens(true)
    let vestingtime = [];
    let vestPer = [];
    dummArr.map((item) => {
      let a = new Date(item.VestingUnlockTimes).getTime() / 1000;
      vestingtime = [...vestingtime, a.toString()];
      vestPer = [...vestPer, item.VestingPercentages.toString()];
    });
    const data1 = new FormData();
    data1.append("logoURL", photo);
    data1.append("projectName", data.Projectname);
    data1.append("symbol", data.symbol);
    data1.append("projectDescription", data.description);
    data1.append("contractAddress", data.PContractAddress);
    data1.append("contactPersonWalletAddress", account);
    data1.append("contactPersonName", data.ContactPersonName);
    data1.append("contactPersonEmail", data.ContactPersonEmail);
    data1.append("websiteLink", data.website);
    data1.append("twitterLink", data.Twitter);
    data1.append("telegramlink", data.Telegram);
    data1.append("totalSupplyOfToken", data.TotalTokenSupply);
    data1.append("amountAllocatedForPresale", data.AmountAllocatedPresale);
    data1.append("tokenDecimals", data.Decimals);

    data1.append("tokenPriceInBNB", data.PresalePriceBNB);

    // data1.append("listingPriceInBNB", data.ListingPriceBNB)
    // data1.append("liquidityPercentageForPancake", data.pancakePercentage)
    data1.append("maxAllocation1", data.MaxAllocation1);
    data1.append("minAllocation1", data.MinAllocation1);
    data1.append("maxAllocation2", data.MaxAllocation2);
    data1.append("minAllocation2", data.MinAllocation2);
    data1.append("maxAllocation3", data.MaxAllocation3);
    data1.append("minAllocation3", data.MinAllocation3);
    data1.append("maxAllocation4", data.MaxAllocation4);
    data1.append("minAllocation4", data.MinAllocation4);
    data1.append("maxAllocation5", data.MaxAllocation5);
    data1.append("minAllocation5", data.MinAllocation5);
    data1.append("maxAllocation6", data.MaxAllocation6);
    data1.append("minAllocation6", data.MinAllocation6);

    data1.append("noofVesting", data.NoofVesting);

    data1.append("tier1MaxCap", data.Tier1MaxCap);
    data1.append("tier2MaxCap", data.Tier2MaxCap);
    data1.append("tier3MaxCap", data.Tier3MaxCap);
    data1.append("tier4MaxCap", data.Tier4MaxCap);
    data1.append("tier5MaxCap", data.Tier5MaxCap);
    data1.append("tier6MaxCap", data.Tier6MaxCap);

    data1.append("preSaleStartDateAndTime", a);
    data1.append("preSaleEndDateAndTime", b);
    data1.append("FCFSStartdate", c);
    data1.append("FCFSEnddate", d);
    data1.append("attributes", JSON.stringify(inputList));
    data1.append("softCapPercentage", data.SoftCapPercentage);
    data1.append("kycFirstName", data.OwnerFname);
    data1.append("kycSecondName", data.OwnerLname);
    data1.append("kycPassportPicture", photo1);
    if (account) {
      try {
        // debugger
        // let res = await loadWeb3()
        if (1) {
          const epochpreStartTime =
            new Date(data.preStartdate).getTime() / 1000;
          const epochpreEndTime = new Date(data.preEnddate).getTime() / 1000;
          const epochpFSFCStartTime =
            new Date(data.FCFSStartdate).getTime() / 1000;
          const epochpFSFCEndTime =
            new Date(data.preEnddate).getTime() / 1000;
          const minALLocation1 = new BigNumber(data.MinAllocation1).multiply(new BigNumber(10).pow(18));
          const maxALLocation1 = new BigNumber(data.MaxAllocation1).multiply(new BigNumber(10).pow(18));
          const minALLocation2 = new BigNumber(data.MinAllocation2).multiply(new BigNumber(10).pow(18));
          const maxALLocation2 = new BigNumber(data.MaxAllocation2).multiply(new BigNumber(10).pow(18));
          const minALLocation3 = new BigNumber(data.MinAllocation3).multiply(new BigNumber(10).pow(18));
          const maxALLocation3 = new BigNumber(data.MaxAllocation3).multiply(new BigNumber(10).pow(18));
          const minALLocation4 = new BigNumber(data.MinAllocation4).multiply(new BigNumber(10).pow(18));
          const maxALLocation4 = new BigNumber(data.MaxAllocation4).multiply(new BigNumber(10).pow(18));
          const minALLocation5 = new BigNumber(data.MinAllocation5).multiply(new BigNumber(10).pow(18));
          const maxALLocation5 = new BigNumber(data.MaxAllocation5).multiply(new BigNumber(10).pow(18));
          const minALLocation6 = new BigNumber(data.MinAllocation6).multiply(new BigNumber(10).pow(18));
          const maxALLocation6 = new BigNumber(data.MaxAllocation6).multiply(new BigNumber(10).pow(18));
          // const maxALLocation6 = new BigNumber(
          //   data.MaxAllocation6
          // ).multiply(new BigNumber(10).pow(18));
          const maxteir1 = new BigNumber(data.Tier1MaxCap).multiply(new BigNumber(10).pow(18));
          const maxteir2 = new BigNumber(data.Tier2MaxCap).multiply(new BigNumber(10).pow(18));
          const maxteir3 = new BigNumber(data.Tier3MaxCap).multiply(new BigNumber(10).pow(18));
          const maxteir4 = new BigNumber(data.Tier4MaxCap).multiply(new BigNumber(10).pow(18));
          const maxteir5 = new BigNumber(data.Tier5MaxCap).multiply(new BigNumber(10).pow(18));
          const maxteir6 = new BigNumber(data.Tier6MaxCap).multiply(new BigNumber(10).pow(18));
          const tokenPrice = new BigNumber(web3.utils.toWei(data.PresalePriceBNB , 'ether'));
          const amountallocated = new BigNumber(data.AmountAllocatedPresale);
          const amountToSend = amountallocated + (0.02 * amountallocated);
          const softCapPer = new BigNumber(data.SoftCapPercentage);
          try {
            const contract = getIERC20Contract(data.PContractAddress, web3);
            const approved = await contract.methods
              .approve(
                Environment.deployerContractAddress,
                web3.utils.toWei((amountToSend), "ether"))
              
              .send({ from: account });
            if (approved.status) {
              const arg = {
                nameOfProject: data.Projectname.toString(),
                _saleStartTime: epochpreStartTime.toString(),
                _fcfsStartTime: epochpFSFCStartTime.toString(),
                _fcfsEndTime: epochpFSFCEndTime.toString(),
                _saleEndTime: epochpreEndTime.toString(),
                _projectOwner: account.toString(),
                _tokenSender: account.toString(),
                maxAllocTierOne: maxALLocation1.toString(),
                maxAllocTierTwo: maxALLocation2.toString(),
                maxAllocTierThree: maxALLocation3.toString(),
                maxAllocTierFour: maxALLocation4.toString(),
                maxAllocTierFive: maxALLocation5.toString(),
                maxAllocTierSix: maxALLocation6.toString(),
                minAllocTierOne: minALLocation1.toString(),
                minAllocTierTwo: minALLocation2.toString(),
                minAllocTierThree: minALLocation3.toString(),
                minAllocTierFour: minALLocation4.toString(),
                minAllocTierFive: minALLocation5.toString(),
                minAllocTierSix: minALLocation6.toString(),
                tokenToIDO: data.PContractAddress.toString(),
                tokenDecimals: data.Decimals.toString(),
                _numberOfIdoTokensToSell: amountallocated.toString(),
                _tokenPriceInBUSD: tokenPrice.toString(),
                _tierOneMaxCap: maxteir1.toString(),
                _tierTwoMaxCap: maxteir2.toString(),
                _tierThreeMaxCap: maxteir3.toString(),
                _tierFourMaxCap: maxteir4.toString(),
                _tierFiveMaxCap: maxteir5.toString(),
                _tierSixMaxCap: maxteir6.toString(),
                _softCapPercentage: softCapPer.toString(),
                _numberOfVestings: data.NoofVesting.toString(),
                _vestingPercentages: vestPer,
                _vestingUnlockTimes: vestingtime,
              };
              // console.log("arrgument we have", arg)
              let deployer = await CreatePool(arg);
              contractAddressDeployed = await deployer.events
                .OwnershipTransferred[0].address;
              //   console.log("deployer",deployer, contractAddressDeployed)
              data1.append("contractAddressDeployed", contractAddressDeployed);
              data1.append("projectFee", priceproject);
              data1.append("isPresale", 'true');
              setOpens(true);
              axios
                .post(`${API_URL}/v1/Project/addProject`, data1, {
                  headers: { "Content-Type": "multipart/form-data" },
                })
                .then((response) => {
                  console.log("response", response);
                  setOpens(false);
                  history.push("/");
                  toast.success(
                    "Project Added Successfully, Your Project will be Displayed Once admin approve",
                    {
                      position: "top-right",
                      autoClose: 2000,
                    }
                  );
                  // history.push("/");
                  // console.log("success response", response)
                })
                .catch((err) => {
                  setOpens(false);
                  toast.warning("Error While Adding Project", {
                    position: "top-right",
                    autoClose: 2000,
                  });
                  // console.log("error responce", err)
                });
            }
          } catch (err) {
            setOpens(false);
            console.log("approve err", err);
            throw err;
          }
        } else {
          setOpens(false);
          console.log("not hitting api ");
          toast.warning("Error While Adding Project", {
            position: "top-right",
            autoClose: 2000,
          });
        }
        // console.log("newaaaa=========",res.status)
      } catch (e) {
        setOpens(false);
        console.log(e);
      }
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  return (
    <>
      <Backdrop className="loader" sx={{ color: "#fff" }} open={opens}>
        <img
          src="/projectstarter/header/loader.svg"
          alt=""
          className="img-fluid shdshhgdss"
        />
      </Backdrop>
      <div className={dark}>
        <section className="IdoForm-main">
          <Navbar />
          <div className="container-fluid p-0 m-0">
            <div className="row">
              <div className="col-12 p-0 mx-auto ">
                <div className="top-banner text-center ptb">
                  <div className="row">
                    <div className="col-sm-7 col-10 mx-auto text-center">
                      <div className="headWrapper">
                        <h2>Projectstarter IDO Request</h2>
                        <p>
                          This form is for project owners to submit their
                          projects for
                          <br /> us to review as a potential IDO. DO NOT submit
                          this form
                          <br /> if you are looking to participate in an IDO.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="idoform">
                  <ValidatorForm className="form-contact">
                    <div className="row">
                      <div className="col-md-8 col-12 order-md-0 order-1">
                        <div className="row p-md-0">
                          <div className="col-md-6 pl-md-0">
                            <div className="form-group ">
                              <label For="Projectname">
                                Project Name{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <TextField
                                required
                                id="Projectname"
                                name="Projectname"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter your project name"
                                margin="dense"
                                {...register("Projectname")}
                                error={errors.Projectname ? true : false}
                              />
                              <Typography
                                variant="inherit"
                                color="textSecondary"
                              >
                                {errors.Projectname?.message}
                              </Typography>
                            </div>
                          </div>
                          <div className="col-md-6 pr-md-0">
                            <div className="form-group ">
                              <label For="symbol">
                                Project Symbol{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <TextField
                                required
                                id="symbol"
                                name="symbol"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter your project symbol"
                                margin="dense"
                                {...register("symbol")}
                                error={errors.symbol ? true : false}
                              />
                              <Typography
                                variant="inherit"
                                color="textSecondary"
                              >
                                {errors.symbol?.message}
                              </Typography>
                            </div>
                          </div>
                          <div className="col-12 p-md-0">
                            <div className="form-group shsjsjsx">
                              <label For="description">Description</label>

                              <TextField
                                required
                                id="description"
                                type="number"
                                name="description"
                                variant="outlined"
                                fullWidth
                                placeholder="What is your project about (just quickly)"
                                margin="dense"
                                {...register("description")}
                                error={errors.description ? true : false}
                                multiline
                                rows={4}
                              />
                              <Typography
                                variant="inherit"
                                color="textSecondary"
                              >
                                {errors.description?.message}
                              </Typography>
                            </div>
                          </div>
                          <div className="col-12 p-md-0">
                            <div className="form-group">
                              <label For="PContractAddress">
                                Project Contract Address{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <TextField
                                required
                                id="PContractAddress"
                                name="PContractAddress"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter project contract address"
                                margin="dense"
                                {...register("PContractAddress")}
                                error={errors.PContractAddress ? true : false}
                              />
                              <Typography
                                variant="inherit"
                                color="textSecondary"
                              >
                                {errors.PContractAddress?.message}
                              </Typography>
                            </div>
                          </div>
                          <div className="col-md-6 pl-md-0">
                            <div className="form-group ">
                              <label For="ContactPersonName">
                                Contact Person Name{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <TextField
                                required
                                id="ContactPersonName"
                                name="ContactPersonName"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter Contact Person Name"
                                margin="dense"
                                {...register("ContactPersonName")}
                                error={errors.ContactPersonName ? true : false}
                              />
                              <Typography
                                variant="inherit"
                                color="textSecondary"
                              >
                                {errors.ContactPersonName?.message}
                              </Typography>
                            </div>
                          </div>
                          <div className="col-md-6 pr-md-0">
                            <div className="form-group">
                              <label For="ContactPersonEmail">
                                Contact Person Email{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <TextField
                                required
                                id="ContactPersonEmail"
                                name="ContactPersonEmail"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter contact person email"
                                margin="dense"
                                {...register("ContactPersonEmail")}
                                error={errors.ContactPersonEmail ? true : false}
                              />
                              <Typography
                                variant="inherit"
                                color="textSecondary"
                              >
                                {errors.ContactPersonEmail?.message}
                              </Typography>
                            </div>
                          </div>
                          <div className="col-12 p-md-0">
                            <div className="form-group">
                              <label For="OwnerWalletAddress">
                                Token Owner Wallet Address{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <TextField
                                name="OwnerWalletAddress"
                                readonly
                                variant="outlined"
                                value={account ? account : ""}
                                fullWidth
                                placeholder="Connect Your Wallet Please"
                                margin="dense"
                              // {...register('OwnerWalletAddress')}
                              // error={errors.OwnerWalletAddress ? true : false}
                              />
                              {/* <Typography variant="inherit" color="textSecondary">
                                                                {errors.OwnerWalletAddress?.message}
                                                            </Typography> */}
                            </div>
                          </div>
                          <div className="col-12 p-md-0">
                            <hr className="borderbotom my-5"></hr>
                          </div>
                          <section className="pesale-details">
                            <div className="row">
                              <div className="col-12 p-0">
                                <h5>Presale Details</h5>
                              </div>
                              <div className="col-md-6 pl-md-0">
                                <div className="form-group ">
                                  <label For="TotalTokenSupply">
                                    Total Supply of Token
                                    <span className="text-danger">*</span>
                                  </label>

                                  <TextField
                                    required
                                    id="TotalTokenSupply"
                                    type="number"
                                    name="TotalTokenSupply"
                                    variant="outlined"
                                    onWheel={(e) => e.target.blur()}
                                    fullWidth
                                    placeholder="Ex : 5000"
                                    margin="dense"
                                    {...register("TotalTokenSupply")}
                                    error={
                                      errors.TotalTokenSupply ? true : false
                                    }
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.TotalTokenSupply?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pr-md-0">
                                <div className="form-group ">
                                  <label For="AmountAllocatedPresale">
                                    Amount Allocated For Presale
                                    <span className="text-danger">*</span>
                                  </label>
                                  <TextField
                                    required
                                    id="AmountAllocatedPresale"
                                    type="number"
                                    onWheel={(e) => e.target.blur()}
                                    name="AmountAllocatedPresale"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Ex : 2000"
                                    margin="dense"
                                    {...register("AmountAllocatedPresale")}
                                    error={
                                      errors.AmountAllocatedPresale
                                        ? true
                                        : false
                                    }
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.AmountAllocatedPresale?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pl-md-0">
                                <div className="form-group ">
                                  <label For="Decimals">
                                    Total Decimals
                                    <span className="text-danger">*</span>
                                  </label>
                                  <TextField
                                    required
                                    id="Decimals"
                                    type="number"
                                    name="Decimals"
                                    onWheel={(e) => e.target.blur()}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Ex : 18"
                                    margin="dense"
                                    {...register("Decimals")}
                                    error={errors.Decimals ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.Decimals?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pr-md-0">
                                <div className="form-group ">
                                  <label For="PresalePriceBNB">
                                    Presale Price In BUSD{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <TextField
                                    required
                                    id="PresalePriceBNB"
                                    type="number"
                                    name="PresalePriceBNB"
                                    onWheel={(e) => e.target.blur()}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Ex : $0.005"
                                    margin="dense"
                                    {...register("PresalePriceBNB")}
                                    error={
                                      errors.PresalePriceBNB ? true : false
                                    }
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.PresalePriceBNB?.message}
                                  </Typography>
                                </div>
                              </div>
                              {/* <div className="col-md-6 pl-md-0">
                                                                <div className="form-group ">
                                                                    <label For="ListingPriceBNB">Listing Price In BNB <span className='text-danger'>*</span></label>
                                                                  
                                                                    <TextField
                                                                        required
                                                                        id="ListingPriceBNB"
                                                                        type="number"
                                                                        name="ListingPriceBNB"
                                                                        variant='outlined'
                                                                        fullWidth
                                                                        placeholder='Ex : $0.005'
                                                                        margin="dense"
                                                                        {...register('ListingPriceBNB')}
                                                                        error={errors.ListingPriceBNB ? true : false}
                                                                    />
                                                                    <Typography variant="inherit" color="textSecondary">
                                                                        {errors.ListingPriceBNB?.message}
                                                                    </Typography>
                                                                </div>
                                                            </div> */}
                              <div className="col-md-6 pl-md-0">
                                <div className="form-group">
                                  <label For="preStartdate">
                                    Presale Start Date & Time(UTC)
                                    <span className="text-danger">*</span>
                                  </label>

                                  <TextField
                                    required
                                    id="preStartdate"
                                    // type="date"
                                    name="preStartdate"
                                    variant="outlined"
                                    type="datetime-local"
                                    fullWidth
                                    placeholder="mm/dd/yyyy --:-- --"
                                    margin="dense"
                                    className="calender-icon"
                                    {...register("preStartdate")}
                                    error={errors.preStartdate ? true : false}
                                  />
                                  {/* <img src="projectstarter-dark/calendar.png" className="Calender-Img" alt="calenderImg" /> */}
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.preStartdate?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pr-md-0">
                                <div className="form-group">
                                  <label For="preEnddate">
                                    FCFS Start Date
                                    <span className="text-danger">*</span>
                                  </label>

                                  <TextField
                                    required
                                    id="FCFSStartdate"
                                    // type="date"
                                    name="FCFSStartdate"
                                    type="datetime-local"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="mm/dd/yyyy --:-- --"
                                    margin="dense"
                                    {...register("FCFSStartdate")}
                                    error={errors.FCFSStartdate ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.FCFSStartdate?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pl-md-0">
                                <div className="form-group">
                                  <label For="preEnddate">
                                    Presale End Date & Time(UTC)
                                    <span className="text-danger">*</span>
                                  </label>

                                  <TextField
                                    required
                                    id="preEnddate"
                                    // type="date"
                                    name="preEnddate"
                                    type="datetime-local"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="mm/dd/yyyy --:-- --"
                                    margin="dense"
                                    {...register("preEnddate")}
                                    error={errors.preEnddate ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.preEnddate?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pr-md-0">
                                <div className="form-group ">
                                  <label For="pancakePercentage">
                                    Soft Cap Percentage
                                    <span className="text-danger">*</span>
                                  </label>

                                  <TextField
                                    required
                                    id="SoftCapPercentage"
                                    type="number"
                                    name="SoftCapPercentage"
                                    variant="outlined"
                                    onWheel={(e) => e.target.blur()}
                                    fullWidth
                                    placeholder="1"
                                    margin="dense"
                                    {...register("SoftCapPercentage")}
                                    error={
                                      errors.SoftCapPercentage ? true : false
                                    }
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.SoftCapPercentage?.message}
                                  </Typography>
                                </div>
                              </div>
                            </div>
                          </section>
                          <div className="col-12 p-md-0">
                            <hr className="borderbotom my-5"></hr>
                          </div>
                          <section className="pesale-details">
                            <div className="row">
                              <div className="col-12 p-0">
                                <h5>Project Socials</h5>
                              </div>
                              <div className="col-md-6 pl-md-0">
                                <div className="form-group ">
                                  <label For="website">Website URL</label>
                                  <TextField
                                    id="website"
                                    name="website"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Website URL"
                                    margin="dense"
                                    {...register("website")}
                                  // error={errors.website ? true : false}
                                  />
                                  {/* <Typography variant="inherit" color="textSecondary">
                                                                        {errors.website?.message}
                                                                    </Typography> */}
                                </div>
                              </div>
                              <div className="col-md-6 pr-md-0">
                                <div className="form-group ">
                                  <label For="Telegram">
                                    Telegram Group Link{" "}
                                  </label>
                                  <TextField
                                    id="Telegram"
                                    name="Telegram"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Telegram Group Link"
                                    margin="dense"
                                    {...register("Telegram")}
                                  // error={errors.Telegram ? true : false}
                                  />
                                  {/* <Typography variant="inherit" color="textSecondary">
                                                                        {errors.Telegram?.message}
                                                                    </Typography> */}
                                </div>
                              </div>
                              <div className="col-md-6 pl-md-0">
                                <div className="form-group ">
                                  <label For="Twitter">Twitter</label>
                                  <TextField
                                    id="Twitter"
                                    name="Twitter"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter Twitter account"
                                    margin="dense"
                                    {...register("Twitter")}
                                  // error={errors.Twitter ? true : false}
                                  />
                                  {/* <Typography variant="inherit" color="textSecondary">
                                                                        {errors.Twitter?.message}
                                                                    </Typography> */}
                                </div>
                              </div>
                            </div>
                          </section>
                          <div className="col-12 p-md-0">
                            <hr className="borderbotom my-5"></hr>
                          </div>
                          <section className="pesale-details">
                            <div className="row">
                              <div className="col-12 p-0">
                                <h5>Allocation Limits</h5>
                              </div>
                              <div className="col-md-6 pl-md-0">
                                <div className="form-group ">
                                  <label For="MinAllocation">
                                    Min Allocation For Emerald
                                    <span className="text-danger">*</span>
                                  </label>
                                  <TextField
                                    required
                                    id="MinAllocation1"
                                    type="number"
                                    name="MinAllocation1"
                                    variant="outlined"
                                    onWheel={(e) => e.target.blur()}
                                    fullWidth
                                    placeholder="Min Allocation For Emerald"
                                    margin="dense"
                                    {...register("MinAllocation1")}
                                    error={errors.MinAllocation1 ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.MinAllocation1?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pr-md-0">
                                <div className="form-group ">
                                  <label For="MaxAllocation">
                                    Max Allocation For Emerald
                                    <span className="text-danger">*</span>
                                  </label>
                                  <TextField

                                    id="MaxAllocation1"
                                    // type="number"
                                    name="MaxAllocation1"
                                    variant="outlined"
                                    onWheel={(e) => e.target.blur()}
                                    fullWidth
                                    placeholder="Max Allocation For Emerald"
                                    margin="dense"
                                    {...register("MaxAllocation1")}
                                    error={errors.MaxAllocation1 ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.MaxAllocation1?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pl-md-0">
                                <div className="form-group ">
                                  <label For="MinAllocation">
                                    Min Allocation For Ruby
                                    <span className="text-danger">*</span>
                                  </label>
                                  <TextField
                                    required
                                    id="MinAllocation2"
                                    type="number"
                                    name="MinAllocation2"
                                    onWheel={(e) => e.target.blur()}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Min Allocation For Ruby"
                                    margin="dense"
                                    {...register("MinAllocation2")}
                                    error={errors.MinAllocation2 ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.MinAllocation2?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pr-md-0">
                                <div className="form-group ">
                                  <label For="MaxAllocation">
                                    Max Allocation For  Ruby
{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <TextField
                                    required
                                    id="MaxAllocation2"
                                    type="number"
                                    name="MaxAllocation2"
                                    onWheel={(e) => e.target.blur()}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Max Allocation For Ruby"
                                    margin="dense"
                                    {...register("MaxAllocation2")}
                                    error={errors.MaxAllocation2 ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.MaxAllocation2?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pl-md-0">
                                <div className="form-group ">
                                  <label For="MinAllocation">
                                    Min Allocation For Sapphire

                                    <span className="text-danger">*</span>
                                  </label>
                                  <TextField
                                    required
                                    id="MinAllocation3"
                                    type="number"
                                    name="MinAllocation3"
                                    onWheel={(e) => e.target.blur()}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Min Allocation ForSapphire"
                                    margin="dense"
                                    {...register("MinAllocation3")}
                                    error={errors.MinAllocation3 ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.MinAllocation3?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pr-md-0">
                                <div className="form-group ">
                                  <label For="MaxAllocation">
                                    Max Allocation For Sapphire
{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <TextField
                                    required
                                    id="MaxAllocation3"
                                    type="number"
                                    name="MaxAllocation3"
                                    onWheel={(e) => e.target.blur()}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Max Allocation For Sapphire"
                                    margin="dense"
                                    {...register("MaxAllocation3")}
                                    error={errors.MaxAllocation3 ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.MaxAllocation3?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pl-md-0">
                                <div className="form-group ">
                                  <label For="MinAllocation">
                                    Min Allocation For Gold
                                    <span className="text-danger">*</span>
                                  </label>
                                  <TextField
                                    required
                                    id="MinAllocation4"
                                    type="number"
                                    name="MinAllocation4"
                                    onWheel={(e) => e.target.blur()}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Min Allocation For Gold"
                                    margin="dense"
                                    {...register("MinAllocation4")}
                                    error={errors.MinAllocation4 ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.MinAllocation4?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pr-md-0">
                                <div className="form-group ">
                                  <label For="MaxAllocation">
                                    Max Allocation For Gold{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <TextField
                                    required
                                    id="MaxAllocation4"
                                    type="number"
                                    name="MaxAllocation4"
                                    onWheel={(e) => e.target.blur()}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Max Allocation For Gold"
                                    margin="dense"
                                    {...register("MaxAllocation4")}
                                    error={errors.MaxAllocation4 ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.MaxAllocation4?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pl-md-0">
                                <div className="form-group ">
                                  <label For="MinAllocation">
                                    Min Allocation For Platinum
                                    <span className="text-danger">*</span>
                                  </label>
                                  <TextField
                                    required
                                    id="MinAllocation5"
                                    type="number"
                                    name="MinAllocation5"
                                    onWheel={(e) => e.target.blur()}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Min Allocation For Platinum"
                                    margin="dense"
                                    {...register("MinAllocation5")}
                                    error={errors.MinAllocation5 ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.MinAllocation5?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pr-md-0">
                                <div className="form-group ">
                                  <label For="MaxAllocation">
                                    Max Allocation For Platinum{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <TextField
                                    required
                                    id="MaxAllocation5"
                                    type="number"
                                    name="MaxAllocation5"
                                    onWheel={(e) => e.target.blur()}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Max Allocation For Platinum"
                                    margin="dense"
                                    {...register("MaxAllocation5")}
                                    error={errors.MaxAllocation5 ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.MaxAllocation5?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pl-md-0">
                                <div className="form-group ">
                                  <label For="MinAllocation">
                                    Min Allocation For Diamond
                                    <span className="text-danger">*</span>
                                  </label>
                                  <TextField
                                    required
                                    id="MinAllocation6"
                                    type="number"
                                    name="MinAllocation6"
                                    onWheel={(e) => e.target.blur()}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Min Allocation For Diamond"
                                    margin="dense"
                                    {...register("MinAllocation6")}
                                    error={errors.MinAllocation6 ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.MinAllocation6?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pr-md-0">
                                <div className="form-group ">
                                  <label For="MaxAllocation">
                                    Max Allocation For Diamond{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <TextField
                                    required
                                    id="MaxAllocation6"
                                    type="number"
                                    name="MaxAllocation6"
                                    onWheel={(e) => e.target.blur()}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Max Allocation For Diamond"
                                    margin="dense"
                                    {...register("MaxAllocation6")}
                                    error={errors.MaxAllocation6 ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.MaxAllocation6?.message}
                                  </Typography>
                                </div>
                              </div>
                            </div>
                          </section>
                          <div className="col-12 p-md-0">
                            <hr className="borderbotom my-5"></hr>
                          </div>

                          <section className="pesale-details">
                            <div className="row">
                              <div className="col-12 p-0">
                                <h5>Hard Cap <br/> <span style={{fontSize: 14, color: "crimson"}}>*The allocated supply for presale must be divided in 6 pools. The sum of all pools must equal the allocated presale supply.</span> </h5>
                              </div>
                              <div className="col-md-6 pl-md-0">
                                <div className="form-group ">
                                  <label For="MinAllocation">
                                  Emerald MaxCap
                                    <span className="text-danger">*</span>
                                  </label>
                                  <TextField
                                    required
                                    id="Tier1MaxCap"
                                    type="number"
                                    name="Tier1MaxCap"
                                    onWheel={(e) => e.target.blur()}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Emerald MaxCap"
                                    margin="dense"
                                    {...register("Tier1MaxCap")}
                                    error={errors.Tier1MaxCap ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.Tier1MaxCap?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pr-md-0">
                                <div className="form-group ">
                                  <label For="MaxAllocation">
                                  Ruby MaxCap{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <TextField
                                    required
                                    id="Tier2MaxCap"
                                    type="number"
                                    name="Tier2MaxCap"
                                    onWheel={(e) => e.target.blur()}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Ruby MaxCap"
                                    margin="dense"
                                    {...register("Tier2MaxCap")}
                                    error={errors.Tier2MaxCap ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.Tier2MaxCap?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pl-md-0">
                                <div className="form-group ">
                                  <label For="MinAllocation">
                                  Sapphire MaxCap
                                    <span className="text-danger">*</span>
                                  </label>
                                  <TextField
                                    required
                                    id="Tier3MaxCap"
                                    type="number"
                                    name="Tier3MaxCap"
                                    onWheel={(e) => e.target.blur()}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Sapphire MaxCap"
                                    margin="dense"
                                    {...register("Tier3MaxCap")}
                                    error={errors.Tier3MaxCap ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.Tier3MaxCap?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pr-md-0">
                                <div className="form-group ">
                                  <label For="MaxAllocation">
                                  Gold MaxCap{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <TextField
                                    required
                                    id="Tier4MaxCap"
                                    type="number"
                                    name="Tier4MaxCap"
                                    onWheel={(e) => e.target.blur()}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Gold MaxCap"
                                    margin="dense"
                                    {...register("Tier4MaxCap")}
                                    error={errors.Tier4MaxCap ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.Tier4MaxCap?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pl-md-0">
                                <div className="form-group ">
                                  <label For="MinAllocation">
                                  Platinum MaxCap
                                    <span className="text-danger">*</span>
                                  </label>
                                  <TextField
                                    required
                                    id="Tier5MaxCap"
                                    type="number"
                                    name="Tier5MaxCap"
                                    onWheel={(e) => e.target.blur()}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Platinum MaxCap"
                                    margin="dense"
                                    {...register("Tier5MaxCap")}
                                    error={errors.Tier5MaxCap ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.Tier5MaxCap?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pr-md-0">
                                <div className="form-group ">
                                  <label For="MaxAllocation">
                                  Diamond MaxCap{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <TextField
                                    required
                                    id="Tier6MaxCap"
                                    type="number"
                                    name="Tier6MaxCap"
                                    onWheel={(e) => e.target.blur()}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Diamond MaxCap"
                                    margin="dense"
                                    {...register("Tier6MaxCap")}
                                    error={errors.Tier6MaxCap ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.Tier6MaxCap?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pl-md-0">
                                <div className="form-group ">
                                  <label For="MinAllocation">
                                    No of Vesting
                                    <span className="text-danger">*</span>
                                  </label>
                                  <TextField
                                    required
                                    id="NoofVesting"
                                    type="number"
                                    name="NoofVesting"
                                    variant="outlined"
                                    onWheel={(e) => e.target.blur()}
                                    fullWidth
                                    placeholder="eg:1,2,3,4"
                                    margin="dense"
                                    {...register("NoofVesting")}
                                    error={errors.NoofVesting ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.NoofVesting?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="App mt-3">
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
                                              onWheel={(e) => e.target.blur()}
                                              onChange={(e) =>
                                                handleInputChange(e, i)
                                              }
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
                                              // type="date"
                                              name="VestingUnlockTimes"
                                              type="datetime-local"
                                              // value={allData.form.description}
                                              // onChange={handleChange}
                                              value={x.value}
                                              onChange={(e) =>
                                                handleInputChange(e, i)
                                              }
                                              placeholder="/-/-/"
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
                                              {inputList.length !== 1 && (
                                                <button
                                                  className="  btn-common btn-common-1"
                                                  onClick={() =>
                                                    handleRemoveClick(i)
                                                  }
                                                >
                                                  Remove
                                                </button>
                                              )}
                                              <br></br>
                                            </li>
                                            <li className="list-inline-item">
                                              {inputList.length - 1 === i && (
                                                <button
                                                  className=" btn-common"
                                                  onClick={handleAddClick}
                                                >
                                                  {" "}
                                                  Add More
                                                </button>
                                              )}
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </section>

                          <section className="pesale-details">
                            <div className="row">
                              <div className="col-12 p-0">
                                <h5>KYC Details</h5>
                              </div>
                              <div className="col-md-6 pl-md-0">
                                <div className="form-group ">
                                  <label For="OwnerFname">
                                    First name of project owner
                                    <span className="text-danger">*</span>
                                  </label>

                                  <TextField
                                    required
                                    id="OwnerFname"
                                    name="OwnerFname"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter your first name"
                                    margin="dense"
                                    {...register("OwnerFname")}
                                    error={errors.OwnerFname ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.OwnerFname?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-md-6 pr-md-0">
                                <div className="form-group ">
                                  <label For="OwnerLname">
                                    Last name of project owner
                                    <span className="text-danger">*</span>
                                  </label>

                                  <TextField
                                    required
                                    id="OwnerLname"
                                    name="OwnerLname"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter your last name"
                                    margin="dense"
                                    {...register("OwnerLname")}
                                    error={errors.OwnerFname ? true : false}
                                  />
                                  <Typography
                                    variant="inherit"
                                    color="textSecondary"
                                  >
                                    {errors.OwnerLname?.message}
                                  </Typography>
                                </div>
                              </div>
                              <div className="col-12 pl-md-0 mb-4">
                                <div className="form-group">
                                  <label For="name">
                                    Upload id or passport{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="upload-div text-center">
                                    <label className={uploadImage ? "upload-btn opac-25" : "upload-btn"} for="files">
                                      <img
                                        src="\projectstarter\project-card\cloud-image.svg"
                                        alt=""
                                        className="img-fluid overlay"
                                      />
                                      <p>
                                        <span className="dimColor">
                                          Drag & drop or{" "}
                                        </span>
                                        Browse{" "}
                                      </p>
                                    </label>
                                    {uploadImage && (
                                      <img
                                        src={uploadImage}
                                        alt=""
                                        className="img-fluid  imoo"
                                      />
                                    )}
                                  </div>
                                  <input
                                    fullWidth
                                    accept="image/gif, image/jpg, image/jpeg, image/png"
                                    type="file"
                                    name="image"
                                    autoComplet="off"
                                    onChange={catchImage}
                                    className="input-fields d-none"
                                    id="files"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 pr-md-0">
                                <ul className="list-inline mt-3 text-md-auto">
                                  {kycStatus == "approved" ? 
                                     <li className="list-inline-item">
                                     <button
                                       className="btn-common"
                                       type="submit"
                                       onClick={handleSubmit(onSubmit)}
                                     >
                                       Submit
                                     </button>
                                   </li> : "KYC Is Required"
                                  }
                               
                                  {/* <li className="list-inline-item">
                                    <button className="btn-common btn-common-clear">
                                      Clear Form
                                    </button>
                                  </li> */}
                                </ul>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                      <div className="col-md-4 col-12 order-md-1 order-0">
                        <div className="row">
                          <div className="col-12">
                            <div className="form-group">
                              <label For="name">
                                Upload Logo{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <div className="upload-div text-center">
                                <label className={uploadImage1 ? "upload-btn opac-25" : "upload-btn"} for="files1">
                                  <img
                                    src="\projectstarter\project-card\cloud-image.svg"
                                    alt=""
                                    className="img-fluid overlay"
                                  />
                                  <p>
                                    <span className="dimColor">
                                      Drag & drop or{" "}
                                    </span>
                                    Browse{" "}
                                  </p>
                                </label>
                                {uploadImage1 && (
                                  <img
                                    src={uploadImage1}
                                    alt=""
                                    className="img-fluid  imoo"
                                  />
                                )}
                              </div>
                              <input
                                fullWidth
                                accept="image/gif, image/jpg, image/jpeg, image/png"
                                type="file"
                                name="image"
                                autoComplet="off"
                                onChange={catchImage1}
                                className="input-fields d-none"
                                id="files1"
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
          <Faqs />
        </section>
        <Footer />
      </div>
    </>
  );
}

export default IdoForm;
