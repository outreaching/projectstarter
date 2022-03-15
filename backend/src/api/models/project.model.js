const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const APIError = require('../errors/api-error');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const { boolean } = require('joi');

const schema = new mongoose.Schema({
    projectName: String,
    symbol: String,
    projectDescription: String,
    logoURL: String,
    contractAddress: { type: String, lowercase: true },
    projectFee: Number,

    websiteLink: String,
    twitterLink: String,
    telegramlink: String,
    discrodLink: String,
    mediumLink: String,

    contactPersonName: String,
    contactPersonEmail: String,
    contactPersonWalletAddress: { type: String, lowercase: true },

    totalSupplyOfToken: String,
    tokenDecimals: String,
    amountAllocatedForPresale: String,
    tokenPriceInBNB: String,

    preSaleStartDateAndTime: Date,
    preSaleEndDateAndTime: Date,

    FCFSStartdate: Date,
    FCFSEnddate: Date,
    maxAllocation1: String,
    maxAllocation2: String,
    maxAllocation3: String,
    maxAllocation4: String,
    maxAllocation5: String,
    maxAllocation6: String,
    minAllocation1: String,
    minAllocation2: String,
    minAllocation3: String,
    minAllocation4: String,
    minAllocation5: String,
    minAllocation6: String,
    noofVesting: String,

    tier1MaxCap: String,
    tier2MaxCap: String,
    tier3MaxCap: String,
    tier4MaxCap: String,
    tier5MaxCap: String,
    tier6MaxCap: String,
    attributes: [{ VestingPercentages: String, VestingUnlockTimes: String }],

    statusOfApplication: { type: String, default: "pending" },         // Use {pending, accepted, rejected}
    contractAddressDeployed: { type: String, lowercase: true },               //stores contract address of the Project (Null if not deployed)
    isPresale: { type: String, default: false },
    statusOfProject: { type: String, default: "coming soon" },         // Use {close, open}

    finalizeSaleDone: Boolean,
    kycVerified: Boolean,

    kycFirstName: String,
    kycSecondName: String,
    kycPassportPicture: String,

    // listingPriceInBNB: Number, 
    softCapPercentage: String,
    // liquidityPercentageForPancake: String,
    launchPadFeePercentage: String,
    finalizeStatus: { type: Boolean, default: false }
});

/**
 * @typedef Project
 */
module.exports = mongoose.model("Project", schema);