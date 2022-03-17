import Spinner from "../../../../Assets/spinner.svg";

const Step = ({ dark, status, getKyc, loader, setStatus }) => {
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
        {status === "pending" ? (
          <h3 className="text-warning">
            Verification is in Pending, Please wait
          </h3>
        ) : (
          <h3 className="text-danger">Couldn't Verify, Try again</h3>
        )}
      </div>
      <div className="form-group px-3 text-center">
        <p className="kycVeriP text-left text-white">
          Please follow these steps to get successfully verified.
        </p>
        <p
          style={{ fontSize: 14 }}
          className="kycVeriP mt-2 text-left text-gray d-flex align-items-center justify-content-start"
        >
          <div
            style={{
              backgroundColor: "#1FA5FF",
              borderRadius: "50%",
              height: 14,
              width: 14,
            }}
            className="mr-2"
          ></div>{" "}
          Take a clear photo of your National ID showing all corners.
        </p>
        <p
          style={{ fontSize: 14 }}
          className="kycVeriP mt-2 text-left text-gray d-flex align-items-center justify-content-start"
        >
          <div
            style={{
              backgroundColor: "#1FA5FF",
              borderRadius: "50%",
              height: 14,
              width: 14,
            }}
            className="mr-2"
          ></div>{" "}
          Make sure the image is not too bright or too dull to tread.
        </p>
      </div>
      <div className="form-group text-center">
        {status === "rejected" && (
          <button onClick={() => getKyc()} className="btn-common mt-4 opac-75">
            {loader ? (
              <img src={Spinner} width={40} alt="" />
            ) : (
              <p className="text-white py-2">Try Again</p>
            )}
            {/* Save */}
          </button>
        )}
      </div>
    </div>
  );
};

export default Step;
