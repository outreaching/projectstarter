const Lottery = require('../models/lottery.model');
const Staked = require('../models/staked.model');
const Kyc = require('../models/kyc.model');

const httpStatus = require('http-status');
const { omit, update, max } = require('lodash');

exports.addLottery = async (req, res, nex) => {
    try {

        const contractAddressDeployed = (req.body.contractAddressDeployed).toLowerCase();
        
        let totalStaked = await Staked.countDocuments({});
        let tier1Staked = await Staked.countDocuments({ amount: { $gte: 1000 , $lt: 2000 } });
        let tier2Staked = await Staked.countDocuments({ amount: { $gte: 2000 , $lt: 3000 } });
        let tier3Staked = await Staked.countDocuments({ amount: { $gte: 3000 , $lt: 10000 } });
        let tier4Staked = await Staked.countDocuments({ amount: { $gte: 10000 , $lt: 20000 } });
        let tier5Staked = await Staked.countDocuments({ amount: { $gte: 20000 , $lt: 30000 } });
        let tier6Staked = await Staked.countDocuments({ amount: { $gte: 30000 } });

        tier1Staked = ( tier1Staked * 1 ) / ( totalStaked * 100 );
        tier2Staked = ( tier2Staked * 3 ) / ( totalStaked * 100 );
        tier3Staked = ( tier3Staked * 6 ) / ( totalStaked * 100 );
        tier4Staked = ( tier4Staked * 10 ) / ( totalStaked * 100 );
        tier5Staked = ( tier5Staked * 30 ) / ( totalStaked * 100 );
        tier6Staked = ( tier6Staked * 50 ) / ( totalStaked * 100 );

        let tier1NumberOfWinners = Math.ceil(tier1Staked);
        let tier2NumberOfWinners = Math.ceil(tier2Staked);
        let tier3NumberOfWinners = Math.ceil(tier3Staked);

        const result = await Staked.find({});

        let tier1List = [];
        let tier2List = []; 
        let tier3List = []; 

        for (const elem of result) {
                if (elem.amount >= 1000 && elem.amount < 2000) {
                    tier1List.push(elem.account);
                }
        }

        for (const elem of result) {
                if (elem.amount >= 2000 && elem.amount < 3000) {
                    tier2List.push(elem.account);
                }
        }

        for (const elem of result) {
                if (elem.amount >= 3000 && elem.amount < 10000) {
                    tier3List.push(elem.account);
                }
        }

        let winnersTier1 = []
        let winnersTier2 = []
        let winnersTier3 = []

        let infiniteLoop = 0; // to make sure we dont get in an infinite loop 
        let index = 0;
        while (index < tier1List.length && tier1List.length > 0) {

            let num = randomNumerGenerator(tier1List.length);

            if (winnersTier1.indexOf(tier1List[num]) !== -1 ) {
                infiniteLoop++;
                if(infiniteLoop >= tier1List.length){
                    break;
                }
                continue;
            }
            else {
                winnersTier1.push(tier1List[num]);
                index++;
            }

            if (winnersTier1.length >= tier1NumberOfWinners) {
                break;
            }

            infiniteLoop = 0;
        }

        index = 0;
        infiniteLoop = 0;
        while (index < tier2List.length && tier2List.length > 0) {

            let num = randomNumerGenerator(tier2List.length);

            if (winnersTier2.indexOf(tier2List[num]) !== -1 ) {
                infiniteLoop++;
                if(infiniteLoop >= tier2List.length){
                    break;
                }
                continue;
            }
            else {
                winnersTier2.push(tier2List[num]);
                index++;
            }

            if (winnersTier2.length >= tier2NumberOfWinners) {
                break;
            }

            infiniteLoop = 0;
        }

        index = 0;
        infiniteLoop = 0;
        while (index < tier3List.length && tier3List.length > 0) {

            let num = randomNumerGenerator(tier3List.length);

            if (winnersTier3.indexOf(tier3List[num]) !== -1 ) {
                infiniteLoop++;
                if(infiniteLoop >= tier3List.length){
                    break;
                }
                continue;
            }
            else {
                winnersTier3.push(tier3List[num]);
                index++;
            }

            if (winnersTier3.length >= tier3NumberOfWinners) {
                break;
            }

            infiniteLoop = 0;
        }

        console.log(winnersTier1, winnersTier2, winnersTier3);

        const lotteryResult = await Lottery.create({
            contractAddressDeployed: contractAddressDeployed,
            tier1: winnersTier1,
            tier2: winnersTier2,
            tier3: winnersTier3
        })

        return res.status(200).json({ status: true, data: { lotteryResult, winnersTier1, winnersTier2, winnersTier3 } });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, error: error.message });
    }
};

function randomNumerGenerator(max) {
    return Math.floor(Math.random() * max);
}

exports.getLottery = async (req, res, next) => {
    try {
        const result = await Lottery.find({});
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}

exports.getLotteryStatus = async (req, res, next) => {
    try {
       const contractAddressDeployed = (req.body.contractAddressDeployed).toLowerCase();
        const walletAddress = (req.body.walletAddress).toLowerCase();

        const result = await Lottery.findOne({ contractAddressDeployed: contractAddressDeployed });

        let {tier1, tier2, tier3} = [];

        tier1 = result.tier1;
        tier2 = result.tier2;
        tier3 = result.tier3;

        let userTier = 0;

        try {
            
            for (const elem of tier1) {
                if (elem === walletAddress) {
                    userTier = 1;
                }
            }
        } catch (error) {
            
        }

        try {
            
            for (const elem of tier2) {
                if (elem === walletAddress) {
                    userTier = 2;
                }
            }
        } catch (error) {
            
        }

        try {
            for (const elem of tier3) {
                if (elem === walletAddress) {
                    userTier = 3;
                }
            }
            
        } catch (error) {
            
        }

        return res.status(200).json({ status: true, data: {tier : userTier} })

    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}