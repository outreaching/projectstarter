import React, { useEffect, useState } from "react";
import "./projects.scss";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import GetApprovedTok from "../../hooks/getPooldata";
import { BusdInAllTier, TotalMaxCap, TokenPriceBUSD, TotalBusdalltier } from "../../hooks/tierInfoFetchers";
const ClosedNow = ({ item }) => {
  // console.log("dataa date start", item);
  const dark = useSelector((state) => state.UserReducer.theme);
  // const { getApproved } = GetApprovedTok();
  const [numberOfIdoTokensToSell, setNumberOfIdoTokensToSell] = useState(0);
  const [totalBusdAllTier, setTotalBusdAllTier] = useState(0);
  const [TokenPriceBusd, setTokenPriceBusd] = useState(0);
  const [Totalalltierprice, setTotalalltierprice] = useState(0);
  const { Maxcap } = TotalMaxCap()
  const { TotalBusdInAllTier } = BusdInAllTier()
  const { Price } = TokenPriceBUSD()
  const { Altierbusd } = TotalBusdalltier()
  const { account } = useWeb3React();
  let totalpercentage = totalBusdAllTier / numberOfIdoTokensToSell * 100

  // useEffect(async () => {
  //   // console.log("called");
  //   const res = await getApproved();
  //   // console.log("res", res);
  // }, []);

  useEffect(async () => {
    if (account && item) {
      const res2 = await TotalBusdInAllTier(item.contractAddressDeployed)
      const res3 = await Maxcap(item.contractAddressDeployed);
      const res4 = await Price(item.contractAddressDeployed);
      const res5 = await Altierbusd(item.contractAddressDeployed);
      setTotalBusdAllTier(res2 / 10 ** 18)
      setNumberOfIdoTokensToSell(res3)
      setTokenPriceBusd(res4 / 10 ** 18)
      setTotalalltierprice(res5 / 10 ** 18)
      // console.log("Total BUSD in all Tier",res2)
      // console.log("Total MAXCAP in all Tier",res3)
      // console.log("Total All Tier Prixce we have here is ",res5)
    }
  }, [account, item]);
  return (
      <div className={dark}>
        <Link to={`/projectdetail/${item?._id}`}>
          <div className="inner-card">
            <div className="row">
              <div className="col-9 text-left p-0">
                <ul className="list-inline d-flex align-items-center">
                  <li className="list-inline-item">  
                    <div className="inner-img">
                      <img
                        src="\projectstarter\project-card\project-logo.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </li>
                  <li className="list-inline-item">
                    <div className="inner-img">
                      <h5>{item?.projectName}</h5>
                      {/* <p className="grey">
                        <small>1 YAY = 12.23131 PSR</small>
                      </p> */}
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-3 text-right p-0">
                <div className="inner-btn">
                  <button className="project-coming">
                   Closed
                  </button>
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
                <div className="col-sm-12 p-0">
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
                  <h5 className="common mt-1">BUSD 
                  {totalBusdAllTier} / ${numberOfIdoTokensToSell && TokenPriceBusd ? numberOfIdoTokensToSell * TokenPriceBusd : 0}
                  </h5>
                </div>
              </div>
            </div>
            <div className="brdr"></div>
            <div className="ptb10 inner-small-cards">
              <div className="row">
                {/* <div className="col-sm-4 col-6 p-0">
                            <ul className='list-inline small-cards-ul d-flex align-items-center'>
                                <li className='list-inline-item'>
                                    <img src={dark === 'dark' ? "/projectstarter/project-card/perticipants-icon-dark.svg" : "/projectstarter/project-card/perticipants-icon.svg"} className='img-fluid smallLogo' alt="" />
                                </li>
                                <div className="list-inline-item small-cards-ul-li2">
                                    <p>Participants</p>
                                    <p>20,250</p>
                                </div>
                            </ul>
                        </div> */}
                <div className="col-sm-6 col-6 p-0">
                  <ul className="list-inline small-cards-ul d-flex align-items-center">
                    <li className="list-inline-item">
                      <img
                        src={
                          dark === "dark"
                            ? "/projectstarter/project-card/start-date-icon-dark.svg"
                            : "/projectstarter/project-card/start-date-icon.svg"
                        }
                        className="img-fluid smallLogo"
                        alt=""
                      />
                    </li>
                    <div className="list-inline-item small-cards-ul-li2">
                      <p>End-Date</p>
                      <p>{item?.preSaleEndDateAndTime.slice(0, 10)}</p>
                    </div>
                  </ul>
                </div>
                <div className="col-sm-6 col-6 p-0">
                  <ul className="list-inline small-cards-ul d-flex align-items-center">
                    <li className="list-inline-item">
                      <img
                        src={
                          dark === "dark"
                            ? "/projectstarter/project-card/token-price-icon-dark.svg"
                            : "/projectstarter/project-card/token-price-icon.svg"
                        }
                        className="img-fluid smallLogo"
                        alt=""
                      />
                    </li>
                    <div className="list-inline-item small-cards-ul-li2">
                      <p>Token Price</p>
                      <p>{item?.tokenPriceInBNB}</p>
                    </div>
                  </ul>
                </div>

                {/* <div className="col-sm-4  mt-sm-4 mt-0 col-6 p-0">
                  <div className="bgb d-md-block d-none"></div>
                  <ul className="list-inline small-cards-ul d-flex align-items-center">
                    <li className="list-inline-item">
                      <img
                        src={
                          dark === "dark"
                            ? "/projectstarter/project-card/access-icon-dark.svg"
                            : "/projectstarter/project-card/access-icon.svg"
                        }
                        className="img-fluid smallLogo"
                        alt=""
                      />
                    </li>
                    <div className="list-inline-item small-cards-ul-li2 small-cards-ul-li2-2">
                      <p>Access</p>
                      <p>Private</p>
                    </div>
                  </ul>
                </div> */}
                <div className="col-sm-4 mt-sm-4 mt-0 col-6 p-0">
                  <div className="bgb d-md-block d-none"></div>
                  <ul className="list-inline small-cards-ul d-flex align-items-center">
                    <li className="list-inline-item">
                      <img
                        src={
                          dark === "dark"
                            ? "/projectstarter/project-card/token-sold-icon-dark.svg"
                            : "/projectstarter/project-card/token-sold-icon.svg"
                        }
                        className="img-fluid smallLogo"
                        alt=""
                      />
                    </li>
                    <div className="list-inline-item small-cards-ul-li2 small-cards-ul-li2-2">
                      <p>Token Sold</p>
                      <p>{Totalalltierprice && 
                      Totalalltierprice ?
                      Totalalltierprice
                      :
                      0
                      }</p>
                    </div>
                  </ul>
                </div>
                {/* <div className="col-sm-4  mt-sm-4 mt-0 col-6 p-0">
                  <div className="bgb d-md-block d-none"></div>
                  <ul className="list-inline small-cards-ul d-flex align-items-center">
                    <li className="list-inline-item">
                      <img
                        src={
                          dark === "dark"
                            ? "/projectstarter/project-card/token-distribution-icon-dark.svg"
                            : "/projectstarter/project-card/token-distribution-icon.svg"
                        }
                        className=" smallLogo"
                        alt=""
                      />
                    </li>
                    <div className="list-inline-item small-cards-ul-li2 small-cards-ul-li2-2">
                      <p className=" text-truncate w-75">
                        Token Distribution
                      </p>
                      <p>20</p>
                    </div>
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
        </Link>
      </div>
  );

  //   return (
  //     <>
  //       <div className={dark}>
  //         <section className="main-coming main-open">
  //           <div className="container">
  //             <div className="row">
  //               <div className="col-sm-12">
  //                 <div className="inner-content">
  //                   <h2>
  //                     <strong>Projects Coming Soon</strong>{" "}
  //                   </h2>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="row ptb">
  //               {/* {commingData} */}

  //               {/* <div className="col-lg-6">
  //                                 <div className={dark}>
  //                                     <div className="inner-card">
  //                                         <div className="row">
  //                                             <div className="col-9 text-left p-0">
  //                                                 <ul className="list-inline d-flex align-items-center">
  //                                                     <li className="list-inline-item ">
  //                                                         <div className="inner-img">
  //                                                             <img src="\projectstarter\project-card\project-logo.png" className="img-fluid" alt="" />
  //                                                         </div>
  //                                                     </li>
  //                                                     <li className="list-inline-item">
  //                                                         <div className="inner-img">
  //                                                             <h5>Yay Games</h5>
  //                                                             <p className="grey"><small>1 YAY = 12.23131 PSR</small></p>
  //                                                         </div>
  //                                                     </li>
  //                                                 </ul>
  //                                             </div>
  //                                             <div className="col-3 text-right p-0">
  //                                                 <div className="inner-btn">
  //                                                     <button className="project-closed">Open</button>
  //                                                 </div>
  //                                             </div>
  //                                         </div>
  //                                         <div className="progress-div">
  //                                             <div className="row mb-1 mt-3">
  //                                                 <div className="col-11 p-0">
  //                                                     <h5 className="grey">Pool Progress</h5>
  //                                                 </div>
  //                                                 <div className="col-1 p-0">
  //                                                     <div className="inner-btn">
  //                                                         <p className="grey">50%</p>
  //                                                     </div>
  //                                                 </div>
  //                                             </div>
  //                                             <div className="row">
  //                                                 <div className="col-sm-12 p-0">
  //                                                     <div className="progress">
  //                                                         <div className="progress-bar" role="progressbar" style={{ width: "30%" }} aria-valuenow="70"
  //                                                             aria-valuemin="20" aria-valuemax="100">

  //                                                         </div>
  //                                                     </div>
  //                                                     <h5 className="common mt-1">BUSD 500,000/$1,000,000</h5>
  //                                                 </div>
  //                                             </div>
  //                                         </div>
  //                                         <div className="brdr"></div>
  //                                         <div className="ptb10 inner-small-cards">
  //                                             <div className="row">
  //                                                 <div className="col-sm-4 col-6 p-0">
  //                                                     <ul className='list-inline small-cards-ul d-flex align-items-center'>
  //                                                         <li className='list-inline-item'>
  //                                                             <img src={dark === 'dark' ? "/projectstarter/project-card/perticipants-icon-dark.svg" : "/projectstarter/project-card/perticipants-icon.svg"} className='img-fluid smallLogo' alt="" />
  //                                                         </li>
  //                                                         <div className="list-inline-item small-cards-ul-li2">
  //                                                             <p>Participants</p>
  //                                                             <p>20,250</p>
  //                                                         </div>
  //                                                     </ul>
  //                                                 </div>
  //                                                 <div className="col-sm-4 col-6 p-0">
  //                                                     <ul className='list-inline small-cards-ul d-flex align-items-center'>
  //                                                         <li className='list-inline-item'>
  //                                                             <img src={dark === 'dark' ? "/projectstarter/project-card/start-date-icon-dark.svg" : "/projectstarter/project-card/start-date-icon.svg"} className='img-fluid smallLogo' alt="" />
  //                                                         </li>
  //                                                         <div className="list-inline-item small-cards-ul-li2">
  //                                                             <p>Start-date</p>
  //                                                             <p>17-Dec-2021</p>
  //                                                         </div>
  //                                                     </ul>
  //                                                 </div>
  //                                                 <div className="col-sm-4 col-6 p-0">
  //                                                     <ul className='list-inline small-cards-ul d-flex align-items-center'>
  //                                                         <li className='list-inline-item'>
  //                                                             <img src={dark === 'dark' ? "/projectstarter/project-card/token-price-icon-dark.svg" : "/projectstarter/project-card/token-price-icon.svg"} className='img-fluid smallLogo' alt="" />
  //                                                         </li>
  //                                                         <div className="list-inline-item small-cards-ul-li2">
  //                                                             <p>Token Price</p>
  //                                                             <p>$0.30</p>
  //                                                         </div>
  //                                                     </ul>
  //                                                 </div>

  //                                                 <div className="col-sm-4  mt-sm-4 mt-0 col-6 p-0">
  //                                                     <div className='bgb d-md-block d-none'></div>
  //                                                     <ul className='list-inline small-cards-ul d-flex align-items-center'>
  //                                                         <li className='list-inline-item'>
  //                                                             <img src={dark === 'dark' ? "/projectstarter/project-card/access-icon-dark.svg" : "/projectstarter/project-card/access-icon.svg"} className='img-fluid smallLogo' alt="" />
  //                                                         </li>
  //                                                         <div className="list-inline-item small-cards-ul-li2 small-cards-ul-li2-2">
  //                                                             <p>Access</p>
  //                                                             <p>Private</p>
  //                                                         </div>
  //                                                     </ul>
  //                                                 </div>
  //                                                 <div className="col-sm-4 mt-sm-4 mt-0 col-6 p-0">
  //                                                     <div className='bgb d-md-block d-none'></div>
  //                                                     <ul className='list-inline small-cards-ul d-flex align-items-center'>
  //                                                         <li className='list-inline-item'>
  //                                                             <img src={dark === 'dark' ? "/projectstarter/project-card/token-sold-icon-dark.svg" : "/projectstarter/project-card/token-sold-icon.svg"} className='img-fluid smallLogo' alt="" />
  //                                                         </li>
  //                                                         <div className="list-inline-item small-cards-ul-li2 small-cards-ul-li2-2">
  //                                                             <p>Token Sold</p>
  //                                                             <p>1M</p>
  //                                                         </div>
  //                                                     </ul>
  //                                                 </div>
  //                                                 <div className="col-sm-4  mt-sm-4 mt-0 col-6 p-0">
  //                                                     <div className='bgb d-md-block d-none'></div>
  //                                                     <ul className='list-inline small-cards-ul d-flex align-items-center'>
  //                                                         <li className='list-inline-item'>
  //                                                             <img src={dark === 'dark' ? "/projectstarter/project-card/token-distribution-icon-dark.svg" : "/projectstarter/project-card/token-distribution-icon.svg"} className=' smallLogo' alt="" />
  //                                                         </li>
  //                                                         <div className="list-inline-item small-cards-ul-li2 small-cards-ul-li2-2">
  //                                                             <p className=' text-truncate w-75'>Token Distribution</p>
  //                                                             <p>20</p>
  //                                                         </div>
  //                                                     </ul>
  //                                                 </div>
  //                                             </div>
  //                                         </div>
  //                                     </div>
  //                                 </div>
  //                             </div> */}
  //             </div>
  //           </div>
  //         </section>
  //       </div>
  //     </>
  //   );
};

export default ClosedNow;
