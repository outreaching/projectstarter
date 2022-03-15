const Step = ({ dark, setStep, setDocumentName }) => {

  const moveNext = (value) => {
    setDocumentName(value);
    setStep("step4");
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
            <h3 className="text-center mt-4">
              Choose the Document type you would like to use.
            </h3>
            <div className="row ptb">
              <div className="col-md-5 mx-auto ">
                <ul onClick={()=>moveNext("National Id")} className="list-inline verifyCard2 opac-75">
                  <li className="list-inline-item">
                    <img
                      src={
                        dark === "dark"
                          ? "projectstarter/kyc/Nid-dark.svg"
                          : "projectstarter/kyc/Nid.svg"
                      }
                      alt="img"
                    />
                  </li>
                  <li className="list-inline-item d-flex justify-content-between w-100">
                    <p>National Id</p>
                    <img
                      src="projectstarter/kyc/doctype-arrow.svg"
                      alt="arrowImg"
                    />
                  </li>
                </ul>
                <ul onClick={()=>moveNext("Passport")} className="list-inline mt-3 verifyCard2 opac-75">
                  <li className="list-inline-item">
                    <img
                      src={
                        dark === "dark"
                          ? "projectstarter/kyc/passporticon-dark.svg"
                          : "projectstarter/kyc/passporticon.svg"
                      }
                      alt="img"
                    />
                  </li>
                  <li className="list-inline-item d-flex justify-content-between w-100">
                    <p>Passport</p>
                    <img
                      src="projectstarter/kyc/doctype-arrow.svg"
                      alt="arrowImg"
                    />
                  </li>
                </ul>
                <ul onClick={()=>moveNext("Driving License")} className="list-inline mt-3 verifyCard2 opac-75">
                  <li className="list-inline-item">
                    <img
                      src={
                        dark === "dark"
                          ? "projectstarter/kyc/drivingicon-dark.svg"
                          : "projectstarter/kyc/drivingicon.svg"
                      }
                      alt="img"
                    />
                  </li>
                  <li className="list-inline-item d-flex justify-content-between w-100">
                    <p>Driving License</p>
                    <img
                      src="projectstarter/kyc/doctype-arrow.svg"
                      alt="arrowImg"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step;
