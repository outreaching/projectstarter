const lotteryController = require('../../controllers/lottery.controller');
const express = require('express');
const validate = require('express-validation');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const router = express.Router();
const upload = require('../../middlewares/upload');





router.route('/addLottery')
     /**
          * @api {post} /v1/Lottery/addLottery addLottery
          * @apiDescription addLottery
          * @apiVersion 1.0.0
          * @apiName addLottery
          * @apiGroup Lottery
          * @apiPermission public
          * 
          * 
          * @apiParam  {String}           contractAddressDeployed                 contractAddressDeployed
          * 
          * 
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(lotteryController.addLottery);

     
router.route('/getLottery')
/**
     * @api {get} /v1/Lottery/getLottery getLottery
     * @apiDescription getLottery
     * @apiVersion 1.0.0
     * @apiName getLottery
     * @apiGroup Lottery
     * @apiPermission public
     * 
     * 
     * @apiSuccess (Created 201) {Object}  data      data
     * 
     *   
     * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
     * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
     * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
     * 
     */
.get(lotteryController.getLottery);


router.route('/getLotteryStatus')
/**
     * @api {post} /v1/Lottery/getLotteryStatus getLotteryStatus
     * @apiDescription getLotteryStatus
     * @apiVersion 1.0.0
     * @apiName getLotteryStatus
     * @apiGroup Lottery
     * @apiPermission public
     * 
     * @apiParam  {String}           contractAddressDeployed    contractAddressDeployed
     * @apiParam  {String}           walletAddress              walletAddress
     * 
     * 
     * @apiSuccess (Created 201) {Object}  data      data
     * 
     *   
     * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
     * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
     * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
     * 
     */
.post(lotteryController.getLotteryStatus);


module.exports = router;