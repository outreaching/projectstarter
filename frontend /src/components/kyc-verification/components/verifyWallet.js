import { useWeb3React } from "@web3-react/core";
import Signature from "../../../hooks/VerificationWallet";
import { useState } from "react";

const Wallet = ({ dark, setTab }) => {
  const { account } = useWeb3React();
  const { userSign } = Signature(account);
  const [sign, setSign] = useState(null);

  const Verification = async () => {
    let res = await userSign();
    if (res?.code === 4001) {
    } else if (res?.code) {
    } else {
      await setSign(res);
      await setTab(2);
    }
  };

  return (
    <div className="row">
      <div className="col-12 p-0">
        {sign ? (
          <div className="Myprofile ">
            <div className="form-group text-center">
              <img
                src={
                  dark === "dark"
                    ? "projectstarter/kyc/walletverify-dark.svg"
                    : "projectstarter/kyc/walletverify.svg"
                }
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="form-group text-center">
              <h3 className="">Wallet is verified</h3>
            </div>
            <div className="form-group text-center">
              <p className="mt-3">
                Your verified wallet address is{" "}
                <span className="text-truncate p-main w-25">
                  {account.slice(0, 7)}...
                </span>{" "}
              </p>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                onClick={() => setTab(2)}
                className="btn-common py-2 p-0 mt-4 opac-75"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="Myprofile">
            <div className="form-group text-center">
              <img
                src={
                  dark === "dark"
                    ? "projectstarter/kyc/wallet-dark.svg"
                    : "projectstarter/kyc/wallet.svg"
                }
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="form-group text-center">
              <h3>Verify your wallet</h3>
            </div>
            <div className="form-group text-center">
              <button
                onClick={() => setTab(0)}
                className="btn-common mr-4 opac-75"
              >
                Back
              </button>
              <button
                onClick={() => Verification()}
                className="btn-common mt-4 opac-75"
              >
                Verify Wallet
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
