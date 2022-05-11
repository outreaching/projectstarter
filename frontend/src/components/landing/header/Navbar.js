import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../utils/ApiURL";
import "./navbar.scss";
import { userTheme, GetStatus } from "../../../redux/action/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import useAuth from "../../../hooks/useAuth";
import { UseTokenBalance } from "../../../hooks/dataFetcher";

const Navbar = () => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { login, logout } = useAuth();
  const [theme, setTheme] = React.useState(null);
  const dark = useSelector((state) => state.UserReducer.theme);
  const call = useSelector((state) => state.UserReducer.status);
  const [status, setStatus] = useState(null);
  const [kycStatus, setKycStatus] = useState(null);
  const balance = UseTokenBalance();

  // console.log("balance", kycStatus);

  useEffect(() => {
    setStatus(call);
  }, [call, account]);

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

  const connectMetaMask = async () => {
    try {
      localStorage.setItem("injected", "injected");
      if (account) {
        logout();
        close();
      } else {
        login("injected");
        close();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const Connect = () => {
    if (account) {
      logout();
      close();
      localStorage.setItem("flag", false);
    } else {
      login("walletconnect");
      close();
      // localStorage.setItem('flag',true)
      // localStorage.setItem('walletconnect',"walletconnect")
    }
  };

  const close = () => {
    window.$("#exampleModalconnect").modal("hide");
  };
  const opeeennn = () => {
    window.$("#exampleModalconnect").modal("show");
  };

  // console.log("account", account)

  const setVersion = () => {
    if (theme === "light") {
      localStorage.setItem("wtTheme", "dark");
      setTheme("dark");
      dispatch(userTheme("dark"));
    } else {
      localStorage.setItem("wtTheme", "light");
      setTheme("light");
      dispatch(userTheme("light"));
    }
  };
  useEffect(() => {
    let themo = localStorage.getItem("wtTheme");
    if (themo === null) {
      localStorage.setItem("wtTheme", "dark");
      setTheme("dark");
      dispatch(userTheme("dark"));
    } else {
      setTheme(themo);
      dispatch(userTheme(themo));
    }
  }, []);

  useEffect(() => {
    if (account) {
      if (status === null) {
        getUserStatus();
      }
    } else {
      setStatus(null);
    }
  }, [account]);

  const getUserStatus = () => {
    dispatch(GetStatus(account));
  };

  return (
    <>
      <div className={dark}>
        <section className="main-navbar">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 m-auto">
                <nav className="navbar ptb20 navbar-expand-xl">
                  <Link to="/">
                    <a className="navbar-brand" href="#">
                      <img
                        src={
                          dark === "dark"
                            ? "/projectstarter-dark/logo-white.svg"
                            : "/projectstarter/logo-blue.svg"
                        }
                        className="img-fluid mainLogos"
                        alt=""
                      />
                    </a>
                  </Link>
                  <button
                    className="navbar-toggler "
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <div class="style-bar"></div>
                    <div class="style-bar"></div>
                    <div class="style-bar"></div>
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav navbar-nav1 navTabsWidth mr-auto ">
                      {/* <li className="nav-item">
                        <Link className="nav-link active btn-white" to="/">
                          Home
                        </Link>
                      </li> */}
                      <li className="nav-item">
                        <Link className="nav-link btn-white bg_trans" to="/projects">
                          Projects
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/" className="nav-link btn-white bg_trans">
                          Staking
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/" className="nav-link btn-white bg_trans">
                        NFTs
                        <div className="badge">Coming Soon</div>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/" className="nav-link btn-white bg_trans">
                        NFT Marketplace
                        <div className="badge">Coming Soon</div>
                        </Link>
                      </li>
                      {/* {account && (
                        <a
                          href={
                            "https://project-starter-kyc.netlify.app/?account=" +
                            account?.toString()
                          }
                          className="nav-link btn-green bg-info text-light"
                        >
                          <li className="nav-item">
                            <i class="fa-solid pr-1 fa-x"></i> KYC
                          </li>
                        </a>
                      )} */}

                      {/* // old kyc code */}
                      {account && (
                        <li className="nav-item">
                          {kycStatus === null && (
                            <a
                              href={
                                "https://project-starter-kyc.netlify.app/?account=" +
                                account?.toString()
                              }
                              className="nav-link btn-green bg-info text-light"
                            >
                              <li className="nav-item">
                                <i class="fa-solid pr-1 fa-x"></i> KYC
                              </li>
                            </a>
                          )}
                          {kycStatus === "approved" && (
                            <div className="nav-link btn-green text-light">
                              <i class="fas pr-1 fa-check"></i> KYC
                            </div>
                          )}
                          {kycStatus === "created" && (
                            <div
                              style={{ borderRadius: "25px" }}
                              className="nav-link btn-warning text-light"
                            >
                              <i class="fas pr-1 fa-question"></i> Pending
                            </div>
                          )}
                          {kycStatus === "rejected" && (
                            <a
                              href={
                                "https://project-starter-kyc.netlify.app/?account=" +
                                account?.toString()
                              }
                              className="nav-link btn-green bg-info text-light"
                            >
                              <li className="nav-item">
                                <i class="fa-solid pr-1 fa-x"></i> KYC
                              </li>
                            </a>
                          )}
                        </li>
                      )}
                    </ul>
                    <form className="form-inline mt-0 my-lg-0 my_class_style_form">
                      {/* <button type="button" onClick={setVersion} className='imgButton mb-md-0 mb-2'>{dark === 'dark' ? <img src="projectstarter/moon-icon.svg" className='img-fluid darklightImg' alt="" /> : <img src="projectstarter/sun-icon.svg" className='img-fluid darklightImg' alt="" />}</button>
                                    <button type='button' data-toggle="modal" data-target="#exampleModalconnect" className="nav-link btn-white">
                                        Connect Wallet
                                    </button> */}
                      <button
                        type="button"
                        onClick={setVersion}
                        className="imgButton mb-md-0 mb-2"
                      >
                        {dark === "dark" ? (
                          <img
                            src="projectstarter/moon-icon.svg"
                            className="img-fluid darklightImg"
                            alt=""
                          />
                        ) : (
                          <img
                            src="projectstarter/sun-icon.svg"
                            className="img-fluid darklightImg"
                            alt=""
                          />
                        )}
                      </button>
                      <button className="ahshdhbas shadow">
                        <Link className=" btn-white" to="/admin">
                          Your Projects
                        </Link>
                      </button>
                      {account ? (
                        <button
                          className="nav-link btn-white1 btn-common-clear"
                          onClick={connectMetaMask}
                        >
                          {/* Disconnect */}
                          {account.slice(0, 5) +
                            "............" +
                            account.substr(account.length - 3)}
                        </button>
                      ) : (
                        <button
                          type="button"
                          data-toggle="modal"
                          onClick={opeeennn}
                          className="nav-link btn-white my_class_style"
                        >
                          Connect
                        </button>
                      )}
                      {account && (
                        <button className="nav-link btn-white px-2">
                          {balance
                            ? parseInt(balance)?.toFixed(2)
                            : "0.00"}{" "}
                          PSR
                        </button>
                      )}
                    </form>
                    {/* {account ?  <button  className="nav-link btn-white1" onClick={connectMetaMask}>Disconnect Wallet</button> 
                                   :   <button className="nav-link btn-white" onClick={connectMetaMask}> Connect Wallet </button> } */}
                    {/* second single btn nav */}
                    <button className="ml-md-auto  d-none btn-common btn-common-clear ">
                      Logout
                    </button>
                    {/* second single btn nav */}
                    {/* kyc nav */}
                    <div className="d-none">
                      <ul className="navbar-nav mr-auto ml-auto d-flex align-items-center d-none ">
                        <li className="nav-item">
                          <Link className="nav-link " to="/">
                            <button className="btn-white">
                              Go to Launchpad
                            </button>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <button className="btn-common">Connect Wallet</button>
                        </li>
                        <li className="nav-item">
                          <Link to="/staking" className="nav-link">
                            <button className="btn-common btn-common-clear">
                              Logout
                            </button>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    {/* kyc nav */}
                  </div>
                </nav>
              </div>
            </div>
          </div>
          {/* modal */}
          <div
            className="modal fade"
            id="exampleModalconnect"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modalHeader">
                  <div className="form-img">
                    <p>Connect Wallet</p>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span className="modalCloser" aria-hidden="true">
                      &times;
                    </span>
                  </button>
                </div>
                <div className="modal-body text-left">
                  <div className="adminCard ">
                    <div className="adminCard-inner-inputs">
                      <div className="form-group ">
                        <button
                          className="btn-common w-100"
                          onClick={connectMetaMask}
                        >
                          <img
                            src="/projectstarter/socials/metamask-logo.svg"
                            alt=""
                          />
                          <p>Metamask</p>
                        </button>
                      </div>
                      <div className="form-group ">
                        <button className="btn-common w-100" onClick={Connect}>
                          <img
                            src="/projectstarter/socials/walletconnect-logo-1.svg"
                            alt=""
                            className="imgFilto"
                          />
                          <p>Wallet Connect</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Navbar;
