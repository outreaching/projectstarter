const Step = ({ dark }) => {
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
              Show the front side of your Pakistan National ID.
            </h3>
            <div className="row ptb">
              <div className="col-md-8 mx-auto ">
                <div className="photoVideo-div">
                  <ul className="list-inline">
                    <li className="list-inline-item d-flex align-items-center mb-3">
                      <img
                        src="projectstarter/kyc/correctgreen.svg"
                        alt=""
                        className="mr-2"
                      />
                      <p>Show entire documant</p>
                    </li>
                    <li className="list-inline-item d-flex align-items-center mb-3">
                      <img
                        src="projectstarter/kyc/correctgreen.svg"
                        alt=""
                        className="mr-2"
                      />
                      <p>Don’t fold the documant</p>
                    </li>
                    <li className="list-inline-item d-flex align-items-center mb-3">
                      <img
                        src="projectstarter/kyc/correctgreen.svg"
                        alt=""
                        className="mr-2"
                      />
                      <p>Avoid glare</p>
                    </li>
                    <li className="list-inline-item d-flex align-items-center mb-3">
                      <img
                        src="projectstarter/kyc/correctgreen.svg"
                        alt=""
                        className="mr-2"
                      />
                      <p>No paper-based documants</p>
                    </li>
                    <li className="list-inline-item d-flex align-items-center mb-3">
                      <img
                        src="projectstarter/kyc/correctgreen.svg"
                        alt=""
                        className="mr-2"
                      />
                      <p>No photo from another image or device</p>
                    </li>
                    <li className="list-inline-item d-flex align-items-center mb-3">
                      <img
                        src="projectstarter/kyc/correctgreen.svg"
                        alt=""
                        className="mr-2"
                      />
                      <p>No Photocopy or grayscale documantt</p>
                    </li>
                  </ul>
                </div>
                {/*  */}
              </div>
            </div>
            <div className="form-group text-center">
              <button className="btn-common mt-4 opac-75">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step;
