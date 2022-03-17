import Select from "react-select";
import countryList from "react-select-country-list";
import React, { useState, useMemo } from "react";
import "./style.scss";

const Step = ({ dark, setStep, setCountry, country }) => {
  const options = useMemo(() => countryList().getData(), []);
  const changeHandler = (value) => {
    setCountry(value);
    setStep("step5")
  };
  return (
    <div className="Myprofile">
      <div className="form-group text-center">
        <img
          src={
            dark === "dark"
              ? "projectstarter/kyc/kycVerify-dark.svg"
              : "projectstarter/kyc/kycVerify.svg"
          }
          className="img-fluid"
          alt=""
        />
        <img
          src="projectstarter/kyc/kycVerify.svg"
          className="img-fluid d-none"
          alt=""
        />
      </div>
      <div className="form-group text-center">
        <h3>Individual KYC Verification</h3>
      </div>
      <div className="form-group text-center">
        <p className="kycVeriP">
          Each account has 1 KYC credit. If your verification fails, please
          contact <br /> an admin for more information before submitting again.
        </p>
      </div>
      <div className="form-group ">
        <div class="card mt-5  mb-3">
          <div class="card-header py-4 text-right">
            {" "}
            {/* <select className="btn-common-grey" name="English" id="English">
              <option value="Filter">English</option>
              <option value="Filter">Urdu</option>
            </select> */}
          </div>
          <div class="card-body  text-secondary">
            <h3 className="text-center mt-4">
              Choose your National ID issuing country/region.
            </h3>
            <div className="row ptb">
              <div className="col-md-8 mx-auto ">
                <div
                  className={
                    "filter-input-div pb-5 " + (dark === "dark" ? "dark" : "")
                  }
                >
                  <Select
                    type="text"
                    options={options}
                    value={country}
                    onChange={changeHandler}
                    placeholder="Search by country name"
                  />
                  {/* <img
                    src="projectstarter/kyc/search.svg"
                    alt=""
                    className="searchImg"
                  /> */}
                </div>
                {/* <div className="row">
                  <div className="col-md-6">
                    <ul className="list-inline mb-4">
                      <li className="list-inline-item d-flex align-items-center mb-4">
                        <img
                          src="projectstarter/kyc/cflags/pk.svg"
                          alt=""
                          className="mr-2"
                        />
                        <p>Pakistan</p>
                      </li>
                      <li className="list-inline-item d-flex align-items-center mb-4">
                        <img
                          src="projectstarter/kyc/cflags/argentina.svg"
                          alt=""
                          className="mr-2"
                        />
                        <p>Argentina</p>
                      </li>
                      <li className="list-inline-item d-flex align-items-center mb-4">
                        <img
                          src="projectstarter/kyc/cflags/pk.svg"
                          alt=""
                          className="mr-2"
                        />
                        <p>Pakistan</p>
                      </li>
                      <li className="list-inline-item d-flex align-items-center mb-4">
                        <img
                          src="projectstarter/kyc/cflags/argentina.svg"
                          alt=""
                          className="mr-2"
                        />
                        <p>Argentina</p>
                      </li>
                      <li className="list-inline-item d-flex align-items-center mb-4">
                        <img
                          src="projectstarter/kyc/cflags/pk.svg"
                          alt=""
                          className="mr-2"
                        />
                        <p>Pakistan</p>
                      </li>
                      <li className="list-inline-item d-flex align-items-center mb-4">
                        <img
                          src="projectstarter/kyc/cflags/argentina.svg"
                          alt=""
                          className="mr-2"
                        />
                        <p>Argentina</p>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6 ">
                    <ul className="list-inline">
                      <li className="list-inline-item d-flex align-items-center mb-4">
                        <img
                          src="projectstarter/kyc/cflags/afg.svg"
                          alt=""
                          className="mr-2"
                        />
                        <p>Afganistan</p>
                      </li>
                      <li className="list-inline-item d-flex align-items-center mb-4">
                        <img
                          src="projectstarter/kyc/cflags/astr.svg"
                          alt=""
                          className="mr-2"
                        />
                        <p>Australia</p>
                      </li>
                      <li className="list-inline-item d-flex align-items-center mb-4">
                        <img
                          src="projectstarter/kyc/cflags/afg.svg"
                          alt=""
                          className="mr-2"
                        />
                        <p>Afganistan</p>
                      </li>
                      <li className="list-inline-item d-flex align-items-center mb-4">
                        <img
                          src="projectstarter/kyc/cflags/astr.svg"
                          alt=""
                          className="mr-2"
                        />
                        <p>Australia</p>
                      </li>
                      <li className="list-inline-item d-flex align-items-center mb-4">
                        <img
                          src="projectstarter/kyc/cflags/afg.svg"
                          alt=""
                          className="mr-2"
                        />
                        <p>Afganistan</p>
                      </li>
                      <li className="list-inline-item d-flex align-items-center mb-4">
                        <img
                          src="projectstarter/kyc/cflags/astr.svg"
                          alt=""
                          className="mr-2"
                        />
                        <p>Australia</p>
                      </li>
                    </ul>
                  </div>
                </div> */}

                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step;
