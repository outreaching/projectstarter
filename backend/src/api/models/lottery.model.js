const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    contractAddressDeployed: { type: String, lowercase: true, unique: true },
    tier1: [],
    tier2: [],
    tier3: [],
});

/**
 * @typedef lottery
 */
module.exports = mongoose.model("lottery", schema);