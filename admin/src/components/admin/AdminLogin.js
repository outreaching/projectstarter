import React, { useState, useRef } from "react";
import Navbar from "../landing/header/Navbar";
import "./adminlogin.scss";
import signupimg from "../../Assets/sign-up-background.png";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { TextField, Typography } from "@material-ui/core";
import FooterSecondary from "../footerSecondary/FooterSecondary";
import Spinner from "../../Assets/spinner.svg";
import { useSelector } from "react-redux";
import { ApiUri } from "../../utils/apiUrl.js";
import axios from "axios";
import { toast } from 'react-toastify';
import { Backdrop } from '@material-ui/core';
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";

export default function AdminLogin() {
  const dark = useSelector((state) => state.UserReducer.theme);
  const [loader, setLoader] = useState(false);
  const [errore, setError] = useState(false);
  const [opens, setOpens] = useState(false);
  const history = useHistory();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    setOpens(true)
    setError("");
    var data = JSON.stringify({
      email: data.email,
      password: data.password,
    });
    var config = {
      method: "post",
      url: `${ApiUri}/v1/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        localStorage.setItem("adminToken", response.data.token.accessToken);
        history.push("/admin");
        setOpens(false)
        toast.success('Login Successfully', {
          position: "top-right",
          autoClose: 3000,
      });
      })
      .catch(function (error) {
        setOpens(false)
        setError("Invalid email or password");
        toast.warning('Invalid email or password', {
          position: "top-right",
          autoClose: 3000,
      });
        console.log(error.message);
      });
  };

  return (
    <>
     <Backdrop className="loader" sx={{ color: '#fff' }} open={opens}>
                <img src="/projectstarter/header/loader.svg" alt="" className="img-fluid shdshhgdss" />
            </Backdrop>
      <div className={dark}>
        <section className="admin-login">
          <Navbar />
          <div className="container">
            <div className="row">
              <div className="col-md-6 p-0 mx-auto">
                <ValidatorForm className="form-contact">
                  <div className="adminCard ">
                    <div className="form-img">
                      <p>
                        Welcome to the Future <br /> of Fundraising
                      </p>
                    </div>
                    <form onSubmit={() => handleSubmit(onSubmit)}>
                      <div className="adminCard-inner-inputs">
                        <div className="form-group ">
                          <label className="p-main" For="name">
                            User Name{" "}
                          </label>
                          {/* <TextField
                            type="text"
                            required
                            id="email"
                            name="email"
                            variant="outlined"
                            fullWidth
                            placeholder="Enter your username"
                            margin="dense"
                          /> */}
                          <TextField
                            required
                            id="email"
                            name="email"
                            variant="outlined"
                            fullWidth
                            placeholder="Enter your project name"
                            margin="dense"
                            {...register("email")}
                            error={errors.email ? true : false}
                          />
                          <Typography variant="inherit" color="textSecondary">
                            {errors.email?.message}
                          </Typography>
                        </div>
                        <div className="form-group ">
                          <label className="p-main" For="name">
                            Password
                          </label>
                          {/* <TextField
                            required
                            type="password"
                            id="name"
                            name="name"
                            variant="outlined"
                            fullWidth
                            placeholder="Enter your password"
                            margin="dense"
                          /> */}
                          <TextField
                            required
                            id="password"
                            name="password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            placeholder="Enter your project name"
                            margin="dense"
                            {...register("password")}
                            error={errors.password ? true : false}
                          />
                          <Typography variant="inherit" color="textSecondary">
                            {errors.password?.message}
                          </Typography>
                          {/* <div className="text-right">
                            <a href="#" For="name">
                              Forget Password ?
                            </a>
                          </div> */}
                        </div>
                        <p className="text-center pb-3 text-danger">{errore}</p>{""}
                        <div className="form-group ">
                          <button
                            type="submit"
                            disabled={loader}
                            className="btn-common w-100"
                            onClick={handleSubmit(onSubmit)}
                          >
                            {loader ? (
                              <img src={Spinner} width={40} alt="" />
                            ) : (
                              <p className="p-2 text-white">Login</p>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </ValidatorForm>
              </div>
            </div>
          </div>
        </section>
        <FooterSecondary />
      </div>
    </>
  );
}
