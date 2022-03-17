const Step = ({ dark, uploadImage1, setStep, catchBackside, uploadImage, passbackside }) => {

  const moveNext = () => {
    setStep("step9");
  }

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
            <div className="row ptb">
              <div className="col-md-12 mx-auto">
                <div className="Passport-div text-center">
                  <img
                    src={uploadImage1 ? uploadImage1 : uploadImage}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                {/*  */}
              </div>
            </div>
            <div className="form-group text-center">
              <input
                accept="image/gif, image/jpg, image/jpeg, image/png"
                type="file"
                name="image"
                id="files1"
                onChange={catchBackside}
                className="d-none"
              />
              <label for="files1" className="btn-common mt-4">
                {passbackside ? "Recapture Backside" : "Capture Backside"}
              </label>
            </div>
            {passbackside && (
              <div className="form-group pl-3 pb-2 text-center">
                <button onClick={() => moveNext()} className="btn-common mt-4 opac-75">
                  Next
                </button>
              </div>
            )}
            {/* <div className="form-group text-center">
              <label
                for="files"
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
