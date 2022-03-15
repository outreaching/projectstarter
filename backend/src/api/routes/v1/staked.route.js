const express = require('express');
const validate = require('express-validation');
const stakedController = require('../../controllers/staked.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const router = express.Router();
const upload = require('../../middlewares/upload');

module.exports = router;