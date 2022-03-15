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
    contractAddressDeployed: String, 
    walletAddress: String,
});

/**
 * @typedef Participated
 */
module.exports = mongoose.model("Participated", schema);