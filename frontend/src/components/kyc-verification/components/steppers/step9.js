import Spinner from "../../../../Assets/spinner.svg"

const Step = ({ dark, uploadImage1, getKyc, loader }) => {
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
            {/* <select
                className="btn-common-grey"
                name="English"
                id="English"
              >
                <option value="Filter">English</option>
                <option value="Filter">Urdu</option>
              </select> */}
          </div>
          <div class="card-body  text-secondary">
            <div className="row ptb">
              <div className="col-md-12 mx-auto">
                <div className="Passport-div text-center">
                  <img src={uploadImage1} alt="" className="img-fluid" />
                </div>
                {/*  */}
              </div>
            </div>
            <div className="form-group text-center">
              <button onClick={() => getKyc()} className="btn-common mt-4 opac-75">
                {loader ? (
                  <img src={Spinner} width={40} alt="" />
                ) : (
                  <p className="text-white py-2">Save</p>
                )}
                {/* Save */}
              </button>
            </div>
            {/* <div className="form-group text-center">
                <label
                  for="files1"
                  className="btn-common-outline "
                  style={{ border: "none" }}
                >
                  Try Again
                </label>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step;
