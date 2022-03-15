import { useState } from "react";

const Step = ({dark,setStep}) => {
  const [inp, setInp] = useState(false);
  const submit = () => {
    if(inp){
      setStep("step2");
    }
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
        <div class="card mt-5 mb-3">
          <div class="card-header text-right py-4">
            {" "}
            {/* <select className="btn-common-grey" name="English" id="English">
              <option value="Filter">English</option>
              <option value="Filter">Urdu</option>
            </select> */}
          </div>
          {/**************************  before verification ***************************/}
          <div class="card-body  text-secondary">
            <h3 className="text-center mt-4">Help us verify your identity</h3>
            <h5 class="card-title mt-4">Identity verification Consent</h5>
            <p class="card-text my-4">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio. Temporibus autem quibusdam et
              aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
              voluptates repudiandae sint et molestiae non recusandae.
            </p>
            <ul className="list-inline">
              <li className="list-inline-item">
                <input onChange={()=>setInp(!inp)} type="checkbox" name="" id="" />
              </li>
              <li className="list-inline-item">
                <p>
                  I agree to the above statement, and i have read{" "}
                  <span style={{color: '#1fa5ff'}}>Privacy Policy.</span>{" "}
                </p>
              </li>
            </ul>
            <div className="form-group text-center mt-5">
              {/* <a href="https://verify-with.blockpass.org/?clientId=projectstarter&serviceName=ProjectStarter.io&env=prod"> */}
                <button onClick={()=>submit()} className="btn-common mt-4 opac-75">Continue</button>
              {/* </a> */}
            </div>
          </div>
          {/**************************  before verification ***************************/}
        </div>
      </div>
    </div>
  );
};

export default Step;
