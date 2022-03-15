const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    account: {type: String, lowercase: true},
    pid: Number,
    amount: Number,
});

/**
 * @typedef staked
 */
module.exports = mongoose.model("staked", schema);