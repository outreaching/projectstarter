const httpStatus = require('http-status');
const { omit, now } = require('lodash');
const Project = require('../models/project.model');
const Web3 = require('web3');
const abi = require('../utils/ABIs/projectStarterABI.json');

// const provider = "https://data-seed-prebsc-1-s1.binance.org:8545/"; // testnet
const provider = "https://bsc-dataseed.binance.org/"; // mainnet

exports.addProject = async (req, res, next) => {
    try {

        // console.log("=====>6", req.body.Tier6MaxCap)

        const projectName = req.body.projectName;
        const symbol = req.body.symbol;
        const projectDescription = req.body.projectDescription;
        // const logoURL = req.body.logoURL;
        let logoURL = '';

        // if (req.file) {
        //     logoURL = req.file.location
        // }
        const contractAddress = (req.body.contractAddress).toLowerCase();
        const websiteLink = req.body.websiteLink;
        const twitterLink = req.body.twitterLink;
        const telegramlink = req.body.telegramlink;
        const discrodLink = req.body.discrodLink;
        const mediumLink = req.body.mediumLink;
        const contactPersonName = req.body.contactPersonName;
        const contactPersonEmail = req.body.contactPersonEmail;
        const contactPersonWalletAddress = (req.body.contactPersonWalletAddress).toLowerCase();
        const totalSupplyOfToken = req.body.totalSupplyOfToken;
        const tokenDecimals = req.body.tokenDecimals;
        const amountAllocatedForPresale = req.body.amountAllocatedForPresale;
        const tokenPriceInBNB = req.body.tokenPriceInBNB;
        const preSaleStartDateAndTime = req.body.preSaleStartDateAndTime;
        const preSaleEndDateAndTime = req.body.preSaleEndDateAndTime;

        const FCFSStartdate = req.body.FCFSStartdate;
        const FCFSEnddate = req.body.FCFSEnddate;
        const maxAllocation1 = req.body.maxAllocation1;
        const maxAllocation2 = req.body.maxAllocation2;
        const maxAllocation3 = req.body.maxAllocation3;
        const maxAllocation4 = req.body.maxAllocation4;
        const maxAllocation5 = req.body.maxAllocation5;
        const maxAllocation6 = req.body.maxAllocation6;
        const minAllocation1 = req.body.minAllocation1;
        const minAllocation2 = req.body.minAllocation2;
        const minAllocation3 = req.body.minAllocation3;
        const minAllocation4 = req.body.minAllocation4;
        const minAllocation5 = req.body.minAllocation5;
        const minAllocation6 = req.body.minAllocation6;
        const noofVesting = req.body.noofVesting;
        const tier1MaxCap = req.body.tier1MaxCap;
        const tier2MaxCap = req.body.tier2MaxCap;
        const tier3MaxCap = req.body.tier3MaxCap;
        const tier4MaxCap = req.body.tier4MaxCap;
        const tier5MaxCap = req.body.tier5MaxCap;
        const tier6MaxCap = req.body.tier6MaxCap;
        const softCapPercentage = req.body.softCapPercentage;
        const statusOfApplication = req.body.statusOfApplication;
        const contractAddressDeployed = (req.body.contractAddressDeployed).toLowerCase();
        const firstIterationPercentage = req.body.firstIterationPercentage;
        const secondIterationPercentage = req.body.secondIterationPercentage;
        const finalizeSaleDone = req.body.finalizeSaleDone;
        const kycVerified = req.body.kycVerified;
        const kycFirstName = req.body.kycFirstName;
        const kycSecondName = req.body.kycSecondName;
        const projectFee = req.body.projectFee
        //const kycPassportPicture = req.body.kycPassportPicture;
        let kycPassportPicture = '';

        if (req.file) {
            kycPassportPicture = req.file.location
        }

        if (req.files) {

            if (req.files.logoURL && req.files.logoURL.length > 0) {
                logoURL = req.files.logoURL[0].location;
            }
            if (req.files.kycPassportPicture && req.files.kycPassportPicture.length > 0) {
                kycPassportPicture = req.files.kycPassportPicture[0].location;
            }
        }
        else {
            res.status(httpStatus.BAD_REQUEST);
            return res.json({ msg: "Image is necessary: Provide Image!" });
        }

        console.log("=================>", req.body)
        // const listingPriceInBNB = req.body.listingPriceInBNB; 
        // const liquidityPercentageForPancake = req.body.liquidityPercentageForPancake;
        const launchPadFeePercentage = req.body.launchPadFeePercentage;
        let attributes = req.body.attributes;

        if (req.body.attributes) {
            attributes = JSON.parse(req.body.attributes);
        }

        const newProject = await Project.create({

            projectName: projectName,
            symbol: symbol,
            projectDescription: projectDescription,
            logoURL: logoURL,
            contractAddress: contractAddress,
            websiteLink: websiteLink,
            twitterLink: twitterLink,
            telegramlink: telegramlink,
            discrodLink: discrodLink,
            mediumLink: mediumLink,
            contactPersonName: contactPersonName,
            contactPersonEmail: contactPersonEmail,
            contactPersonWalletAddress: contactPersonWalletAddress,
            totalSupplyOfToken: totalSupplyOfToken,
            tokenDecimals: tokenDecimals,
            amountAllocatedForPresale: amountAllocatedForPresale,
            tokenPriceInBNB: tokenPriceInBNB,
            preSaleStartDateAndTime: preSaleStartDateAndTime,
            preSaleEndDateAndTime: preSaleEndDateAndTime,

            FCFSStartdate: FCFSStartdate,
            FCFSEnddate: FCFSEnddate,
            maxAllocation1: maxAllocation1,
            maxAllocation2: maxAllocation2,
            maxAllocation3: maxAllocation3,
            maxAllocation4: maxAllocation4,
            maxAllocation5: maxAllocation5,
            maxAllocation6: maxAllocation6,
            minAllocation1: minAllocation1,
            minAllocation2: minAllocation2,
            minAllocation3: minAllocation3,
            minAllocation4: minAllocation4,
            minAllocation5: minAllocation5,
            minAllocation6: minAllocation6,
            noofVesting: noofVesting,
            tier1MaxCap: tier1MaxCap,
            tier2MaxCap: tier2MaxCap,
            tier3MaxCap: tier3MaxCap,
            tier4MaxCap: tier4MaxCap,
            tier5MaxCap: tier5MaxCap,
            tier6MaxCap: tier6MaxCap,
            softCapPercentage: softCapPercentage,

            statusOfApplication: statusOfApplication,
            contractAddressDeployed: contractAddressDeployed,
            firstIterationPercentage: firstIterationPercentage,
            secondIterationPercentage: secondIterationPercentage,
            finalizeSaleDone: finalizeSaleDone,
            kycVerified: kycVerified,
            kycFirstName: kycFirstName,
            kycSecondName: kycSecondName,
            kycPassportPicture: kycPassportPicture,
            // listingPriceInBNB: listingPriceInBNB,
            // liquidityPercentageForPancake:liquidityPercentageForPancake,
            launchPadFeePercentage: launchPadFeePercentage,
            projectFee: projectFee,
            attributes: attributes
        });
        // console.log("=======================================================????", newProject);
        return res.status(200).json({ status: true, data: newProject });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};
exports.editProjectById = async (req, res, next) => {
    try {
        const _id = req.body._id;


        // console.log("################", req.body)
        // console.log("################", req.body.contractAddress)

        console.log("################", req.body._id)

        const projectName = req.body.projectName;
        const symbol = req.body.symbol;
        const projectDescription = req.body.projectDescription;
        let logoURL = '';
        const contractAddress = (req.body.contractAddress)
        const websiteLink = req.body.websiteLink;
        const twitterLink = req.body.twitterLink;
        const telegramlink = req.body.telegramlink;
        const discrodLink = req.body.discrodLink;
        const mediumLink = req.body.mediumLink;
        const contactPersonName = req.body.contactPersonName;
        const contactPersonEmail = req.body.contactPersonEmail;
        const contactPersonWalletAddress = (req.body.contactPersonWalletAddress)
        const totalSupplyOfToken = req.body.totalSupplyOfToken;
        const tokenDecimals = req.body.tokenDecimals;
        const amountAllocatedForPresale = req.body.amountAllocatedForPresale;
        const tokenPriceInBNB = req.body.tokenPriceInBNB;
        const preSaleStartDateAndTime = req.body.preSaleStartDateAndTime;
        const preSaleEndDateAndTime = req.body.preSaleEndDateAndTime;

        const FCFSStartdate = req.body.FCFSStartdate;
        const FCFSEnddate = req.body.FCFSEnddate;
        const maxAllocation1 = req.body.maxAllocation1;
        const maxAllocation2 = req.body.maxAllocation2;
        const maxAllocation3 = req.body.maxAllocation3;
        const maxAllocation4 = req.body.maxAllocation4;
        const maxAllocation5 = req.body.maxAllocation5;
        const maxAllocation6 = req.body.maxAllocation6;
        const minAllocation1 = req.body.minAllocation1;
        const minAllocation2 = req.body.minAllocation2;
        const minAllocation3 = req.body.minAllocation3;
        const minAllocation4 = req.body.minAllocation4;
        const minAllocation5 = req.body.minAllocation5;
        const minAllocation6 = req.body.minAllocation6;
        const noofVesting = req.body.noofVesting;
        const tier1MaxCap = req.body.tier1MaxCap;
        const tier2MaxCap = req.body.tier2MaxCap;
        const tier3MaxCap = req.body.tier3MaxCap;
        const tier4MaxCap = req.body.tier4MaxCap;
        const tier5MaxCap = req.body.tier5MaxCap;
        const tier6MaxCap = req.body.tier6MaxCap;
        const softCapPercentage = req.body.softCapPercentage;
        const statusOfApplication = req.body.statusOfApplication;
        const firstIterationPercentage = req.body.firstIterationPercentage;
        const secondIterationPercentage = req.body.secondIterationPercentage;
        const finalizeSaleDone = req.body.finalizeSaleDone;
        const kycVerified = req.body.kycVerified;
        const kycFirstName = req.body.kycFirstName;
        const kycSecondName = req.body.kycSecondName;
        const projectFee = req.body.projectFee;
        let kycPassportPicture = '';

        if (req.file) {
            kycPassportPicture = req.file.location
        }

        if (req.files) {

            if (req.files.logoURL && req.files.logoURL.length > 0) {
                logoURL = req.files.logoURL[0].location;
            }
            if (req.files.kycPassportPicture && req.files.kycPassportPicture.length > 0) {
                kycPassportPicture = req.files.kycPassportPicture[0].location;
            }
        }

        // console.log("=================>", req.body)
        const launchPadFeePercentage = req.body.launchPadFeePercentage;


        const updated = await Project.findOneAndUpdate({ _id: _id },
            {
                projectName: projectName,
                symbol: symbol,
                projectDescription: projectDescription,
                logoURL: logoURL,
                contractAddress: contractAddress,
                websiteLink: websiteLink,
                twitterLink: twitterLink,
                telegramlink: telegramlink,
                discrodLink: discrodLink,
                mediumLink: mediumLink,
                contactPersonName: contactPersonName,
                contactPersonEmail: contactPersonEmail,
                contactPersonWalletAddress: contactPersonWalletAddress,
                totalSupplyOfToken: totalSupplyOfToken,
                tokenDecimals: tokenDecimals,
                amountAllocatedForPresale: amountAllocatedForPresale,
                tokenPriceInBNB: tokenPriceInBNB,
                preSaleStartDateAndTime: preSaleStartDateAndTime,
                preSaleEndDateAndTime: preSaleEndDateAndTime,
                FCFSStartdate: FCFSStartdate,
                FCFSEnddate: FCFSEnddate,
                maxAllocation1: maxAllocation1,
                maxAllocation2: maxAllocation2,
                maxAllocation3: maxAllocation3,
                maxAllocation4: maxAllocation4,
                maxAllocation5: maxAllocation5,
                maxAllocation6: maxAllocation6,
                minAllocation1: minAllocation1,
                minAllocation2: minAllocation2,
                minAllocation3: minAllocation3,
                minAllocation4: minAllocation4,
                minAllocation5: minAllocation5,
                minAllocation6: minAllocation6,
                noofVesting: noofVesting,
                tier1MaxCap: tier1MaxCap,
                tier2MaxCap: tier2MaxCap,
                tier3MaxCap: tier3MaxCap,
                tier4MaxCap: tier4MaxCap,
                tier5MaxCap: tier5MaxCap,
                tier6MaxCap: tier6MaxCap,
                softCapPercentage: softCapPercentage,
                statusOfApplication: statusOfApplication,
                firstIterationPercentage: firstIterationPercentage,
                secondIterationPercentage: secondIterationPercentage,
                finalizeSaleDone: finalizeSaleDone,
                kycVerified: kycVerified,
                kycFirstName: kycFirstName,
                kycSecondName: kycSecondName,
                kycPassportPicture: kycPassportPicture,
                launchPadFeePercentage: launchPadFeePercentage,
                projectFee: projectFee,
                // attributes: attributes
            },
            { new: true });

        console.log("=========>", updated)
        return res.status(200).json({ status: true, data: updated });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

exports.deployProjectByID = async (req, res, next) => {
    try {
        const updated = await Project.findOneAndUpdate({ _id: _id }, {
            contractAddressDeployed: contractAddressDeployed,
        }, { new: true });

        return res.status(203).json({ status: true, data: updated });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}

exports.getAllProject = async (req, res, next) => {
    try {
        const result = await Project.find({});
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
}

exports.findProjectById = async (req, res, next) => {
    try {
        const _id = req.body._id;

        const result = await Project.findById({ _id: _id });
        // console.log(result);
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};


exports.deleteProjectById = async (req, res, next) => {
    try {
        const _id = req.body._id;
        const result = await Project.findOneAndRemove({ _id: _id, isDelete: true });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

exports.setSoftDeleteProjectById = async (req, res, next) => {
    try {
        const _id = req.body._id;
        const result = await Project.findOneAndUpdate({ _id: _id, statusOfApplication: "rejected" });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

exports.setNotSoftDeleteProjectById = async (req, res, next) => {
    try {
        const _id = req.body._id;
        const result = await Project.findOneAndUpdate({ _id: _id, statusOfApplication: "pending" });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

exports.setApprovedProjectById = async (req, res, next) => {
    try {
        const _id = req.body._id;
        const result = await Project.findOneAndUpdate({ _id: _id }, { statusOfApplication: "accepted", isPresale: true, statusOfProject: "open" }, { new: true });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

exports.setNotApprovedProjectById = async (req, res, next) => {
    try {
        const _id = req.body._id;
        const result = await Project.findOneAndUpdate({ _id: _id }, { statusOfApplication: "rejected", isPresale: false }, { new: true });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

exports.getApprovedProject = async (req, res, next) => {
    try {
        const result = await Project.find({ statusOfApplication: "accepted" });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

exports.getNotApprovedProject = async (req, res, next) => {
    try {
        const result = await Project.find({ statusOfApplication: "rejected" });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};


exports.getDetailOfSingleProjectById = async (req, res, next) => {
    try {
        const _id = req.body._id;
        const result = await Project.findOne({ _id: _id });
        console.log(req.body._id);
        console.log("===================>", result);
        return res.status(200).json({ status: true, data: result });

    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });

    }
};


exports.getProjectOfUser = async (req, res, next) => {
    try {
        const contactPersonWalletAddress = req.body.contactPersonWalletAddress;
        // const userEmail = req.body.userEmail;
        const result = await Project.findOne({ contactPersonWalletAddress: contactPersonWalletAddress });//.sort({ _id: -1 });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};



exports.getAllComingSoonPresaleProject = async (req, res, next) => {
    try {
        await changeStatus();
        const nowDate = new Date();
        console.log('nowData coming soon::::', nowDate)
        const result = await Project.find({ isPresale: true, statusOfApplication: "accepted", preSaleStartDateAndTime: { $gt: nowDate }, preSaleEndDateAndTime: { $gt: nowDate } });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

exports.getAllOpenProject = async (req, res, next) => {
    try {
        await changeStatus();
        const nowDate = new Date();
        console.log('nowData open project::::', nowDate)
        const result = await Project.find({ isPresale: true, statusOfApplication: "accepted", preSaleStartDateAndTime: { $lt: nowDate }, preSaleEndDateAndTime: { $gt: nowDate } });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

exports.getAllClosedProject = async (req, res, next) => {
    try {
        await changeStatus();
        const nowDate = new Date();
        console.log('nowData cloosed prooject::::', nowDate)
        const result = await Project.find({ isPresale: true, preSaleEndDateAndTime: { $lt: nowDate } });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

async function changeStatus() {
    try {
        const nowDate = new Date();
        console.log("timeeeeeeeeeeeeeee>>>>>>>>>>>>..", nowDate);
        await Project.updateMany({
            preSaleStartDateAndTime: {
                $gt: nowDate
            }
        },
            {
                statusOfProject: "coming soon",
            });
        // console.log("statusOfProject>>>>>>>>>>>>..", statusOfProject),


        await Project.updateMany({
            preSaleEndDateAndTime: {
                $lt: nowDate
            }
        },
            {
                statusOfProject: "close"
            });

        await Project.updateMany({
            preSaleStartDateAndTime: {
                $lt: nowDate
            },
            preSaleEndDateAndTime: {
                $gt: nowDate
            }
        },
            {
                statusOfProject: "open"
                //    $set:{"statusOfProject":"open"} 
            });


        return;

    } catch (error) {
        console.log("error in status changer:", error)
    }
};

exports.claimProject = async (req, res, next) => {
    try {
        const contractAddressDeployed = req.body.contractAddressDeployed;
        const account = req.body.account;

        const web3 = new Web3(provider);
        const contract = new web3.eth.Contract(abi, contractAddressDeployed);

        const numberOfVestings = parseInt(await contract.methods.numberOfVestings().call());
        let vestingPercentages = []
        let vestingUnlockTimes = []

        for (let i = 0; i < numberOfVestings; i++) {
            vestingPercentages.push(parseInt(await contract.methods.vestingPercentages(i).call()) / 10 ** 18);
            vestingUnlockTimes.push(parseInt(await contract.methods.vestingUnlockTimes(i).call()));
        }

        const buyInOneTier = parseInt(await contract.methods.buyInOneTier(account).call()) / 10 ** 18;
        const buyinTwoTier = parseInt(await contract.methods.buyInTwoTier(account).call()) / 10 ** 18;
        const buyInThreeTier = parseInt(await contract.methods.buyInThreeTier(account).call()) / 10 ** 18;
        const buyInFourTier = parseInt(await contract.methods.buyInFourTier(account).call()) / 10 ** 18;
        const buyInFiveTier = parseInt(await contract.methods.buyInFiveTier(account).call()) / 10 ** 18;
        const buyInSixTier = parseInt(await contract.methods.buyInSixTier(account).call()) / 10 ** 18;
        const buyInFCFSTier = parseInt(await contract.methods.buyInFCFSTier(account).call()) / 10 ** 18;


        const totalInvested = buyInOneTier + buyinTwoTier + buyInThreeTier + buyInFourTier + buyInFiveTier + buyInSixTier + buyInFCFSTier;
        const tokenPriceInBUSD = parseInt(await contract.methods.tokenPriceInBUSD().call()) / 10 ** 18;

        const allocation = totalInvested / tokenPriceInBUSD;

        const allocationInEachTiers = []

        for (const elem of vestingPercentages) {
            allocationInEachTiers.push((elem * allocation) / 100);
        }

        let alreadyClaimed = []
        for (let i = 0; i < numberOfVestings; i++) {
            alreadyClaimed.push(await contract.methods.alreadyClaimed(account, i).call())
        }

        let alreadyClaimedValues = []
        for (let i = 0; i < numberOfVestings; i++) {
            if (alreadyClaimed[i] == true) {
                alreadyClaimedValues.push()
            }
        }

        return res.status(200).json({
            status: true,
            data: {
                numberOfVestings: numberOfVestings,
                vestingPercentages: vestingPercentages,
                vestingUnlockTimes: vestingUnlockTimes,
                totalInvested: totalInvested,
                tokenPriceInBUSD: tokenPriceInBUSD,
                allocation: allocation,
                allocationInEachTiers: allocationInEachTiers,
                alreadyClaimed: alreadyClaimed,
                alreadyClaimedValues: alreadyClaimedValues,
            }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, error: error.message });
    }
};


exports.getAllUserProject = async (req, res, next) => {
    try {
        const result = await Project.find({ contactPersonWalletAddress: req.body.address });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};


exports.finalizeProjectStatus = async (req, res, next) => {
    try {
        const _id = req.body._id;
        const result = await Project.findOneAndUpdate({ _id: _id }, { finalizeStatus: true }, { new: true });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};