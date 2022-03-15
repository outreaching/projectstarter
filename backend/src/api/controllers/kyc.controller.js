const httpStatus = require('http-status');
const { omit, update } = require('lodash');
const Kyc = require('../models/kyc.model');
// const ws = require('ws');
// const socket = require('webSocket');
const WebSocket = require('ws');
// const { port, env } = require('./config/vars');
// // const { port, env } = require('./config/vars');



exports.addKyc = async (req, res, nex) => {
    try {

        const contractAddressDeployed = (req.body.contractAddressDeployed).toLowerCase();
        const walletAddress = (req.body.walletAddress).toLowerCase();
        const name = req.body.name;
        const email = req.body.email;
        const country = req.body.country;
        const documentName = req.body.documentName;
        let kycImageFrontSide = '';
        let kycImageBackSide = '';

        if (req.file) {
            kycImageBackSide = req.file.location
        }

        if (req.files) {

            if (req.files.kycImageFrontSide && req.files.kycImageFrontSide.length > 0) {
                kycImageFrontSide = req.files.kycImageFrontSide[0].location;
            }
            if (req.files.kycImageBackSide && req.files.kycImageBackSide.length > 0) {
                kycImageBackSide = req.files.kycImageBackSide[0].location;
            }
        }
        else {
            res.status(httpStatus.BAD_REQUEST);
            return res.json({ msg: "Image is necessary: Provide Image!" });
        }

        const newKyc = await Kyc.create({
            contractAddressDeployed: contractAddressDeployed,
            walletAddress: walletAddress,
            name: name,
            email: email,
            country: country,
            documentName: documentName,
            kycImageFrontSide: kycImageFrontSide,
            kycImageBackSide: kycImageBackSide,

        });
        return res.status(200).json({ status: true, data: newKyc });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};


exports.editKycByWalletAddress = async (req, res, next) => {
    try {
        const walletAddress = (req.body.walletAddress).toLowerCase();
        // const _id = req.body._id;
        const updatedd = req.body;
        const contractAddressDeployed = (req.body.contractAddressDeployed).toLowerCase();
        const name = req.body.name;
        const email = req.body.email;
        const country = req.body.country;
        const documentName = req.body.documentName;
        let kycImageFrontSide = '';
        let kycImageBackSide = '';
        let statusOfApplication = req.body.statusOfApplication;

        if (req.file) {
            kycImageBackSide = req.file.location
        }

        if (req.files) {

            if (req.files.kycImageFrontSide && req.files.kycImageFrontSide.length > 0) {
                kycImageFrontSide = req.files.kycImageFrontSide[0].location;
            }
            if (req.files.kycImageBackSide && req.files.kycImageBackSide.length > 0) {
                kycImageBackSide = req.files.kycImageBackSide[0].location;
            }
        }
        else {
            res.status(httpStatus.BAD_REQUEST);
            return res.json({ msg: "Image is necessary: Provide Image!" });
        }

        console.log("conso####", walletAddress);
        const conso = await Kyc.find({ walletAddress: walletAddress });

        console.log("conso$$$$", conso);

        const updated = await Kyc.findOneAndUpdate({ walletAddress: walletAddress },
            {
                contractAddressDeployed: contractAddressDeployed,
                name: name,
                email: email,
                country: country,
                documentName: documentName,
                kycImageFrontSide: kycImageFrontSide,
                kycImageBackSide: kycImageBackSide,
                statusOfApplication: statusOfApplication,
            },
            { new: true });
        return res.status(200).json({ status: true, data: conso });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

// this API is not used for editing KYC.

exports.updateKycByWalletAddress = async (req, res, next) => {
    try {
        const _id = req.body._id;
        const contractAddressDeployed = (req.body.contractAddressDeployed).toLowerCase();
        const walletAddress = (req.body.walletAddress).toLowerCase();
        const name = req.body.name;
        const email = req.body.email;
        const country = req.body.country;
        const documentName = req.body.documentName;
        let kycImageFrontSide = '';
        let kycImageBackSide = '';

        if (req.file) {
            kycImageBackSide = req.file.location
        }

        if (req.files) {

            if (req.files.kycImageFrontSide && req.files.kycImageFrontSide.length > 0) {
                kycImageFrontSide = req.files.kycImageFrontSide[0].location;
            }
            if (req.files.kycImageBackSide && req.files.kycImageBackSide.length > 0) {
                kycImageBackSide = req.files.kycImageBackSide[0].location;
            }
        }

        const updated = await Kyc.findOneAndUpdate({
            _id: _id
        },
            [
                {
                    "set": {
                        "status": {
                            "$cond": {
                                if: {
                                    $eq: [
                                        "statusOfApplication", "rejected"
                                    ]
                                },
                                then: {
                                    contractAddressDeployed: contractAddressDeployed,
                                    walletAddress: walletAddress,
                                    name: name,
                                    email: email,
                                    country: country,
                                    documentName: documentName,
                                    kycImageFrontSide: kycImageFrontSide,
                                    kycImageBackSide: kycImageBackSide,
                                }, else: "Not allow to edit until Admin response"
                            }
                        }
                    }
                }
            ],
            { new: true });
        return res.status(200).json({ status: true, data: updated });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

exports.getAllKyc = async (req, res, next) => {
    try {
        const result = await Kyc.find({});
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

exports.getDetailOfSingleKyc = async (req, res, next) => {
    try {
        console.log(req.body);
        const walletAddress = (req.body.walletAddress).toLowerCase();
        // const _id = req.body._id;
        const result = await Kyc.findOne({ walletAddress: walletAddress });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};


exports.getAllApprovedKyc = async (req, res, next) => {
    try {
        const result = await Kyc.find({ statusOfApplication: "accepted" });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

exports.getAllNotApprovedKyc = async (req, res, next) => {
    try {
        const result = await Kyc.find({ statusOfApplication: "rejected" });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

exports.setApprovedKycByWalletAddress = async (req, res, next) => {
    try {
        const walletAddress = (req.body.walletAddress).toLowerCase();
        // const _id = req.body._id;
        const result = await Kyc.findOneAndUpdate({ walletAddress: walletAddress }, { statusOfApplication: "accepted" }, { new: true });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

exports.setNotApprovedKycByWalletAddress = async (req, res, next) => {
    try {
        const walletAddress = (req.body.walletAddress).toLowerCase();
        // const _id = req.body._id;
        const result = await Kyc.findOneAndUpdate({ walletAddress: walletAddress }, { statusOfApplication: "rejected" }, { new: true });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

exports.getKycOfUser = async (req, res, next) => {
    try {
        const walletAddress = (req.body.walletAddress).toLowerCase();
        // const userEmail = req.body.userEmail;
        const result = await Kyc.findOne({ walletAddress: walletAddress });//.sort({ _id: -1 });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

exports.verifyKyc = async (req, res, next) => {
    try {
        const walletAddress = (req.body.walletAddress).toLowerCase();
        // const userEmail = req.body.userEmail;
        const result = await Kyc.findOneAndUpdate({ walletAddress: walletAddress }, { responseFromBlockPass: true });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

exports.notVerifyKyc = async (req, res, next) => {
    try {
        const walletAddress = (req.body.walletAddress).toLowerCase();
        // const userEmail = req.body.userEmail;
        const result = await Kyc.findOneAndUpdate({ walletAddress: walletAddress }, { responseFromBlockPass: false });
        return res.status(200).json({ status: true, data: result });
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

