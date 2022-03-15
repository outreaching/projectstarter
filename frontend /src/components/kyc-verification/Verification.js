import React, { useEffect, useState } from "react";
// import Page from "./index.html"
import FooterSecondary from "../footerSecondary/FooterSecondary";
import FormData from "form-data";
import Navbar from "../landing/header/Navbar";
import Step1 from "./components/steppers/step1";
import Step2 from "./components/steppers/step2";
import Step3 from "./components/steppers/step3";
import Step4 from "./components/steppers/step4";
import Step5 from "./components/steppers/step5";
import Step7 from "./components/steppers/step7";
import Step8 from "./components/steppers/step8";
import Step9 from "./components/steppers/step9";
import Step10 from "./components/steppers/step10";
import Profile from "./components/profile";
import VerifyWallet from "./components/verifyWallet";
import { useWeb3React } from "@web3-react/core";
import Loader from "./components/loader";
import axios from "axios";
import { API_URL } from "../../utils/ApiURL";
import Environment from "../../utils/Environment";
import { useHistory } from "react-router";
import "./verification.scss";
import { useSelector } from "react-redux";
import Step from "./components/steppers/step1";
import { GetStatus } from "../../redux/action/index";
import { useDispatch } from "react-redux";
var loadjs = require("loadjs");

function Verification() {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState(null);
  const [passbackside, setPassBackSide] = useState();
  const [uploadImage, updateuploadImage] = useState("");
  const [uploadImage1, updateuploadImage1] = useState("");
  const [step, setStep] = useState("step1");
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [loader, setLoader] = useState(false);
  const [resend, setResend] = useState(false);
  const [rend, setRend] = useState(false);
  const [documentName, setDocumentName] = useState("");
  const { account } = useWeb3React();
  const dark = useSelector((state) => state.UserReducer.theme);
  const call = useSelector((state) => state.UserReducer.status);
  const [status, setStatus] = useState(null);
  const history = useHistory();

  // old kyc code
  // useEffect(() => {
  //   if (call === "accepted") {
  //     history.push("/");
  //   } else {
  //     if (call === "pending" || call === "rejected") {
  //       setTab(2);
  //       setStep("step");
  //     }
  //     setStatus(call);
  //   }
  // }, [call, account]);

  async function catchImage(e) {
    try {
      const file = e.target.files[0];
      setPhoto(file);
      updateuploadImage(URL.createObjectURL(e.target.files[0]));
    } catch (e) {
      console.log(e);
    }
  }
  async function catchBackside(e) {
    try {
      const file = e.target.files[0];
      setPassBackSide(file);
      updateuploadImage1(URL.createObjectURL(e.target.files[0]));
      // console.log(file, "file")
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (account) {
      getUserStatus();
    }
  }, [account]);

  const getUserStatus = () => {
    dispatch(GetStatus(account));
  };

  const getKyc = () => {
    if (status === "rejected") {
      setStatus(null);
      setTab(0);
      setStep("step1");
      setResend(true);
    } else if (resend) {
      // update call
      setLoader(true);
      var data = new FormData();
      data.append("name", username);
      data.append("walletAddress", account);
      data.append("email", email);
      data.append("contractAddressDeployed", Environment.contractAddress);
      data.append("documentName", documentName);
      data.append("kycImageFrontSide", photo);
      data.append("kycImageBackSide", passbackside);
      data.append("country", country.label);
      data.append("statusOfApplication", "pending");

      axios
        .post(`${API_URL}/v1/Kyc/editKycByWalletAddress`, data)
        .then((res) => {
          setLoader(false);
          dispatch(GetStatus(account));
          setStatus("pending");
          setStep("step");
        })
        .catch(function (error) {
          console.log(error);
          setLoader(false);
        });
    } else {
      // create call
      setLoader(true);
      var data = new FormData();
      data.append("name", username);
      data.append("walletAddress", account);
      data.append("email", email);
      data.append("contractAddressDeployed", Environment.contractAddress);
      data.append("documentName", documentName);
      data.append("kycImageFrontSide", photo);
      data.append("kycImageBackSide", passbackside);
      data.append("country", country.label);
      axios
        .post(`${API_URL}/v1/Kyc/addKyc`, data)
        .then((res) => {
          setLoader(false);
          dispatch(GetStatus(account));
          setStatus("pending");
          setStep("step");
        })
        .catch(function (error) {
          console.log(error);
          setLoader(false);
        });
    }
  };

  useEffect(() => {
    if (account) {
      loadBlockpassWidget(account);
    }
  }, [account]);

  const loadBlockpassWidget = (val) => {
    const blockpass = new window.BlockpassKYCConnect(
      "projectstarter", // service client_id from the admin console
      {
        refId: val, // assign the local user_id of the connected user
      }
    );
    loadjs(
      "https://cdn.blockpass.org/widget/scripts/release/3.0.2/blockpass-kyc-connect.prod.js"
    );
    blockpass.startKYCConnect();

    blockpass.on("KYCConnectSuccess", () => {
      //add code that will trigger when data have been sent.
    });
    setRend(!rend)
  };

  const content = `<html>
      <head>
        <script src= 'https://cdn.blockpass.org/widget/scripts/release/3.0.2/blockpass-kyc-connect.prod.js'></script>
      </head>
      <body class="c16">
        <button id="blockpass-kyc-connect">Verify with Blockpass</button>
        <script>
          const blockpass = new window.BlockpassKYCConnect(
            'projectstarter', // service client_id from the admin console
            {
              refId: 1234, // assign the local user_id of the connected user
            }
          )
          blockpass.startKYCConnect()
          
          blockpass.on('KYCConnectSuccess', () => {
            //add code that will trigger when data have been sent. ex:
            //alert('Success!')
          })
        </script> 
      </body>
    </html>`;

  return (
    <>
      <div className={dark}>
        <section className="verification ">
          <Navbar />
          <div className="container">
            <section className="verification-top ptb">
              <div className="row">
                <div className="p-0 col-12">
                  <h3>User Profile</h3>
                </div>
              </div>
              <div className="row d-flex align-items-center">
                <div className="col-12 p-0">
                  <div className="roadmap-section-div">
                    <div className="roadimg1 text-center">
                      {tab === 0 ? (
                        <img
                          src={
                            dark === "dark"
                              ? "projectstarter/kyc/rocket-dark.svg"
                              : "projectstarter/kyc/rocket.svg"
                          }
                          alt=""
                          className="  kyc-top-logo"
                        />
                      ) : (
                        <img
                          src={
                            dark === "dark"
                              ? "projectstarter/kyc/correct-dark.svg"
                              : "projectstarter/kyc/correct.svg"
                          }
                          alt=""
                          className="  kyc-top-logo"
                        />
                      )}
                      <p className="">Registration</p>
                      {/* mt-3 ml-5 */}
                    </div>
                    <div className="roadimg1 text-center">
                      {tab <= 1 ? (
                        <img
                          src={
                            dark === "dark"
                              ? "projectstarter/kyc/rocket-dark.svg"
                              : "projectstarter/kyc/rocket.svg"
                          }
                          alt=""
                          className=" kyc-top-logo"
                        />
                      ) : (
                        <img
                          src={
                            dark === "dark"
                              ? "projectstarter/kyc/correct-dark.svg"
                              : "projectstarter/kyc/correct.svg"
                          }
                          alt=""
                          className=" kyc-top-logo"
                        />
                      )}
                      <p>Verify C-Chain Wallet Ownership</p>
                    </div>
                    <div className="roadimg1 text-center">
                      <img
                        src={
                          dark === "dark"
                            ? "projectstarter/kyc/person-dark.svg"
                            : "projectstarter/kyc/person.svg"
                        }
                        alt=""
                        className=" kyc-top-logo"
                      />
                      <p>KYC Authentication </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="verification-inner ptb">
              <div className="d-flex justify-content-center">
                {account ? (
                  <a href={"https://eager-booth-24c845.netlify.app/?account="+account.toString()}>
                    <button
                      id="blockpass-kyc-connect"
                      className="btn btn-common"
                    >
                      Start KYC
                    </button>
                  </a>
                ) : (
                  <button className="btn btn-common">Start KYC</button>
                )}
              </div>
              {/* old kyc code */}
              <div style={{ display: "none" }} className="row">
                <div className="col-12 p-0">
                  <ul class="nav nav-pills" id="pills-tab" role="tablist">
                    <li class="nav-item">
                      <a
                        class={"nav-link " + (tab === 0 ? "active" : "")}
                        // id="pills-home-tab"
                        // data-toggle="pill"
                        // href="#pills-home"
                        // role="tab"
                        // aria-controls="pills-home"
                        // aria-selected="true"
                      >
                        My Profile
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class={"nav-link " + (tab === 1 ? "active" : "")}
                        // id="pills-profile-tab"
                        // data-toggle="pill"
                        // href="#pills-profile"
                        // role="tab"
                        // aria-controls="pills-profile"
                        // aria-selected="false"
                      >
                        Verify Wallet
                      </a>
                    </li>
                    <li class="nav-item active">
                      <a
                        class={"nav-link " + (tab === 2 ? "active" : "")}
                        // id="pills-contact-tab"
                        // data-toggle="pill"
                        // href="#pills-contact"
                        // role="tab"
                        // aria-controls="pills-contact"
                        // aria-selected="false"
                      >
                        {/* <button className="nav-link btn shadow-none text-dgray"> */}
                        KYC Status
                        {/* </button> */}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* old kyc code */}
              <div
                style={{ display: "none" }}
                class="tab-content"
                id="pills-tabContent"
              >
                {tab === 0 && (
                  <div
                    class="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    {status === null ? (
                      <Profile
                        status={status}
                        email={email}
                        setEmail={setEmail}
                        username={username}
                        setUsername={setUsername}
                        tab={tab}
                        setTab={setTab}
                      />
                    ) : (
                      <div></div>
                    )}
                  </div>
                )}
                {tab === 1 && (
                  <div
                  // class="tab-pane fade"
                  // id="pills-profile"
                  // role="tabpanel"
                  // aria-labelledby="pills-profile-tab"
                  >
                    <VerifyWallet setTab={setTab} dark={dark} />
                  </div>
                )}
                {tab === 2 && (
                  <div
                  // class="tab-pane fade"
                  // id="pills-contact"
                  // role="tabpanel"
                  // aria-labelledby="pills-contact-tab"
                  >
                    <div className="row">
                      <div className="col-12 p-0">
                        {/* before connecting wallet */}
                        <div className="Myprofile d-none">
                          <div className="form-group  text-center">
                            <img
                              src={
                                dark === "dark"
                                  ? "projectstarter/kyc/kycVerify-dark.svg"
                                  : "projectstarter/kyc/kycVerify.svg"
                              }
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                          <div className="form-group text-center">
                            <h3>Individual KYC Verification</h3>
                          </div>
                          <div className="form-group text-center">
                            <p className="kycVeriP">
                              Each account has 1 KYC credit. If your
                              verification fails, please contact <br /> an admin
                              for more information before submitting again.
                            </p>
                          </div>
                          <div className="form-group text-center">
                            <button className="btn-common mt-4">
                              Connect Wallet
                            </button>
                          </div>
                        </div>
                        {/* After connecting walltet */}
                        {step === "step1" && (
                          <Step1 setStep={setStep} dark={dark} />
                        )}
                        {/* After connecting wallet */}
                        {step === "step2" && (
                          <Step2 setStep={setStep} dark={dark} />
                        )}
                        {/* Choose the Document type you would like to use */}
                        {step === "step3" && (
                          <Step3
                            setDocumentName={setDocumentName}
                            setStep={setStep}
                            dark={dark}
                          />
                        )}
                        {/* Choose the Document type you would like to use */}
                        {step === "step4" && (
                          <Step4
                            setCountry={setCountry}
                            country={country}
                            setStep={setStep}
                            dark={dark}
                          />
                        )}
                        {/* Choose your National ID issuing country/region */}
                        {step === "step5" && (
                          <Step5 dark={dark} setStep={setStep} />
                        )}
                        {/* Show the front side of your Pakistan National ID */}
                        {/* <Step6 dark={dark} /> */}
                        {/* Show the front side of your Pakistan National ID */}
                        {step === "step7" && (
                          <Step7
                            updateuploadImage={updateuploadImage}
                            setPhoto={setPhoto}
                            photo={photo}
                            dark={dark}
                            setStep={setStep}
                            uploadImage={uploadImage}
                            catchImage={catchImage}
                          />
                        )}
                        {/* passport backside Image */}
                        {step === "step8" && (
                          <Step8
                            setStep={setStep}
                            passbackside={passbackside}
                            dark={dark}
                            setStep={setStep}
                            uploadImage={uploadImage}
                            catchBackside={catchBackside}
                            uploadImage1={uploadImage1}
                          />
                        )}
                        {/* confirm Image */}
                        {step === "step9" && (
                          <Step9
                            dark={dark}
                            loader={loader}
                            setStep={setStep}
                            uploadImage1={uploadImage1}
                            getKyc={getKyc}
                          />
                        )}
                        {status === "rejected" || status === "pending" ? (
                          <Step10
                            dark={dark}
                            setStatus={setStatus}
                            loader={loader}
                            setStep={setStep}
                            status={status}
                            uploadImage1={uploadImage1}
                            getKyc={getKyc}
                          />
                        ) : (
                          <div></div>
                        )}{" "}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </section>
        <FooterSecondary />
      </div>
    </>
  );
}

export default Verification;
