import { TextField } from "@material-ui/core";
import { useState } from "react";
import Spinner from "../../../Assets/spinner.svg";

const Profile = ({ tab, status, setTab, email, setEmail, setUsername, username }) => {
  const [loader, setLoader] = useState(false);

  const handleProfile = (e) => {
    e.preventDefault();
    setTab(1);
  };

  return (
    <div className="row">
      <div className="col-12 p-0">
        <form onSubmit={handleProfile}>
          <div className="Myprofile">
            <div className="form-group ">
              <label className="p-main" For="name">
                Your Name{" "}
              </label>
              <TextField
                type="text"
                required
                disabled={status === "pending" || status === "accepted"}
                onChange={(e) => setUsername(e.target.value)}
                id="name"
                name="name"
                value={username}
                variant="outlined"
                fullWidth
                placeholder="Enter your username"
                margin="dense"
              />
            </div>
            <div className="form-group ">
              <label className="p-main" For="name">
                Email Address{" "}
              </label>
              <TextField
                type="email"
                disabled={status === "pending" || status === "accepted"}
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="name"
                name="name"
                variant="outlined"
                fullWidth
                placeholder="Enter your email"
                margin="dense"
              />
            </div>
            {status === "rejected" || status === null && (
              <div className="form-group text-right">
                {/* <button onClick={() => setTab(0)} className="btn-common mr-4">
                  Back
                </button> */}

                <button type="submit" className="btn-common mt-4 opac-75">
                  {/* {loader ? (
                  <img src={Spinner} width={40} alt="" />
                ) : (
                  <p className="text-white py-2">Save</p>
                )} */}
                  Next
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
