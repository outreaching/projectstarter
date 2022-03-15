const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const APIError = require('../errors/api-error');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');

const schema = new mongoose.Schema({
    contractAddressDeployed: { type: String, lowercase: true },
    walletAddress: { type: String, lowercase: true, unique: true },
    name: String,
    email: String,
    country: String,
    documentType: String,
    kycImageFrontSide: String,
    kycImageBackSide: String,
    statusOfApplication: { type: String, default: "pending" },
    // statusOfKyc: Boolean,
    responseFromBlockPass: { type: String, default: "pending" },
});

/**
 * @typedef Kyc
 */
module.exports = mongoose.model("Kyc", schema);