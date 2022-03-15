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
          <div class="card-header text-right">
            {" "}
            <select className="btn-common-grey" name="English" id="English">
              <option value="Filter">English</option>
              <option value="Filter">Urdu</option>
            </select>
          </div>
          <div class="card-body  text-secondary">
            <div className="row ptb">
              <div className="col-md-12 text-center mx-auto">
                <div className="loading-div ptb text-center">
                  <img
                    src="projectstarter/kyc/loading.svg"
                    alt=""
                    className="img-fluid rotate"
                  />
                </div>
                <h3>Sed ut perspiciatis unde omnis iste natus error</h3>
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
