const Step = ({dark, setStep}) => {
    return (
        <div className="Myprofile">
        <div className="form-group text-center">
            <img src={dark === 'dark' ? "projectstarter/kyc/kycVerify-dark.svg" : "projectstarter/kyc/kycVerify.svg"} className='img-fluid' alt="" />
            <img src="projectstarter/kyc/kycVerify.svg" className='img-fluid d-none' alt="" />
        </div>
        <div className="form-group text-center">
            <h3>Individual KYC Verification</h3>
        </div>
        <div className="form-group text-center">
            <p className='kycVeriP'>Each account has 1 KYC credit. If your verification fails, please contact <br /> an admin for more information before submitting again.</p>
        </div>
        <div className="form-group ">
            <div class="card mt-5  mb-3">
                <div class="card-header text-right py-4">  
                    {/* <select className='btn-common-grey' name="English" id="English">
                        <option value="Filter">English</option>
                        <option value="Filter">Urdu</option>
                    </select> */}
                </div>
                <div class="card-body  text-secondary">
                    <h3 className='text-center mt-4'>Let's Verify your identity.</h3>
                    <div className="row ptb">
                        <div className="col-md-5 mx-auto ">

                            <ul className="list-inline verifyCard">
                                <li className="list-inline-item">
                                    <img src={dark === 'dark' ? "projectstarter/kyc/verifyidentity-dark.svg" : "projectstarter/kyc/verifyidentity.svg"} alt="img" />
                                </li>
                                <li className="list-inline-item">
                                    <p>Step 1:</p>
                                    <p>Identity Document Verification</p>
                                </li>
                            </ul>
                            {/* <ul className="list-inline mt-3 verifyCard ">
                                <li className="list-inline-item">
                                    <img src={dark === 'dark' ? "projectstarter/kyc/faceverification-dark.svg" : "projectstarter/kyc/faceverification.svg"} alt="img" />
                                </li>
                                <li className="list-inline-item">
                                    <p>Step 2:</p>
                                    <p>Face Verification</p>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                    <div className="form-group text-center">
                        <button onClick={()=>setStep("step3")} className='btn-common mt-4 opac-75'>Start Verificaton</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
    );
  };
  
  export default Step;
  