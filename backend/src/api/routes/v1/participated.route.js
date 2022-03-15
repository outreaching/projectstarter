const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/participated.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const router = express.Router();

module.exports = router;