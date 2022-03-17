import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/ApiURL";
import { useWeb3React } from "@web3-react/core";
import "./projects.scss";
import { Backdrop } from "@material-ui/core";
import { toast } from "react-toastify";
import useEthBalance from "../../utils/WalletBalance";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../landing/header/Navbar.js";
import { GetStatus } from "../../redux/action/index";
import useWeb3 from "../../hooks/useWeb3";
import { getPoolContract2, TokenContract } from '../../utils/contractHelpers'
import Footer from "../landing/footer/Footer.js";
import Faqs from "../landing/faqs/Faqs.js";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { StakedAmount } from "../../hooks/dataFetcher.js";
import { UserTier, Swapped, RemainingAllocation, StakedPoolAmount, BusdInAllTier, TotalMaxCap, TokenPriceBUSD, ClaimToken } from "../../hooks/tierInfoFetchers";
import {
  getIERC20Contract,
  getPoolContract,
} from "../../utils/contractHelpers";
import Environment from "../../utils/Environment";
const ProjectDetail = () => {
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const dark = useSelector((state) => state.UserReducer.theme);
  const call = useSelector((state) => state.UserReducer.status);
  console.log("userrrr",call)
  const [details, setDetails] = useState(null);
  const [swapped, setSwapped] = useState(0);
  const stake = StakedPoolAmount();
  const [opens, setOpens] = useState(false);
  const [Tiers, setTiers] = useState(0);
  const [myTier, setMyTier] = useState('')
  const [kycStatus, setKycStatus] = useState(null);
  const [remAllo, setRemAllo] = useState(0);
  const [approveAmount, setApproveAmount] = useState(0);
  const [totalBusdAllTier, setTotalBusdAllTier] = useState(0);
  const [Txstatus, setTxstatus] = useState(0);
  const [allowencess, setallowencess] = useState(0);
  const [allocation, setAllocation] = useState(null);
  const [claimeddata, setclaimeddata] = useState({
    vestingPercentages: [],
    alreadyClaimed: [],
  });

  useEffect(() => {
    if (account) {
      console.log("asdaesfasdfsdafsddasfas")
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
            // dispatch(GetStatus(data));
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

  // useEffect(() => {
  //   window.location.reload()
  // }, [account])
  
  // console.log("claimed tokens we have", Txstatus)s
  const [numberOfIdoTokensToSell, setNumberOfIdoTokensToSell] = useState(0);
  const [TokenPriceBusd, setTokenPriceBusd] = useState(0);

  const { id } = useParams();
// console.log("sdasdsaads::::::",remAllo)
  // const Stakedbalance = StakedPoolAmount();
  const { Tier } = UserTier();
  const { Maxcap } = TotalMaxCap()
  const { TotalBusdInAllTier } = BusdInAllTier()
  const { Price } = TokenPriceBUSD()
  const { RAllocation } = RemainingAllocation();
  const { TierSwap } = Swapped();
  const { ClaimCall } = ClaimToken();
  // let ethBalance = useEthBalance();
  // const userbalance = (ethBalance.toNumber() / 10 ** 18).toFixed(5);
  // console.log("perrr", claimeddata?.alreadyClaimed[0])
  const [userbalance, setUserBalance] = useState(0)
  let account1 = account
  useEffect(() => {
    // if (account) {
    // try {
    const getBalance = async () => {
      // console.log('in effect::::', account1)
      let userbalance1 = await web3.eth.getBalance(account1);
      setUserBalance(parseInt(userbalance1) / 10 ** 18);
    }


    getBalance()

  }, [account1]);
  useEffect(() => {
    getProjectById();
  }, []);
  useEffect(() => {
    if (details?.contractAddressDeployed && account) {
      Getclaimeddata()
    }
  }, [details?.contractAddressDeployed, details?.statusOfProject , account]);
  
  const getProjectById = async () => {
    setOpens(true);
    var data = JSON.stringify({
      _id: id,
    });
    var config = {
      method: "post",
      url: `${API_URL}/v1/Project/getDetailOfSingleProjectById`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setOpens(false)
        setDetails(response.data.data);
      })
      .catch(function (error) {
        setOpens(false)
        console.log(error);
      });
  };

  const Getclaimeddata = async () => {
    try {
      if(details?.statusOfProject == 'close'){
        setOpens(true)
        await axios.post(`${API_URL}/v1/Project/claimProject`, { contractAddressDeployed: details?.contractAddressDeployed, account: account })
          .then((response) => {
            // console.log("claimed data we get", response.data.data)
            setOpens(false)
            setAllocation(response.data.data.allocation);
            setclaimeddata(response.data.data);
            // toast.success('Project Added Successfully, Your Project will be Displayed Once admin approve', {
            //     position: "top-rights",
            //     autoClose: 2000,
            // });
          }).catch((err) => {
            setOpens(false)
            toast.warning('Error While Getting Claimed data', {
              position: "top-right",
              autoClose: 2000,
            });
            // console.log("error responce", err)
          })
      }
    
    }
    catch (e) {
      console.log(e)
    }
  };
  // console.log("allownce we have here", allowencess)
  // console.log("maxcappppp", numberOfIdoTokensToSell * TokenPriceBusd)
  useEffect(async () => {
    if (account && details) {
      // const res = await Stakedbalance(account, details?.contractAddressDeployed);
      // await setStake(parseInt(res.amount / 10 ** 18));
      const res2 = await TotalBusdInAllTier(details?.contractAddressDeployed)
      const res3 = await Maxcap(details?.contractAddressDeployed);
      const res4 = await Price(details?.contractAddressDeployed);
      if (stake > 0) {
        const res1 = await Tier(details?.contractAddressDeployed, stake)
        console.log("swapppeddddddd-------==================", res1)
        setTiers(res1)
        if (res1) {
          const res0 = await TierSwap(details?.contractAddressDeployed, res1);
          const resR = await RAllocation(details?.contractAddressDeployed, res1)
          setSwapped(parseInt(res0 / 10 ** 18).toFixed(2));
          setRemAllo(resR / 10 ** 18)
          if (res1 === 1) {
            setMyTier('Emerald')
          } else if (res1 === 2) {
            setMyTier('Ruby') 
          } else if (res1 === 3) {
            setMyTier('Sapphire') 
          } else if (res1 === 4) {
            setMyTier('Gold') 
          } else if (res1 === 5) {
            setMyTier('Platinum') 
          } else if (res1 === 6) {
            setMyTier('Diamond')
          }
        }
        // console.log("tier we get here", res1)
      }
      setTokenPriceBusd(res4 / 10 ** 18)
      setNumberOfIdoTokensToSell(res3)
      setTotalBusdAllTier(res2 / 10 ** 18)
      // console.log('res res +++++', resR)
      
   
    }
  }, [account, details, stake]);

  const claimfailed = () => {
    toast.error('Please Finalize Your Sale First In Your Project List', {
      position: "top-right",
      autoClose: 5000,
    });
  }
  const approvetoken = async () => {
    setOpens(true);
    try {
      const contract = TokenContract("0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", web3);
      const approved = await contract.methods
        .approve(
          details?.contractAddressDeployed, web3.utils.toWei('1000000000000000000', 'ether'))
        .send({ from: account });
      // console.log("approved tokensssss", approved)
      if (approved.status) {
        setOpens(false)
        toast.success('Approve Token Successfully', {
          position: "top-right",
          autoClose: 5000,
        });
        CheckAllowance();
      } else {
        setOpens(false)
      }
    } catch (error) {
      setOpens(false)
      toast.warning('Error while connecting metamask', {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const Claimctc = useCallback(async () => {

    try {
      // console.log("=============")
      // setShowLoader(true)
      setOpens(true);
      const tx = await ClaimCall(details?.contractAddressDeployed);
      if (tx.status) {
        await setTxstatus(tx.status);
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

  const JoinPool = async () => {
    setOpens(true);
    try {
      const contract = getPoolContract2(details?.contractAddressDeployed, web3);
      const approved = await contract.methods
        .participateAndPay(
          web3.utils.toWei(approveAmount.toString(), 'ether'))
        .send({ from: account });
      // console.log("pools joinn", approved)
      if (approved.status) {
        setOpens(false)
        toast.success('Join Pool Successfully', {
          position: "top-right",
          autoClose: 5000,
        });
        window.location.reload();
      } else {
        setOpens(false)
      }
    } catch (error) {
      setOpens(false)
      toast.warning('Pool Time End', {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };
  const [detaillottery, setdetaillottery] = useState('');
  const getlotterydetail = () => {
    if(Tiers < 4){
      setOpens(true)
      axios.post(`${API_URL}/v1/Lottery/getLotteryStatus`, { contractAddressDeployed: details?.contractAddressDeployed, walletAddress: account })
        .then((response) => {
          setOpens(false)
          setdetaillottery(response.data.data)
          // console.log("lotetry", response)
        })
        .catch((err) => {
          setOpens(false)
          toast.warning('Error While getting user Lottery', {
            position: "top-right",
            autoClose: 3000,
          });
          return false;
        })
    }
   
  }
  // console.log("tier value we have here", detaillottery.tier)
  useEffect(() => {
    if (details?.contractAddressDeployed && account && Tiers) {
      getlotterydetail();
    }


  }, [details, account, Tiers]);


  // let nowwwww = new Date()
  // console.log("now time ",nowwwww)
  // var date = new Date();
  // var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
  //   date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  // console.log("now", now_utc)
  // console.log("nowwwwwww",nowwwww)
  // console.log("start presale time",details?.preSaleEndDateAndTime)
  // let starttime =  details?.preSaleEndDateAndTimes
  // console.log("start time",starttime)
  // let endtime = details?.preSaleEndDateAndTime
  // let check=presale>nowwwww
  // console.log("check",check)

  const CheckAllowance = async () => {
    const contract = getIERC20Contract("0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", web3);
    let tallow = await contract.methods.allowance(account, details?.contractAddressDeployed).call()
    // console.log("allowance", tallow / 10 ** 18)
    await setallowencess(tallow / 10 ** 18)
  }
  let totalpercentage = totalBusdAllTier / numberOfIdoTokensToSell * 100
  // let totalpercentages = 50000/100000*100
  // console.log("total percentage we have here is ", totalpercentages)

  useEffect(() => {
    if (account) {
      CheckAllowance();
    }

  }, [account, details]);
  // console.log("allowence we get here wass",allowencess)

  const [status, setStatus] = useState(null);
  useEffect(() => {
    setStatus(call);
  }, [call, account])
  // console.log("status we get here is ", status)
  // useEffect(() => {
  //   if (account) {
  //     if(status === null){
  //       getUserStatus();
  //     }
  //   } else {
  //     setStatus(null);
  //   }
  // }, [account]);

  // const getUserStatus = () => {
  //   dispatch(GetStatus(account));
  // };


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
                              <img
                                // src="\projectstarter\projectdetail-page\logo-one.png"
                                src={details?.logoURL}
                                width={80}
                                height={80}
                                // style={{borderRadius: 51}}
                                className="img-fluid"
                                alt=""
                              />
                            </div>
                          </li>
                          <li className="list-inline-item d-flex justify-content-between align-item-center w-100">
                            <div className="inner-logo">
                              <h4 className="white">{details?.projectName}</h4>
                              <h5 className="white">
                                {details?.contactPersonName}
                              </h5>
                            </div>
                            <div className="">
                              <button target="_blank" className="open-btn">
                                {details?.statusOfProject}

                                {/* {starttime > nowwwww ?
                                  'comingsoon' : starttime > nowwwww && endtime < nowwwww ?
                                    "Open" : "close"
                                } */}

                              </button>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-12 p-0">
                        <ul className="list-inline mt-3 d-flex align-items-center">
                          <li className="list-inline-item ghjk">
                            <img
                              src="/projectstarter/socials/world.svg"
                              alt=""
                            />
                          </li>
                          <li className="list-inline-item ghjk">
                            <img
                              src="/projectstarter/socials/m-detail.svg"
                              alt=""
                            />
                          </li>
                          <li className="list-inline-item ghjk">
                            <img
                              src="/projectstarter/socials/telegram-detail.svg"
                              alt=""
                            />
                          </li>
                          <li className="list-inline-item ghjk">
                            <img
                              src="/projectstarter/socials/Twitter-detail.svg"
                              alt=""
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p className="ptb20 white">
                      {details?.projectDescription}
                      {/* At vero eos et accusamus et iusto odio dignissimos ducimus
                      qui blandis praesentium voluptatum deleniti atque corrupti
                      quos dolores et quas molestias excepturi sint occaecati. */}
                    </p>
                    {Tiers >= 4 && details?.statusOfProject == 'open' && stake >= 1000 && kycStatus == "approved" ?
                      <div>
                        <ul className="list-inline">
                          {allowencess > 0 ?
                            <div>
                              <input onChange={(e) => setApproveAmount(e.target.value)} class="form-control w-50 hfghfg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="0"></input>
                              <li className="list-inline-item ptb20">
                                <button className="btn btn-white ghgh" onClick={JoinPool}>Join Pool</button>
                              </li>
                            </div>
                            :
                            <li className="list-inline-item ptb20">
                              <button className="btn btn-white ghgh" onClick={approvetoken}>Approve Token</button>
                            </li>
                          }
                        </ul>
                      </div> :
                        detaillottery?.tier > 0 && details?.statusOfProject == 'open' && stake >= 1000 && kycStatus == "approved" ?
                        <div>
                          <ul className="list-inline">
                            {allowencess > 0 ?
                              <div>
                                <input onChange={(e) => setApproveAmount(e.target.value)} class="form-control w-50 hfghfg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="0"></input>
                                <li className="list-inline-item ptb20">
                                  <button className="btn btn-white ghgh" onClick={JoinPool}>Join Pool</button>
                                </li>
                              </div>
                              :
                              <li className="list-inline-item ptb20">
                                <button className="btn btn-white ghgh" onClick={approvetoken}>Approve Token</button>
                              </li>
                            }
                          </ul>
                        </div>
                        :
                        <div>
                          {details?.statusOfProject == 'close' ?
                            <h3 className="asgvasv">POOL CLOSED NOW</h3>
                            :
                            <div className="texterror shadow">
                              <h3>* For Pool Participation Following Conditions Should Meet :</h3>
                              <h6><span>1-</span> User must be whitelisted for participating in pool </h6>
                              <h6><span>2-</span> KYC approved by admin</h6>
                              <h6><span>3-</span> BUSD should be in wallet</h6>
                              <h6><span>4-</span> User must stake token more than or equal to 1000</h6>
                            </div>
                          }
                        </div>
                    }

                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="inner-contentCard my-5 my-md-0">
                  <div className="row mb-3">
                    <div className="col-5">
                      <div>
                        <p>Your Balance</p>
                        {/* <h5 className="p-main">0.0000 BUSD</h5> */}
                        <h5 className="p-main">{userbalance.toFixed(3)} BNB</h5>
                      </div>
                    </div>
                    <div className="col-5 p-0">
                      <div>
                        <p>Your Staked amount:</p>
                        <h5 className="p-main">{stake}</h5>
                      </div>
                    </div>
                    <div className="col-lg-2 mt-lg-0 mt-4">
                      <div>
                        <p className="sgvsg">Your Tier</p>
                        <h5 className="p-main">{stake ?
                          myTier
                          :
                          '0'
                        }</h5>
                      </div>
                    </div>
                  </div>
                  <div className="row my-4">
                    <div className="col-md-5 col-6">
                      <div>
                        <p>Swapped</p>
                        <h5 className="p-main">{swapped} BUSD</h5>
                        <p className="p-main1 font-weight-bold">Roco</p>
                      </div>
                    </div>
                    <div className="col-md-5 col-6 p-0">
                      <div>
                        <p>Remaining Allocation</p>
                        <h5 className="p-main">{remAllo && swapped ? remAllo - swapped : '0'} BUSD</h5>
                      </div>
                    </div>
                  </div>
                  {/* <span class="placeholder col-6"></span>
<span class="placeholder w-75"></span>
<span class="placeholder" style="width: 25%;"></span> */}
                  <div className="row mb-1 mt-3">
                    <div className="col-11 ">
                      <h6 className="grey">Pool Progress</h6>
                    </div>
                    <div className="col-1 pl-0 ">
                      <div className="inner-btn">
                        <p className="grey font-weight-bold " >{
                          totalpercentage ?
                            totalpercentage.toFixed(2)
                            :
                            0

                        }%</p>
                      </div>

                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${totalpercentage}%` }}
                          aria-valuenow="70"
                          aria-valuemin="20"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <h6 className="common font-weight-bolder text mt-1">
                        BUSD {totalBusdAllTier} / ${numberOfIdoTokensToSell && TokenPriceBusd ? numberOfIdoTokensToSell * TokenPriceBusd : 0}
                      </h6>
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
                    <a
                      className="nav-item nav-link active"
                      id="nav-home-tab"
                      data-toggle="tab"
                      href="#nav-home"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                    >
                      Project Detail
                    </a>
                    <a
                      className="nav-item nav-link"
                      id="nav-profile-tab"
                      data-toggle="tab"
                      href="#nav-profile"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      Schedule
                    </a>
                    <a
                      className="nav-item nav-link"
                      id="nav-contact-tab"
                      data-toggle="tab"
                      href="#nav-contact"
                      role="tab"
                      aria-controls="nav-contact"
                      aria-selected="false"
                    >
                      Your Allocation
                    </a>
                  </div>
                </nav>
                <div className="tab-content mt-3" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div className="row">
                      <div className="col-md-6 pl-0">
                        <div className="main-table">
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">Pool Information</th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Opens</td>
                                  <td>{details?.preSaleStartDateAndTime.split('Z')[0]} UTC</td>
                                </tr>
                                <tr>
                                  <td>FCFS Opens</td>
                                  <td>{details?.FCFSStartdate.split('Z')[0]} UTC</td>
                                </tr>
                                <tr>
                                  <td>Closes</td>
                                  <td>{details?.preSaleEndDateAndTime.split('Z')[0]} UTC</td>
                                </tr>
                                {/* <tr>
                                  <td>Swap Rate</td>
                                  <td>1 BUSD = 142.8571 BITORB</td>
                                </tr> */}
                                <tr>
                                  <td>MAX Cap</td>
                                  <td>{numberOfIdoTokensToSell} BUSD</td>
                                </tr>
                                <tr>
                                  <td>Total Users Participated</td>
                                  <td>2920</td>
                                </tr>
                                <tr>
                                  <td>Total Funds Swapped</td>
                                  <td>{swapped && swapped ?
                                    swapped
                                    :
                                    0
                                  } BUSD</td>
                                </tr>
                                {/* <tr>
                                  <td>Access Type</td>
                                  <td>Private</td>
                                </tr> */}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-md-6 pl-0">
                        <div className="main-table">
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">Token Information</th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Opens</td>
                                  <td>{details?.preSaleStartDateAndTime.split('Z')[0]}UTC</td>
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
                      </div> */}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    <div className="row">
                      <div className="col-md-8 pl-0">
                        <div className="main-table">
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">Round</th>
                                  <th scope="col">Opens</th>
                                  <th scope="col">Closes</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Alloction</td>
                                  <td>{details?.preSaleStartDateAndTime.split('Z')[0]}</td>
                                  <td>{details?.preSaleEndDateAndTime.split('Z')[0]}</td>
                                </tr>
                                {/* <tr>
                                  <td>FCFS-Prepare</td>
                                  <td>2021-11-04 08:00:00 UTC</td>
                                  <td>2021-11-04 08:00:00 UTC</td>
                                </tr> */}
                                <tr>
                                  <td>FCFS-Start-Time</td>
                                  <td>{details?.FCFSStartdate.split('Z')[0]} UTC</td>
                                  <td>{details?.FCFSEnddate.split('Z')[0]} UTC</td>
                                </tr>
                                {/* <tr>
                                  <td>.</td>
                                  <td></td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>.</td>
                                  <td></td>
                                  <td></td>
                                </tr> */}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-contact"
                    role="tabpanel"
                    aria-labelledby="nav-contact-tab"
                  >
                    <div className="row">
                      <div className="col-md-12 pl-md-0 order-md-0 order-1">
                        <div className="main-table">
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  {/* <th scope="col">NO.</th> */}
                                  <th scope="col">Allocation</th>
                                  <th scope="col">Percentage</th>
                                  <th scope="col">Date</th>
                                  <th scope="col">Claimed</th>
                                  <th scope="col">Aciton</th>
                                </tr>
                              </thead>
                              <tbody>
                                {claimeddata?.vestingPercentages.map((item, index) => {
                                  return (<tr>
                                    {/* <td>1</td> */}
                                    <td>{allocation}</td>
                                    <td>{item * 10 ** 18}%</td>
                                    <td>{Date((claimeddata?.vestingUnlockTimes[index] * 1000).toString())}</td>
                                    <td>{`${claimeddata?.alreadyClaimed[index] == true ? 'YES' : 'NO'}`}</td>
                                    {/* <td>dfdfdfd</td> */}
                                    <td>
                                      {details?.finalizeStatus === true ?
                                        <button className="btn-common mt-0" onClick={Claimctc}>
                                          Claim Token
                                        </button>
                                        :
                                        <button className="btn-common sbdhsbd mt-0" onClick={claimfailed}>
                                          Claim Token
                                        </button>
                                      }
                                    </td>
                                  </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-md-3 text-center pr-md-0 my-2 order-md-1 order-0">
                        <button
                          className="btn-common w-100"
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                        >
                          Add Token to MetaMask
                        </button>
                      </div> */}
                    </div>
                    {/* <!-- Modal --> */}
                    <div
                      className="modal fade"
                      id="exampleModalCenter"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenterTitle"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-body">
                            <div className="text-center modal-inner-data ptb20">
                              <p>Token Quantity</p>
                              <h3> 4132,311,121 PSR</h3>
                            </div>
                          </div>
                          <div className="ptb20 text-center">
                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <button className="btn-common">
                                  Add Token to MetaMask
                                </button>
                              </li>
                              <li className="list-inline-item">
                                <button
                                  type="button"
                                  className="btn-common-outline"
                                  data-dismiss="modal"
                                >
                                  Cancel
                                </button>
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
  );
};

export default ProjectDetail;
