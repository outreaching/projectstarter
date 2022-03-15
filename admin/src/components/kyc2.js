import React from "react";

import InnerHTML from "dangerously-set-html-content";

function Verification() {
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

  return <InnerHTML html={content} />;
}

export default Verification;
