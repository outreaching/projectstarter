require('dotenv').config();

const mongoose = require('./config/mongoose');
// open mongoose connection
mongoose.connect();

const stakedController = require('./api/controllers/staked.controller');

const Web3 = require('web3');
const options = {
    // Enable auto reconnection
    reconnect: {
        auto: true,
        delay: 3000, // ms
        maxAttempts: 100,
        onTimeout: true
    }
};

const socketURL = "wss://speedy-nodes-nyc.moralis.io/6e396a98bde2a5cde21c6207/bsc/mainnet/ws";
const stakingContract = "0x66d2B5B165507c98e10b4aC36b836A56112273dC";

var provider = new Web3.providers.WebsocketProvider(socketURL, options); // mainnet
var web3 = new Web3(provider)

provider.on('error', e => {
    console.log('WS Error', e);
    provider = new web3.providers.WebsocketProvider(socketURL, options);
});
provider.on('end', e => {
    console.log('WS closed');
    console.log('Attempting to reconnect...');
    provider = new web3.providers.WebsocketProvider(socketURL, options);

    provider.on('connect', function () {
        console.log('WSS Reconnected');
    });

    web3.setProvider(provider);
});

const abi = require('../solidity/abi/staking.json');

const contract = new web3.eth.Contract(abi, stakingContract);

const express = require("express");
const compression = require("compression");
const cors = require('cors');
const morgan = require('morgan');


const port = 2800;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(compression());

app.disable("x-powered-by");

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

contract.events.Deposit()
        .on('connected', () => console.log('Listening to Staking '))
        .on('data', async (event) => {
            try {
                let user = event.returnValues.user;
                user = user.toLowerCase();
                let pid = event.returnValues.pid;
                let amount = event.returnValues.amount;
                amount = amount/(10**18);

                const result = await stakedController.addStakes(user, pid, amount);
                console.log("Staked Updated in DB", result);

            } catch (error) {
                console.log('error::::', error)
            }
        })
        .on('error', (error) => {
            console.log("error:::::", error);
            // process.exit()
        });

contract.events.Unstake()
        .on('connected', () => console.log('Listening to UnStaking '))
        .on('data', async (event) => {
            try {
                let user = event.returnValues.user;
                user = user.toLowerCase();
                let pid = event.returnValues.pid;
                let amount = event.returnValues.amount;
                amount = amount/(10**18);

                const result = await stakedController.removeStakes(user, pid, amount);
                console.log("UnStaked Updated in DB", result);

            } catch (error) {
                console.log('error::::', error)
            }
        })
        .on('error', (error) => {
            console.log("error:::::", error);
        });

app.listen(port, () => console.log("Server Listening on Port " + port));
