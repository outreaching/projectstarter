import React, { useState, useEffect } from "react";
import Faqs from "../landing/faqs/Faqs";
import Footer from "../landing/footer/Footer";
import Navbar from "../landing/header/Navbar";
import useWeb3 from "../../hooks/useWeb3";
import { useCallback } from "react";
import { toast } from "react-toastify";
// import { TokenContract, getContractStake } from "../../utils/contractHelpers";
import { useWeb3React } from "@web3-react/core";
import "./staking.scss";
// import { useHistory } from 'react-router-dom';
import { Backdrop } from "@material-ui/core";
import ClaimWithdrawal from "../../hooks/claimStaking";
import { TotalSupply, GetTotalStakersha } from "../../hooks/tierInfoFetchers";
import {
    UseTokenBalance,
    CheckAllowance,
    useStake,
    useUnStake,
    useApprove,
    StakedAmount,
    UnStakedAmount,
    StakedAmountReward
} from "../../hooks/dataFetcher";
// import useEthBalance from "../../utils/WalletBalance";
// import { getBalanceNumber } from "../../utils/formatBalance";
import { useSelector } from "react-redux";
function Staking() {
    const web3 = useWeb3()
    const { account } = useWeb3React();
    const dark = useSelector((state) => state.UserReducer.theme);
    const [opens, setOpens] = useState(false);
    const balance = UseTokenBalance();
    const totalsupply = TotalSupply()
    const totalstakers = GetTotalStakersha()
    const totalStaked = StakedAmount();
    const totalUnStaked = UnStakedAmount()
    const [withdrawIndex, setWithdrawIndex] = useState(0);
    const { Withdraw } = ClaimWithdrawal();
    const [txstatus, setTxstatus] = useState(false);
    const [stackbalance, setstackbalance] = useState("");
    // console.log("stack ",stackbalance)
    const [unstackbalance, setunstackbalance] = useState("");
    console.log("unstaked balnace", unstackbalance)
    // console.log("unstacked balance",unstackbalance)
    const [checkbox1, setCheckbox1] = useState(false);
    const { ApproveTokens } = useApprove();
    const { Stake } = useStake(stackbalance);
    const { UnStakeToken } = useUnStake(unstackbalance);
    // const { UnStakeUsdcToken } = useUnStake(input12)
    const [index, setindex] = useState(0);
    const [indexs, setindexs] = useState(0);
    // const [status, setStatus] = useState(null);
    const reward = StakedAmountReward()
    console.log("reward", reward)
    // const call = useSelector((state) => state.UserReducer.status);
    const [withdrawTerms, setWithdrawTerms] = useState(false);
    const [userbalance, setUserBalance] = useState(0)
    const allowance = CheckAllowance();
    console.log("allowance", allowance)
    let account1 = account
    useEffect(() => {
        // if (account) {
        // try {
        const getBalance = async () => {
            console.log('in effect::::', account1)
            let userbalance1 = await web3.eth.getBalance(account1);
            setUserBalance(parseInt(userbalance1) / 10 ** 18);
        }
        getBalance()
    }, [account1]);

    const maxstake = () => {
        setstackbalance(balance)
    }
    const maxunstake = () => {
        console.log("open unstacked value")
        setunstackbalance(totalStaked)
    }
    const handleChangeCHeckbox = (e) => {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setCheckbox1(value);
    };

    const toastmsgs = () => {
        toast.error('Please Enter Stake Value First', {
            position: "top-right",
            autoClose: 5000,
        });
        //   console.log('error')
    }
    const toastmsgss = () => {
        toast.error('Please Enter UnStake Value First', {
            position: "top-right",
            autoClose: 5000,
        });
        //   console.log('error')
    }


    // console.log("userbalance",balanc)

    const Stake_token = useCallback(async () => {
        try {
            // setShowLoader(true)
            setOpens(true);
            const tx = await Stake();
            if (tx.status) {
                await setTxstatus(tx.status);
                await setstackbalance("");
                setOpens(false);
                window.location.reload();
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
    const histroryredirect = () => {
        window.location.reload();
    }

    const Approve_Fun = async () => {
        if (account) {
            try {
                setOpens(true);
                const tx = await ApproveTokens(account);
                if (tx.status) {
                    setOpens(false);
                }
            } catch (err) {
                setOpens(false);
                console.log("error in approve ::::", err);
                return err;
            }
        } else {
        }
    };

    const UnStake_Token = useCallback(async () => {
        try {
            // setShowLoader(true)
            setOpens(true);
            const tx = await UnStakeToken();
            if (tx.status) {
                await setTxstatus(tx.status);
                await setunstackbalance("");
                setOpens(false);
                window.location.reload();
                // await getUnstakedBalance();
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


    const handleInput = (e) => {
        const input = e.target.value;
        setstackbalance(input);
    };
    // console.log("stack input",stackbalance)
    const handleInputs = (e) => {
        console.log("unstaked amount we have", e.target.value)
        const input = e.target.value;
        setunstackbalance(input);
    };

    const validateWithdraw = () => {
        if (account && totalUnStaked > 0 && withdrawTerms) {
            setWithdrawIndex(1);
        }
    };

    const userWithdrawal = async () => {
        setOpens(true);
        const res = await Withdraw(totalUnStaked);
        if (res?.code === 4001) {
            await setOpens(false);
        } else if (res?.code) {
            await setOpens(false);
        } else {
            await setWithdrawIndex(2);
            // await getStakedbalance();
            await setOpens(false);
        }
        // setWithdrawIndex(2)
    };
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
                <section className="staking-main">
                    <Navbar />
                    <div className="container">
                        <section className="top-linear-card">
                            <div className="row d-flex align-items-center">
                                <div className="col-xl-3 p-0 col-12 my-xl-0 my-3 left-vertical-card">
                                    <ul
                                        class="nav nav-pills mb-3 stake-unstake-tabs"
                                        id="pills-tab"
                                        role="tablist"
                                    >
                                        <li class="nav-item">
                                            <a
                                                class="nav-link active"
                                                id="pills-home-tab"
                                                data-toggle="pill"
                                                href="#pills-home"
                                                role="tab"
                                                aria-controls="pills-home"
                                                aria-selected="true"
                                            >
                                                Stake
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a
                                                class="nav-link"
                                                id="pills-profile-tab"
                                                data-toggle="pill"
                                                href="#pills-profile"
                                                role="tab"
                                                aria-controls="pills-profile"
                                                aria-selected="false"
                                            >
                                                Unstake
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a
                                                class="nav-link"
                                                id="pills-contact-tab"
                                                data-toggle="pill"
                                                href="#pills-contact"
                                                role="tab"
                                                aria-controls="pills-contact"
                                                aria-selected="false"
                                            >
                                                Withdraw
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-xl-9  col-12 my-xl-0 my-3">
                                    <div className="row sideBox">
                                        <div className="col-xl-4  col-12 my-xl-0 my-3">
                                            <ul className="list-inline brdrLeft d-flex align-items-center">
                                                <li className="list-inline-item">
                                                    <img
                                                        src={
                                                            dark === "dark"
                                                                ? "projectstarter/staking/1st-dark.svg"
                                                                : "projectstarter/staking/1st.svg"
                                                        }
                                                        alt=""
                                                    />
                                                </li>
                                                <li className="list-inline-item tl-text">
                                                    <p>Number of Stakers</p>
                                                    <p>{totalstakers}</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-xl-4 col-12 my-xl-0 my-3">
                                            <ul className="list-inline brdrLeft d-flex align-items-center">
                                                <li className="list-inline-item">
                                                    <img
                                                        src={
                                                            dark === "dark"
                                                                ? "projectstarter/staking/2nd-dark.svg"
                                                                : "projectstarter/staking/2nd.svg"
                                                        }
                                                        alt=""
                                                    />
                                                </li>
                                                <li className="list-inline-item tl-text">
                                                    <p>Total PSR Staked</p>
                                                    <p>{totalsupply}</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-xl-4 col-12 my-xl-0 my-3">
                                            <ul className="list-inline d-flex align-items-center">
                                                <li className="list-inline-item">
                                                    <img
                                                        src={
                                                            dark === "dark"
                                                                ? "projectstarter/staking/3rd-dark.svg"
                                                                : "projectstarter/staking/3rd.svg"
                                                        }
                                                        alt=""
                                                    />
                                                </li>
                                                <li className="list-inline-item tl-text">
                                                    <p>APY</p>
                                                    <p>15.00%</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="left-vertical-card ptb">
                            <div className="row">
                                <div className="col-md-8  ">
                                    <div class="tab-content" id="pills-tabContent">
                                        <section
                                            class="tab-pane fade show active stakeDetail ptb20"
                                            id="pills-home"
                                            role="tabpanel"
                                            aria-labelledby="pills-home-tab"
                                        >
                                            <h2 className="text-center">Stake your PSR</h2>
                                            <div className="row">
                                                <div className="col-sm-12 col-11 mx-auto">
                                                    <div class="table-responsive">
                                                        <table class="table">
                                                            <thead
                                                                class="nav nav-pills mb-3"
                                                                id="pills-tab"
                                                                role="tablist"
                                                            >
                                                                <tr className="mx-auto">
                                                                    <td scope="col">
                                                                        <div className="text-center  nav-item">
                                                                            <a
                                                                                class="nav-link"
                                                                                id="pills-checkout-tab"
                                                                                data-toggle="pill"
                                                                                href="#pills-checkout"
                                                                                role="tab"
                                                                                aria-controls="pills-checkout"
                                                                                aria-selected="true"
                                                                            >
                                                                                <img
                                                                                    src={
                                                                                        dark === "dark"
                                                                                            ? "projectstarter/staking/stake/checkpoint-dark.svg"
                                                                                            : "projectstarter/staking/stake/checkpoint.svg"
                                                                                    }
                                                                                    alt=""
                                                                                />
                                                                                <p>Checkpoint</p>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                    <td scope="col">
                                                                        <div className="text-center nav-item">
                                                                            <a
                                                                                class="nav-link"
                                                                                id="pills-atStake-tab"
                                                                                data-toggle="pill"
                                                                                href="#pills-atStake"
                                                                                role="tab"
                                                                                aria-controls="pills-atStake"
                                                                                aria-selected="false"
                                                                            >
                                                                                <img
                                                                                    src={
                                                                                        dark === "dark"
                                                                                            ? "projectstarter/staking/stake/amounttostake-dark.svg"
                                                                                            : "projectstarter/staking/stake/amounttostake.svg"
                                                                                    }
                                                                                    alt=""
                                                                                />
                                                                                <p>Amount to Stake</p>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                    <td scope="col">
                                                                        <div className="text-center nav-item">
                                                                            <a
                                                                                class="nav-link"
                                                                                id="pills-pAuthorization-tab"
                                                                                data-toggle="pill"
                                                                                href="#pills-pAuthorization"
                                                                                role="tab"
                                                                                aria-controls="pills-pAuthorization"
                                                                                aria-selected="false"
                                                                            >
                                                                                <img
                                                                                    src={
                                                                                        dark === "dark"
                                                                                            ? "projectstarter/staking/stake/preauthorization-dark.svg"
                                                                                            : "projectstarter/staking/stake/preauthorization.svg"
                                                                                    }
                                                                                    alt=""
                                                                                />
                                                                                <p>Pre-authorization</p>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                    <td scope="col">
                                                                        <div className="text-center">
                                                                            <a
                                                                                class="nav-link"
                                                                                id="pills-confirm-tab"
                                                                                data-toggle="pill"
                                                                                href="#pills-confirm"
                                                                                role="tab"
                                                                                aria-controls="pills-confirm"
                                                                                aria-selected="false"
                                                                            >
                                                                                <img
                                                                                    src={
                                                                                        dark === "dark"
                                                                                            ? "projectstarter/staking/stake/confirm-dark.svg"
                                                                                            : "projectstarter/staking/stake/confirm.svg"
                                                                                    }
                                                                                    alt=""
                                                                                />
                                                                                <p>Confirm</p>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                    <td scope="col">
                                                                        <div className="text-center">
                                                                            <a
                                                                                class="nav-link"
                                                                                id="pills-Confirmation-tab"
                                                                                data-toggle="pill"
                                                                                href="#pills-Confirmation"
                                                                                role="tab"
                                                                                aria-controls="pills-Confirmation"
                                                                                aria-selected="false"
                                                                            >
                                                                                <img
                                                                                    src={
                                                                                        dark === "dark"
                                                                                            ? "projectstarter/staking/stake/confirmation-dark.svg"
                                                                                            : "projectstarter/staking/stake/confirmation.svg"
                                                                                    }
                                                                                    alt=""
                                                                                />
                                                                                <p>Confirmation</p>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </thead>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="stack all-inner-tabs ">
                                                {index === 0 && (
                                                    <div className="checkpointstack checkouttab">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="text-center topDetailss">
                                                                    <h5>Checkpoints</h5>
                                                                    <p>
                                                                        The following conditions must be meet to
                                                                        proceed
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="checkout-inner-card">
                                                                    <div className="checkoutinnercard-headDiv mb-3">
                                                                        <h5>Connect with MetaMask</h5>
                                                                        <input
                                                                            type="radio"
                                                                            name=""
                                                                            id=""
                                                                            checked={account ? "checked" : false}
                                                                        />
                                                                    </div>
                                                                    <p>
                                                                        If not connected, click the "Connect Wallet"
                                                                        button in the top right corner
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="checkout-inner-card">
                                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                                        <h5>PSR available to deposit</h5>
                                                                        <input
                                                                            type="radio"
                                                                            checked={balance > 0 ? "checked" : false}
                                                                            name=""
                                                                            id=""
                                                                        />
                                                                    </div>
                                                                    <p>
                                                                        Current Balance:{" "}
                                                                        {balance ? balance : "0.00"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="checkout-inner-card">
                                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                                        <h5>BNB available in wallet</h5>
                                                                        <input
                                                                            type="radio"
                                                                            name=""
                                                                            id=""
                                                                            checked={
                                                                                userbalance > 0 ? "checked" : false
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <p>
                                                                        BNB is required to pay transaction fees on
                                                                        the Binance Smart Chain network. BNB
                                                                        Balance:{" "}
                                                                        {userbalance > 0 ? userbalance : "0.00"}BNB
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="checkout-inner-card">
                                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                                        <h5>Eligible to stake</h5>
                                                                        <input
                                                                            type="radio"
                                                                            name=""
                                                                            id=""
                                                                            checked="checked"
                                                                        />
                                                                    </div>
                                                                    <p>
                                                                        You cannot stake if you have an active PSR
                                                                        unstake/withdrawal request
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="checkoutFooter">
                                                                    <input
                                                                        type="checkbox"
                                                                        name=""
                                                                        checked={checkbox1}
                                                                        class="styled-checkbox"
                                                                        id="styled-checkbox-1"
                                                                        onClick={handleChangeCHeckbox}
                                                                    />
                                                                    <p>
                                                                        I have read the{" "}
                                                                        <a href="">Terms and Conditions</a>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <ul className="list-inline text-center mt-3">
                                                                    {account &&
                                                                        balance > 0 &&
                                                                        userbalance > 0 &&
                                                                        checkbox1 == true ? (
                                                                        <li className="list-inline-item">
                                                                            <button
                                                                                type="button"
                                                                                className="btn-common"
                                                                                onClick={() => {
                                                                                    setindex(index + 1);
                                                                                }}
                                                                            >
                                                                                Next
                                                                            </button>
                                                                        </li>
                                                                    ) : (
                                                                        ''
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {index === 1 && (
                                                    <div className="amountstack amountStakeDetail">
                                                        <div className="row">
                                                            <div className="col-sm-8 col-12 mx-auto">
                                                                {allowance <= 0 || allowance < stackbalance ? (
                                                                    <div className="approves-token text-center">
                                                                        <button
                                                                            className="btn-common"
                                                                            onClick={Approve_Fun}
                                                                        >
                                                                            Approved Token
                                                                        </button>
                                                                        <h6>
                                                                            For approving token click on aprroved
                                                                            token button
                                                                        </h6>
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        {" "}
                                                                        {allowance > 0 && (
                                                                            <div className="amount-div-main ptb">
                                                                                <div className="amount-div">
                                                                                    <p>Amount</p>
                                                                                    <div className="inputMax">
                                                                                        <input
                                                                                            placeholder="0"
                                                                                            value={stackbalance}
                                                                                            onChange={handleInput}
                                                                                            type="text"
                                                                                        />
                                                                                        <button className="sjsjdddc" onClick={maxstake}>Max</button>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="balanceOf">
                                                                                    <p>
                                                                                        Balance: <span>{balance}</span>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="col-12">
                                                                <ul className="list-inline text-center mt-3">
                                                                    <li className="list-inline-item">
                                                                        <button
                                                                            type="button"
                                                                            className="btn-common"
                                                                            onClick={() => {
                                                                                setindex(index - 1);
                                                                            }}
                                                                        >
                                                                            Previous
                                                                        </button>
                                                                    </li>
                                                                    {stackbalance > 0 &&
                                                                        stackbalance <= allowance &&
                                                                        stackbalance <= balance ? (
                                                                        <li className="list-inline-item">
                                                                            <button
                                                                                type="button"
                                                                                className="btn-common"
                                                                                onClick={() => {
                                                                                    setindex(index + 1);
                                                                                }}
                                                                            >
                                                                                Next
                                                                            </button>
                                                                        </li>
                                                                    ) : (
                                                                        <li className="list-inline-item">
                                                                            <button
                                                                                type="button"
                                                                                className="btn-common"
                                                                                onClick={
                                                                                    toastmsgs
                                                                                }
                                                                            >
                                                                                Next
                                                                            </button>
                                                                        </li>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {index === 2 && (
                                                    <div className="preauthorizationstack PAuthorizationDetail">
                                                        <div className="row">
                                                            <div className="col-sm-10 col-12 mx-auto">
                                                                <div className="text-center pre-auth-method">
                                                                    <h3>Pre-authorization</h3>
                                                                    <p className="pSpecial">
                                                                        Required transaction 1 of 2
                                                                    </p>
                                                                    <p>
                                                                        In this step, you grant access to the
                                                                        staking smart contract to accept PSR
                                                                    </p>
                                                                    <div class="progress progressBar">
                                                                        <div
                                                                            class="progress-bar w-75"
                                                                            role="progressbar"
                                                                            aria-valuenow="75"
                                                                            aria-valuemin="0"
                                                                            aria-valuemax="100"
                                                                        ></div>
                                                                    </div>
                                                                    <h5>
                                                                        Waiting for the transaction to complete
                                                                    </h5>
                                                                    <p>
                                                                        Please wait for the transaction to confirm
                                                                        before proceeding.
                                                                    </p>
                                                                    <a className="text-truncate" href="">
                                                                        <p>
                                                                            0xCAB13D0ABD22E698848A73DDBABDA8CD8C56288E
                                                                        </p>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <ul className="list-inline text-center mt-3">
                                                                    <li className="list-inline-item">
                                                                        <button
                                                                            type="button"
                                                                            className="btn-common"
                                                                            onClick={() => {
                                                                                setindex(index - 1);
                                                                            }}
                                                                        >
                                                                            Previous
                                                                        </button>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <button
                                                                            type="button"
                                                                            className="btn-common"
                                                                            onClick={() => {
                                                                                setindex(index + 1);
                                                                            }}
                                                                        >
                                                                            Next
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {index === 3 && (
                                                    <div className="transactionstack confirmDetails">
                                                        <div className="row">
                                                            <div className="col-sm-10 col-12 ptb20 mx-auto">
                                                                <div className="text-center confirm-method">
                                                                    <h3>Confirm</h3>
                                                                    <p className="pSpecial">
                                                                        Required transaction 2 of 2
                                                                    </p>
                                                                    <p>
                                                                        In this step, you grant access to the
                                                                        staking smart contract to accept PSR
                                                                    </p>
                                                                </div>
                                                                <div className="btn-commons text-center">
                                                                    <button
                                                                        type="button"
                                                                        className="btn-common"
                                                                        onClick={Stake_token}
                                                                    >
                                                                        Confirm
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            {/* <div className="col-12">
                                                                <ul className="list-inline text-center mt-3">
                                                                    <li className="list-inline-item">
                                                                        <button
                                                                            type="button"
                                                                            className="btn-common"
                                                                            onClick={() => {
                                                                                setindex(index - 1);
                                                                            }}
                                                                        >
                                                                            Previous
                                                                        </button>
                                                                    </li>
                                                                    {txstatus == true ? (
                                                                        <li className="list-inline-item">
                                                                            <button
                                                                                type="button"
                                                                                className="btn-common"
                                                                                onClick={histroryredirect}
                                                                            >
                                                                                Next
                                                                            </button>
                                                                        </li>
                                                                    ) : (
                                                                        <li className="list-inline-item">
                                                                            <button
                                                                                type="button"
                                                                                className="btn-common"
                                                                                onClick={() => {
                                                                                    setindex(index + 1);
                                                                                }}
                                                                                disabled
                                                                            >
                                                                                Next
                                                                            </button>
                                                                        </li>
                                                                    )}
                                                                </ul>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                )}
                                                {index === 4 && (
                                                    <div className="congratulationstack confirmationDetail">
                                                        <div className="row">
                                                            <div className="col-sm-10 col-12 ptb20 mx-auto">
                                                                <div className="text-center confirmation-method">
                                                                    <h3>Success</h3>
                                                                    <p className="">
                                                                        Congratulations! Your tokens are now staked.
                                                                        If desired, you may check Binance Smart
                                                                        Chain to confirm the transaction.
                                                                    </p>
                                                                    <a className="text-truncate" href="">
                                                                        <p>
                                                                            0xCAB13D0ABD22E698848A73DDBABDA8CD8C56288E
                                                                        </p>
                                                                    </a>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div
                                                class="tab-content all-inner-tabs"
                                                id="pills-tabContent"
                                            >

                                            </div>
                                        </section>
                                        <section
                                            class="tab-pane fade stakeDetail ptb20"
                                            id="pills-profile"
                                            role="tabpanel"
                                            aria-labelledby="pills-profile-tab"
                                        >
                                            <h2 className="text-center">Unstake your PSR</h2>
                                            <div className="row">
                                                <div className="col-sm-12 col-11 mx-auto">
                                                    <div class="table-responsive">
                                                        <table class="table">
                                                            <thead
                                                                class="nav nav-pills mb-3"
                                                                id="pills-tab"
                                                                role="tablist"
                                                            >
                                                                <tr className="mx-auto">
                                                                    <td scope="col">
                                                                        <div className="text-center  nav-item">
                                                                            <a
                                                                                class="nav-link active"
                                                                                id="pills-warning-tab"
                                                                                data-toggle="pill"
                                                                                href="#pills-warning"
                                                                                role="tab"
                                                                                aria-controls="pills-warning"
                                                                                aria-selected="true"
                                                                            >
                                                                                <img
                                                                                    src={
                                                                                        dark === "dark"
                                                                                            ? "projectstarter/staking/unstake/warning-dark.svg"
                                                                                            : "projectstarter/staking/unstake/warning.svg"
                                                                                    }
                                                                                    alt=""
                                                                                />
                                                                                <p>Warning</p>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                    <td scope="col">
                                                                        <div className="text-center nav-item">
                                                                            <a
                                                                                class="nav-link"
                                                                                id="pills-unstakecheckout-tab"
                                                                                data-toggle="pill"
                                                                                href="#pills-unstakecheckout"
                                                                                role="tab"
                                                                                aria-controls="pills-unstakecheckout"
                                                                                aria-selected="false"
                                                                            >
                                                                                <img
                                                                                    src={
                                                                                        dark === "dark"
                                                                                            ? "projectstarter/staking/stake/checkpoint-dark.svg"
                                                                                            : "projectstarter/staking/stake/checkpoint.svg"
                                                                                    }
                                                                                    alt=""
                                                                                />
                                                                                <p>Checkpoint</p>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                    <td scope="col">
                                                                        <div className="text-center nav-item">
                                                                            <a
                                                                                class="nav-link"
                                                                                id="pills-unstakeatStake-tab"
                                                                                data-toggle="pill"
                                                                                href="#pills-unstakeatStake"
                                                                                role="tab"
                                                                                aria-controls="pills-unstakeatStake"
                                                                                aria-selected="false"
                                                                            >
                                                                                <img
                                                                                    src={
                                                                                        dark === "dark"
                                                                                            ? "projectstarter/staking/stake/amounttostake-dark.svg"
                                                                                            : "projectstarter/staking/stake/amounttostake.svg"
                                                                                    }
                                                                                    alt=""
                                                                                />
                                                                                <p>Amount to Unstake</p>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                    <td scope="col">
                                                                        <div className="text-center nav-item">
                                                                            <a
                                                                                class="nav-link"
                                                                                id="pills-initialize-tab"
                                                                                data-toggle="pill"
                                                                                href="#pills-initialize"
                                                                                role="tab"
                                                                                aria-controls="pills-initialize"
                                                                                aria-selected="false"
                                                                            >
                                                                                <img
                                                                                    src={
                                                                                        dark === "dark"
                                                                                            ? "projectstarter/staking/unstake/initUnstake-dark.svg"
                                                                                            : "projectstarter/staking/unstake/initUnstake-copy.svg"
                                                                                    }
                                                                                    alt=""
                                                                                />
                                                                                <p>Initialize Unstake</p>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                    <td scope="col">
                                                                        <div className="text-center">
                                                                            <a
                                                                                class="nav-link"
                                                                                id="pills-unstakeConfirmation-tab"
                                                                                data-toggle="pill"
                                                                                href="#pills-unstakeConfirmation"
                                                                                role="tab"
                                                                                aria-controls="pills-unstakeConfirmation"
                                                                                aria-selected="false"
                                                                            >
                                                                                <img
                                                                                    src={
                                                                                        dark === "dark"
                                                                                            ? "projectstarter/staking/stake/confirmation-dark.svg"
                                                                                            : "projectstarter/staking/stake/confirmation.svg"
                                                                                    }
                                                                                    alt=""
                                                                                />
                                                                                <p>Confirmation</p>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </thead>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mainunstack all-inner-tabs">
                                                {indexs === 0 && (
                                                    <div className="warningsss confirmDetails">
                                                        <div className="row">
                                                            <div className="col-sm-10 col-12 ptb20 mx-auto">
                                                                <div className="text-center confirm-method">
                                                                    <img
                                                                        src="projectstarter/project-card/warning.png"
                                                                        className="img-fluid"
                                                                        alt=""
                                                                    />
                                                                    <h3 className="common-color mt-3">Staking Lock Period</h3>
                                                                    <p className="my-4">
                                                                        After Unstaking, you must wait 7 days before
                                                                        you can withdraw your PSR and rewards. The
                                                                        amount of tokens you Unstake will not count
                                                                        towards your tier level for upcoming
                                                                        Projects.
                                                                    </p>
                                                                    <div className="sbvvdsdsds">
                                                                        <div className="SHBASHJBASJBD">
                                                                            <div className="hasbddaasd">
                                                                                <h4>Staked less than 2 weeks</h4>
                                                                            </div>
                                                                            <div className="asjandajsd">
                                                                                <h4>25.00 %</h4>
                                                                            </div>
                                                                        </div>
                                                                        <div className="SHBASHJBASJBD">
                                                                            <div className="hasbddaasd">
                                                                                <h4>Staked less than 4 weeks</h4>
                                                                            </div>
                                                                            <div className="asjandajsd">
                                                                                <h4>15.00 %</h4>
                                                                            </div>
                                                                        </div>

                                                                        <div className="SHBASHJBASJBD">
                                                                            <div className="hasbddaasd">
                                                                                <h4>Staked less than 6 weeks</h4>
                                                                            </div>
                                                                            <div className="asjandajsd">
                                                                                <h4>10.00 %</h4>
                                                                            </div>
                                                                        </div>
                                                                        <div className="SHBASHJBASJBD">
                                                                            <div className="hasbddaasd">
                                                                                <h4>Staked less than 8 weeks</h4>
                                                                            </div>
                                                                            <div className="asjandajsd">
                                                                                <h4>5.00 %</h4>
                                                                            </div>
                                                                        </div>
                                                                        <div className="SHBASHJBASJBD">
                                                                            <div className="hasbddaasd">
                                                                                <h4>Staked 8 weeks or more</h4>
                                                                            </div>
                                                                            <div className="asjandajsd">
                                                                                <h4>0.00 %</h4>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <ul className="list-inline text-center mt-3">
                                                                    <li className="list-inline-item">
                                                                        <button
                                                                            type="button"
                                                                            className="btn-common"
                                                                            onClick={() => {
                                                                                setindexs(indexs + 1);
                                                                            }}
                                                                        >
                                                                            Next
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {indexs === 1 && (
                                                    <div className="checkpoint checkouttab">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="text-center topDetailss">
                                                                    <h5>Checkpoints</h5>
                                                                    <p>
                                                                        The following conditions must be met to
                                                                        proceed
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="checkout-inner-card">
                                                                    <div className="checkoutinnercard-headDiv mb-3">
                                                                        <h5>Connect with MetaMask</h5>
                                                                        <input
                                                                            type="radio"
                                                                            name=""
                                                                            id=""
                                                                            checked={account ? "checked" : false}
                                                                        />
                                                                    </div>
                                                                    <p>
                                                                        If not connected, click the "Connect Wallet"
                                                                        button in the top right corner
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="checkout-inner-card">
                                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                                        <h5>PSR available to deposit</h5>
                                                                        <input
                                                                            type="radio"
                                                                            name=""
                                                                            id=""
                                                                            checked={balance > 0 ? "checked" : false}
                                                                        />
                                                                    </div>
                                                                    <p>
                                                                        Current Balance:{" "}
                                                                        {balance ? balance : "0.00"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="checkout-inner-card">
                                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                                        <h5>BNB available in wallet</h5>
                                                                        <input
                                                                            type="radio"
                                                                            name=""
                                                                            id=""
                                                                            checked={
                                                                                userbalance > 0 ? "checked" : false
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <p>
                                                                        BNB is required to pay transaction fees on
                                                                        the Binance Smart Chain network. BNB
                                                                        Balance:{" "}
                                                                        {userbalance > 0 ? userbalance : "0.00"}BNB
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="checkout-inner-card">
                                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                                        <h5>Eligible to stake</h5>
                                                                        <input
                                                                            type="radio"
                                                                            name=""
                                                                            id=""
                                                                            checked="checked"
                                                                        />
                                                                    </div>
                                                                    <p>
                                                                        You cannot stake if you have an active
                                                                        BSCPAD unstake/withdrawal request
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="checkoutFooter">
                                                                    <input
                                                                        type="checkbox"
                                                                        name=""
                                                                        checked={checkbox1}
                                                                        class="styled-checkbox"
                                                                        onClick={handleChangeCHeckbox}
                                                                        id="styled-checkbox-1"
                                                                    />
                                                                    <p>
                                                                        I have read the{" "}
                                                                        <a href="">Terms and Conditions</a>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <ul className="list-inline text-center mt-3">
                                                                    <li className="list-inline-item">
                                                                        <button
                                                                            type="button"
                                                                            className="btn-common"
                                                                            onClick={() => {
                                                                                setindexs(indexs - 1);
                                                                            }}
                                                                        >
                                                                            Previous
                                                                        </button>
                                                                    </li>
                                                                    {account &&
                                                                        balance > 0 &&
                                                                        userbalance > 0 &&
                                                                        checkbox1 == true ? (
                                                                        <li className="list-inline-item">
                                                                            <button
                                                                                type="button"
                                                                                className="btn-common"
                                                                                onClick={() => {
                                                                                    setindexs(indexs + 1);
                                                                                }}
                                                                            >
                                                                                Next
                                                                            </button>
                                                                        </li>
                                                                    ) : (
                                                                        <li className="list-inline-item">
                                                                            <button
                                                                                type="button"
                                                                                className="btn-common"
                                                                                onClick={() => {
                                                                                    setindexs(indexs + 1);
                                                                                }}
                                                                                disabled
                                                                            >
                                                                                Next
                                                                            </button>
                                                                        </li>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {indexs === 2 && (
                                                    <div className="amountunstack amountStakeDetail">
                                                        <div className="row">
                                                            <div className="col-sm-8 col-12 mx-auto">
                                                                <div className="amount-div-main ptb">
                                                                    <div className="amount-div">
                                                                        <p>Amount</p>
                                                                        <div className="inputMax">
                                                                            <input
                                                                                placeholder="0"
                                                                                value={unstackbalance}
                                                                                onChange={handleInputs}
                                                                                type="text"
                                                                            />
                                                                            <button className="sjsjdddc" onClick={maxunstake}>Max</button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="balanceOf">
                                                                        <p>
                                                                            Balance: <span>{totalStaked}</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <ul className="list-inline text-center mt-3">
                                                                    <li className="list-inline-item">
                                                                        <button
                                                                            type="button"
                                                                            className="btn-common"
                                                                            onClick={() => {
                                                                                setindexs(indexs - 1);
                                                                            }}
                                                                        >
                                                                            Previous
                                                                        </button>
                                                                    </li>
                                                                    {unstackbalance <= parseInt(totalStaked) &&
                                                                        unstackbalance > 0 ? (
                                                                        <li className="list-inline-item">
                                                                            <button
                                                                                type="button"
                                                                                className="btn-common"
                                                                                onClick={() => {
                                                                                    setindexs(indexs + 1);
                                                                                }}
                                                                            >
                                                                                Next
                                                                            </button>
                                                                        </li>
                                                                    ) : (
                                                                        <li className="list-inline-item">
                                                                            <button
                                                                                type="button"
                                                                                className="btn-common"
                                                                                onClick={toastmsgss}
                                                                            >
                                                                                Next
                                                                            </button>
                                                                        </li>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {indexs === 3 && (
                                                    <div className="authorization  PAuthorizationDetail">
                                                        <div className="row">
                                                            <div className="col-sm-10 col-12 ptb mx-auto">
                                                                <div className="text-center pre-auth-method">
                                                                    <h3>Pre-authorization</h3>
                                                                    <p className="pSpecial">
                                                                        Required transaction 1 of 2
                                                                    </p>
                                                                    <p>
                                                                        In this step, you grant access to the
                                                                        staking smart contract to accept PSR
                                                                    </p>
                                                                    <div class="progress progressBar">
                                                                        <div
                                                                            class="progress-bar w-75"
                                                                            role="progressbar"
                                                                            aria-valuenow="75"
                                                                            aria-valuemin="0"
                                                                            aria-valuemax="100"
                                                                        ></div>
                                                                    </div>
                                                                    <h5>
                                                                        Waiting for the transaction to complete
                                                                    </h5>
                                                                    <p>
                                                                        Please wait for the transaction to confirm
                                                                        before proceeding.
                                                                    </p>
                                                                    <a className="text-truncate" href="">
                                                                        <p>
                                                                            0xCAB13D0ABD22E698848A73DDBABDA8CD8C56288E
                                                                        </p>{" "}
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <ul className="list-inline text-center mt-3">
                                                                    <li className="list-inline-item">
                                                                        <button
                                                                            type="button"
                                                                            className="btn-common"
                                                                            onClick={() => {
                                                                                setindexs(indexs - 1);
                                                                            }}
                                                                        >
                                                                            Previous
                                                                        </button>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <button
                                                                            type="button"
                                                                            className="btn-common"
                                                                            onClick={() => {
                                                                                setindexs(indexs + 1);
                                                                            }}
                                                                        >
                                                                            Next
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {indexs === 4 && (
                                                    <div className="confirmation confirmationDetail">
                                                        <div className="row">
                                                            <div className="col-sm-10 col-12 ptb20 mx-auto">
                                                                {txstatus == true ? (
                                                                    <div>
                                                                        <div className="text-center confirmation-method">
                                                                            <h3>Success</h3>
                                                                            <p className="">
                                                                                Congratulations! Your tokens are now
                                                                                Unstaked. If desired, you may check Binance
                                                                                Smart Chain to confirm the transaction.
                                                                            </p>
                                                                            <a className="text-truncate" href="">
                                                                                <p>
                                                                                    0xCAB13D0ABD22E698848A73DDBABDA8CD8C56288E
                                                                                </p>{" "}
                                                                            </a>
                                                                        </div>
                                                                        <div className="col-12">
                                                                            <ul className="list-inline text-center mt-3">
                                                                                <li className="list-inline-item">
                                                                                    {" "}
                                                                                    <button className="btn-common" onClick={histroryredirect}>
                                                                                        Done
                                                                                    </button>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="textsvs text-center">
                                                                        <h6 className="mb-4 shdsjd">
                                                                            Confirm Your Payement To Proceed
                                                                        </h6>
                                                                        <div className="text-center">
                                                                            <button
                                                                                type="button"
                                                                                className="btn-common"
                                                                                onClick={UnStake_Token}
                                                                            >
                                                                                Confirm
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                        </section>
                                        <section
                                            class="tab-pane stakeDetail ptb20 fade"
                                            id="pills-contact"
                                            role="tabpanel"
                                            aria-labelledby="pills-contact-tab"
                                        >
                                            <h2 className="text-center">Withdraw your PSR</h2>
                                            <div className="row">
                                                <div className="col-sm-12 col-11 mx-auto">
                                                    <div class="table-responsive text-center">
                                                        <table class="table">
                                                            <thead
                                                                class="nav nav-pills mb-3"
                                                                id="pills-tab"
                                                                role="tablist"
                                                            >
                                                                <tr className="mx-auto">
                                                                    <td scope="col">
                                                                        <div className="text-center  nav-item">
                                                                            <a class="nav-link active">
                                                                                <img
                                                                                    src={
                                                                                        dark === "dark"
                                                                                            ? "projectstarter/staking/stake/checkpoint-dark.svg"
                                                                                            : "projectstarter/staking/stake/checkpoint.svg"
                                                                                    }
                                                                                    alt=""
                                                                                />
                                                                                <p>Checkpoint</p>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                    <td scope="col">
                                                                        <div className="text-center nav-item">
                                                                            <a class="nav-link">
                                                                                <img
                                                                                    src={
                                                                                        dark === "dark"
                                                                                            ? "projectstarter/staking/withdraw/initWithdraw-dark.svg"
                                                                                            : "projectstarter/staking/withdraw/initWithdraw.svg"
                                                                                    }
                                                                                    alt=""
                                                                                />
                                                                                <p>Initialize Withdraw</p>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                    <td scope="col">
                                                                        <div className="text-center">
                                                                            <a class="nav-link">
                                                                                <img
                                                                                    src={
                                                                                        dark === "dark"
                                                                                            ? "projectstarter/staking/stake/confirmation-dark.svg"
                                                                                            : "projectstarter/staking/stake/confirmation.svg"
                                                                                    }
                                                                                    alt=""
                                                                                />
                                                                                <p>Confirmation</p>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </thead>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="tab-content all-inner-tabs">
                                                {withdrawIndex === 0 && (
                                                    <section class="tab-pane fade show checkouttab active ptb20">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="text-center topDetailss">
                                                                    <h5>Checkpoints</h5>
                                                                    <p>
                                                                        The following conditions must be met to
                                                                        proceed
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="checkout-inner-card">
                                                                    <div className="checkoutinnercard-headDiv mb-3">
                                                                        <h5>Connect with MetaMask</h5>
                                                                        <input
                                                                            checked={account ? "checked" : false}
                                                                            type="radio"
                                                                            name=""
                                                                            id=""
                                                                        />
                                                                    </div>
                                                                    <p>
                                                                        If not connected, click the "Connect Wallet"
                                                                        button in the top right corner
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="checkout-inner-card">
                                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                                        <h5>PSR available to withdraw</h5>
                                                                        <input
                                                                            type="radio"
                                                                            checked={
                                                                                totalUnStaked > 0 ? "checked" : false
                                                                            }
                                                                            name=""
                                                                            id=""
                                                                        />
                                                                    </div>
                                                                    <p>
                                                                        Current Balance:{" "}
                                                                        {totalUnStaked ? totalUnStaked : "0.00"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="checkout-inner-card">
                                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                                        <h5>BNB available in wallet</h5>
                                                                        <input
                                                                            type="radio"
                                                                            name=""
                                                                            id=""
                                                                            checked={
                                                                                userbalance > 0 ? "checked" : false
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <p>
                                                                        BNB is required to pay transaction fees on
                                                                        the Binance Smart Chain network. BNB
                                                                        Balance:{" "}
                                                                        {userbalance > 0 ? userbalance : "0.00"}BNB
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="col-12">
                                                                <div className="checkoutFooter">
                                                                    <input
                                                                        type="checkbox"
                                                                        onChange={() =>
                                                                            setWithdrawTerms(!withdrawTerms)
                                                                        }
                                                                        name=""
                                                                        class="styled-checkbox"
                                                                        id="styled-checkbox-1"
                                                                    />
                                                                    <p>
                                                                        I have read the{" "}
                                                                        <a href="">Terms and Conditions</a>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <ul className="list-inline text-center mt-3">
                                                                    <li className="list-inline-item">
                                                                        {" "}
                                                                        <button className="btn-common btn-common22">
                                                                            Previous
                                                                        </button>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <button
                                                                            className="btn-common"
                                                                            onClick={() => validateWithdraw()}
                                                                        >
                                                                            Next
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </section>
                                                )}
                                                {withdrawIndex === 1 && (
                                                    <section class="confirmDetails">
                                                        <div className="row">
                                                            <div className="col-sm-10 col-12 ptb20 mx-auto">
                                                                <div className="text-center confirm-method">
                                                                    <h3>Confirm Withdraw</h3>
                                                                    <p>
                                                                        In this step, you grant access to the
                                                                        staking smart contract to accept PSR
                                                                    </p>
                                                                </div>
                                                                <div className="col-md-12 ">
                                                                    <div className="left-vertical-card-inner">
                                                                        <ul>
                                                                            <li className="liItems">
                                                                                <p>Staked</p>
                                                                                <h5>{totalStaked ? totalStaked : "0.00"}</h5>
                                                                            </li>
                                                                            <li className="liItems">
                                                                                <p>Unstaked</p>
                                                                                <h5>{totalUnStaked ? totalUnStaked : "0.00"}</h5>
                                                                            </li>
                                                                            <li className="liItems">
                                                                                <p>Rewards</p>
                                                                                <h5>{reward ? reward : 0}</h5>
                                                                            </li>
                                                                            <li className="liItems liItems2 d-flex flex-wrap justify-content-around">
                                                                                {/* <button className="btn-common btnWidth  mt-2">
                                                                                    Stake
                                                                                </button> */}
                                                                                <button onClick={() => userWithdrawal()} className="btn-common btnWidth mt-2">
                                                                                    Withdraw
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                )}
                                            </div>
                                        </section>
                                    </div>
                                </div>
                                <div className="col-md-4 ">
                                    <div className="left-vertical-card-inner">
                                        <ul>
                                            <li className="liItems">
                                                <p>Staked</p>
                                                <h5>{totalStaked ? totalStaked : "0.00"}</h5>
                                            </li>
                                            <li className="liItems">
                                                <p>Unstaked</p>
                                                <h5>{totalUnStaked ? totalUnStaked : "0.00"}</h5>
                                            </li>
                                            <li className="liItems">
                                                <p>Rewards</p>
                                                <h5>{reward ? reward.toFixed(5) : "0.00"}</h5>
                                            </li>
                                            <li className="liItems liItems2 d-flex flex-wrap justify-content-around">
                                                {/* <button className="btn-common btnWidth  mt-2">
                                                    Stake
                                                </button> */}
                                                <button
                                                    onClick={() => userWithdrawal()}
                                                    className="btn-common btnWidth mt-2"
                                                >
                                                    Withdraw
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <Faqs />
                </section>
                <Footer />
            </div>
        </>
    );
}

export default Staking;
