const Staked = require('../models/staked.model');

const httpStatus = require('http-status');
const { omit, update, max } = require('lodash');

exports.addStakes = async (user, pid, amount) => {
    try {
        
        let result;
        const exists = await Staked.findOne({ account: user })

        if (!exists) {
            result = await Staked.create({
                account : user,
                pid : pid,
                amount : amount
            });
        }
        else {
            result = await Staked.findOneAndUpdate({
                account : user,
                pid : pid
            },
            {
                amount : exists.amount + amount
            })
        }

        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

exports.removeStakes = async (user, pid, amount) => {
    try {
        
        let result;
        const exists = await Staked.findOne({ account: user })

        if (exists) {
            result = await Staked.findOneAndUpdate({
                account: user,
                pid : pid
            },
            {
                amount : exists.amount - amount
            })
        }
        else {
            throw error;
        }

    } catch (error) {
        console.log(error);
        return error;
    }
}