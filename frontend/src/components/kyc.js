// to do... proptypes? error handling?
import { Card } from "@material-ui/core";
import InnerHTML from "dangerously-set-html-content";
import React from "react";
import ReactDOM from "react-dom";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.loadBlockpassWidget();
  }

  loadBlockpassWidget = () => {
    const blockpass = new window.BlockpassKYCConnect(
      "projectstarter", // service client_id from the admin console
      {
        refId: "123", // assign the local user_id of the connected user
      }
    );

    blockpass.startKYCConnect();

    blockpass.on("KYCConnectSuccess", () => {
      //add code that will trigger when data have been sent.
    });
  };


  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    const content = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src= 'https://cdn.blockpass.org/widget/scripts/release/3.0.2/blockpass-kyc-connect.prod.js'></script>
      </head>
      <body class="c16">
        <button id="blockpass-kyc-connect">Verify with Blockpass</button>
        <button onclick="Test()">Verify</button>
        <script>
          function Test() {
            alert("working");
            const blockpass = new BlockpassKYCConnect('projectstarter')
            blockpass.startKYCConnect()
            
            blockpass.on('KYCConnectSuccess', () => {  
              alert('Success!')
            })
          }
        </script> 
      </body>
    </html>`;
    return (
      <div>
        <h1>Hello {this.props.name}.</h1>
        <p>The time is {this.state.date.toLocaleTimeString()}.</p>
        <button id="blockpass-kyc-connect">Verify with Blockpass</button>
        <InnerHTML html={content} />
      </div>
    );
  }
}

ReactDOM.render(<Welcome name="Brendan" />, document.getElementById("root"));

export default Welcome;
