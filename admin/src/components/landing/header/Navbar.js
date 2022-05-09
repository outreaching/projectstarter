import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { userTheme } from "../../../redux/action/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import useAuth from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch();
    const [theme, setTheme] = React.useState(null);
    const dark = useSelector((state) => state.UserReducer.theme);
    const token = localStorage.getItem("adminToken");
    const history = useHistory();
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
    // useEffect(() => {
    //     let token = localStorage.getItem("adminToken");
    //     if(!token) {
    //       history.push("/")
    //     }
    //     let themo = localStorage.getItem("wtTheme");
    //     if (themo === null) {
    //         localStorage.setItem("wtTheme", "light");
    //         setTheme("light");
    //         dispatch(userTheme("light"));
    //     } else {
    //         setTheme(themo);
    //         dispatch(userTheme(themo));
    //     }
    // }, []);

    const Logout = () => {
        localStorage.setItem("adminToken", undefined);
        history.push('/');
    }

    return (
        <>
            <div className={dark}>
                <section className="main-navbar">
                    <div className="container-fluid mt-5">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <nav className="navbar ptb20 navbar-expand-lg">
                                    <Link to="/admin">
                                        <a className="navbar-brand" href="#">
                                            <img
                                                src={
                                                    dark === "dark"
                                                        ? "/projectstarter-dark/top-logo-dark.svg"
                                                        : "/projectstarter/header/logo.svg"
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
                                        className="collapse navbar-collapse ml-auto "
                                        id="navbarSupportedContent"
                                    >
                                        <ul className='navbar-nav navbar-nav1 navTabsWidth mr-auto '>
                                            <li className="nav-item">
                                                <Link className="nav-link btn-white" to="/admin">
                                                    Projects
                                                </Link>
                                            </li>
                                            <li className='nav-item'>
                                                <Link className="nav-link btn-white" to="/kycprojects">
                                                    KYC
                                                </Link>
                                            </li>
                                        </ul>
                                        {!token && (
                                            <div className="form-inline mt-0 my-lg-0 ml-auto">
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
                                            </div>
                                        )}
                                        {token ?
                                            <button onClick={() => Logout()} className="nav-link  btn-white1 btn-common-clear ">
                                                Logout
                                            </button>
                                            :
                                            null
                                        }
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Navbar;
