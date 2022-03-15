const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const projectRoutes = require('./project.route');
const kycRoutes = require('./kyc.route');
const lotteryRoutes = require('./lottery.route')
const participatedRoutes = require('./participated.route');
const stakedRoutes = require('./staked.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/project', projectRoutes);
router.use('/kyc', kycRoutes);
router.use('/lottery' , lotteryRoutes);
router.use('/participated', participatedRoutes);
router.use('staked', stakedRoutes);

module.exports = router;
