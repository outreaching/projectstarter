import React, { useEffect, useState } from "react";
import { Backdrop } from "@material-ui/core";
import "./banner.scss";
// ../header/Navbar
import Navbar from "../../landing/header/Navbar";
import { ToastContainer, toast } from "react-toastify";
import {
  UserPackages,
  GetParticipated,
  GetPartApprove,
  GetClaim,
} from "../../../hooks/dataFetcher";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";

const Banner = () => {
  const dark = useSelector((state) => state.UserReducer.theme);
  const [packag, setPackage] = useState(null);
  const [tier, setTier] = useState(null);
  const [rend, setRend] = useState(false);
  const [loader, setLoader] = useState(false);
  const [participate, setParticipate] = useState(0);
  const { account } = useWeb3React();
  const { CheckPack } = UserPackages();
  const { userParticipating } = GetParticipated();
  const { userPartApprove } = GetPartApprove();
  const { userClaim } = GetClaim();
  const [chAppr, setChAppr] = useState(false);

  useEffect(() => {
    getPackages();
  }, [account]);

  const getPackages = async () => {
    if (account) {
      let res = await CheckPack(account);
      await setPackage(res);
      await setLoader(false);
    }
  };

  const selectPack = (val) => {
    let dumVal = packag;
    if (val === 1) {
      if (packag?.package1 === 0) {
        dumVal.package1 = 1;
        setTier(3);
        setParticipate(10);
        if (dumVal.package2 === 1) {
          dumVal.package2 = 0;
        } else if (dumVal.package3 === 1) {
          dumVal.package3 = 0;
        }
      } else {
        setParticipate(0);
        dumVal.package1 = 0;
        setTier(0);
      }
    } else if (val === 2) {
      if (packag?.package2 === 0) {
        dumVal.package2 = 1;
        setTier(2);
        setParticipate(30);
        if (dumVal.package1 === 1) {
          dumVal.package1 = 0;
        } else if (dumVal.package3 === 1) {
          dumVal.package3 = 0;
        }
      } else {
        dumVal.package2 = 0;
        setTier(0);
        setParticipate(0);
      }
    } else if (val === 3) {
      if (packag?.package3 === 0) {
        setParticipate(50);
        setTier(1);
        dumVal.package3 = 1;
        if (dumVal.package2 === 1) {
          dumVal.package2 = 0;
        } else if (dumVal.package1 === 1) {
          dumVal.package1 = 0;
        }
      } else {
        dumVal.package3 = 0;
        setTier(0);
        setParticipate(0);
      }
    }
    setPackage(dumVal);
    setRend(!rend);
  };

  const getParticipated = async () => {
    if (participate > 0 && account) {
      setLoader(true);
      if (chAppr === true) {
        letsParticipate();
      }else {
        const res0 = await userPartApprove(account, participate, tier);
        await setChAppr(true);
        await setLoader(false);
      }
    }
  };

  const letsParticipate = async() => {
    const res = await userParticipating(account, participate, tier);
    await getPackages();
    await setLoader(false);
  };

  const getClaimed = async () => {
    console.log("called");
    const res = await userClaim(account);
  };

  return (
    <>
      <Backdrop className="loader" sx={{ color: "#fff" }} open={loader}>
        <img
          src="/projectstarter/header/loader.svg"
          alt=""
          className="img-fluid shdshhgdss"
        />
      </Backdrop>
      <div className={dark}>
        <section className="main-banner " id="banner">
          <Navbar />
          <div className="">
            <div className="row ptb">
              <div className="col-sm-11 m-auto">
                <div className="inner-content text-center">
                  <div className="inner-img ">
                    {/* <h6 className="common mb-3">Welcome to <b>Projectstarter</b> </h6> */}
                    {/* <h1 className=""> Launchpad ipsam quia dolor voluptatem quia<span className="common ">voluptas sit aspernatur aut odit </span></h1> */}
                    {/* <p className="ptb20 grey">At vero eos et accusamus et iusto odio dignissimos ducimus qui blandis praesentium voluptatum deleniti <br /> atque corrupti quos dolores et quas molestias excepturi sint occaecati.</p> */}
                    {/* <ul className="list-inline d-sm-block mt-2 d-none">
                                            <li className="list-inline-item mt-4">
                                                <Link to=''><a href="#" target="_blank" className="btn-common2">Join us Telegram</a></Link>
                                            </li>
                                            <li className="list-inline-item mt-4">
                                                <Link to=''> <a href="#" target="_blank" className="btn-common2">Follow our Twitter</a></Link>
                                            </li>
                                            <li className="list-inline-item mt-4">
                                                <Link to=''> <a href="#" target="_blank" className="btn-common2">Github <img src="/projectstarter/banner/github.svg" className="img-fluid ml-2 mb-1 pancakeBtn " alt="" /></a></Link>
                                            </li>
                                        </ul>
                                        <div className='d-flex flex-column d-sm-none d-block'>
                                            <Link to=''> <button href="#" target="_blank" className="btn-common w-100 mt-3"><img src="/projectstarter/banner/pancakeImg.svg" className="img-fluid mr-2 mb-1  pancakeBtn" alt="" /> Buy on PancakeSwap</button></Link>
                                            <Link to='/idoform'><button href="#" target="_blank" className="btn-common w-100 mt-3">Apply for IDO</button></Link>
                                            <Link to='/projects'> <button href="#" target="_blank" className="btn-common w-100 mt-3">View All Projects</button></Link>
                                        </div> */}
                    <div className="w-100">
                      <p className="main-heading">
                        ProjectStarter Seed Round Presale
                      </p>
                      <p className="submain-heading">
                        ProjectStarter Seed Round Presale
                      </p>
                      <div className="card-wraps">
                        <div
                          onClick={() => selectPack(1)}
                          className={
                            "cards bg-white cursor-pointer " +
                            (packag?.package1 > 0
                              ? "card-bord"
                              : "card-bordwhite")
                          }
                        >
                          <div className="header">VC Package 1</div>
                          <div className="heading">
                            <p>
                              10,000<span>BUSD</span>
                            </p>
                          </div>
                          <div className="d-flex pt-3 justify-content-between w-75 m-auto">
                            <div className="toks">
                              <p className="sub">No. of Tokens</p>
                              <p className="titl">15,000,000</p>
                            </div>
                            <div className="toks">
                              <p className="sub">Raise</p>
                              <p className="titl">$750,000</p>
                            </div>
                          </div>
                          <div className="d-flex pt-3 justify-content-between w-75 m-auto">
                            <div className="toks">
                              <p className="sub">Price</p>
                              <p className="titl">$0.05</p>
                            </div>
                            <div className="toks">
                              <p className="sub">Supply%</p>
                              <p className="titl">15.00%</p>
                            </div>
                          </div>
                          <div className="d-flex pt-3 justify-content-between w-75 m-auto">
                            <div className="toks text-left pb-4">
                              <p className="sub">TGE + Vesting</p>
                              <p className="titl">
                                100% vesting for 12 months 5% Released Monthly
                                from 13th month onwards
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          onClick={() => selectPack(2)}
                          className={
                            "cards bg-white cursor-pointer " +
                            (packag?.package2 > 0
                              ? "card-bord"
                              : "card-bordwhite")
                          }
                        >
                          <div className="header">VC Package 2</div>
                          <div className="heading">
                            <p>
                              30,000<span>BUSD</span>
                            </p>
                          </div>
                          <div className="d-flex pt-3 justify-content-between w-75 m-auto">
                            <div className="toks">
                              <p className="sub">No. of Tokens</p>
                              <p className="titl">15,000,000</p>
                            </div>
                            <div className="toks">
                              <p className="sub">Raise</p>
                              <p className="titl">$750,000</p>
                            </div>
                          </div>
                          <div className="d-flex pt-3 justify-content-between w-75 m-auto">
                            <div className="toks">
                              <p className="sub">Price</p>
                              <p className="titl">$0.05</p>
                            </div>
                            <div className="toks">
                              <p className="sub">Supply%</p>
                              <p className="titl">15.00%</p>
                            </div>
                          </div>
                          <div className="d-flex pt-3 justify-content-between w-75 m-auto">
                            <div className="toks text-left pb-4">
                              <p className="sub">TGE + Vesting</p>
                              <p className="titl">
                                100% vesting for 12 months 5% Released Monthly
                                from 13th month onwards
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          onClick={() => selectPack(3)}
                          className={
                            "cards bg-white cursor-pointer " +
                            (packag?.package3 > 0
                              ? "card-bord"
                              : "card-bordwhite")
                          }
                        >
                          <div className="header">VC Package 3</div>
                          <div className="heading">
                            <p>
                              50,000<span>BUSD</span>
                            </p>
                          </div>
                          <div className="d-flex pt-3 justify-content-between w-75 m-auto">
                            <div className="toks">
                              <p className="sub">No. of Tokens</p>
                              <p className="titl">15,000,000</p>
                            </div>
                            <div className="toks">
                              <p className="sub">Raise</p>
                              <p className="titl">$750,000</p>
                            </div>
                          </div>
                          <div className="d-flex pt-3 justify-content-between w-75 m-auto">
                            <div className="toks">
                              <p className="sub">Price</p>
                              <p className="titl">$0.05</p>
                            </div>
                            <div className="toks">
                              <p className="sub">Supply%</p>
                              <p className="titl">15.00%</p>
                            </div>
                          </div>
                          <div className="d-flex pt-3 justify-content-between w-75 m-auto">
                            <div className="toks text-left pb-4">
                              <p className="sub">TGE + Vesting</p>
                              <p className="titl">
                                100% vesting for 12 months 5% Released Monthly
                                from 13th month onwards
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-5 d-flex justify-content-center align-items-center">
                      <button onClick={() => getClaimed()} className="but ml-4">
                        Claim
                      </button>
                      {/* <button className="but">Approve</button> */}
                      <button
                        onClick={() => getParticipated()}
                        className="but ml-4"
                      >
                        {chAppr ? "Participate" : "Approve"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Footer /> */}
          {/* <div className={dark}>
            <section className="main-footer ptb">
              <div className="container">
                <div className="row">
                  <div className="col-sm-3 text-center">
                    <div className="inner-icon">
                      <a className="navbar-brand" href="/">
                        <img
                          src={
                            dark === "dark"
                              ? "/projectstarter-dark/logo-footer.svg"
                              : "/projectstarter/header/logo.svg"
                          }
                          className="img-fluid"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div> */}
        </section>
      </div>
    </>
  );
};

export default Banner;
