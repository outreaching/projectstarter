const express = require('express');
const validate = require('express-validation');
const kycController = require('../../controllers/kyc.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const router = express.Router();
const upload = require('../../middlewares/upload');





router.route('/addKyc')
     /**
          * @api {post} /v1/Kyc/addKyc addKyc
          * @apiDescription addKyc
          * @apiVersion 1.0.0
          * @apiName addKyc
          * @apiGroup Kyc
          * @apiPermission public
          * 
          
          * @apiParam  {String}           contractAddressDeployed                 contractAddressDeployed
          * @apiParam  {String}           walletAddress                           walletAddress
          * @apiParam  {String}           name                                    name
          * @apiParam  {String}           email                                   email
          * @apiParam  {String}           documentName                            documentName
          * @apiParam  {String}           country                                 country
          * @apiParam  {File}           kycImageFrontSide                       kycImageFrontSide
          * @apiParam  {File}           kycImageBackSide                        kycImageBackSide
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
     .post(upload.fields([
          {
               name: 'kycImageFrontSide',
               maxCount: 1
          }, {
               name: "kycImageBackSide",
               maxCount: 1
          }
     ]), kycController.addKyc);


router.route('/getAllKyc')
     /**
          * @api {get} /v1/Kyc/getAllKyc getAllKyc
          * @apiDescription getAllKyc
          * @apiVersion 1.0.0
          * @apiName getAllKyc
          * @apiGroup Kyc
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
     .get(kycController.getAllKyc);


router.route('/getDetailOfSingleKyc')
     /**
          * @api {post} /v1/Kyc/getDetailOfSingleKyc getDetailOfSingleKyc
          * @apiDescription getDetailOfSingleKyc
          * @apiVersion 1.0.0
          * @apiName getDetailOfSingleKyc
          * @apiGroup Kyc
          * @apiPermission public
          * 
          * @apiParam   {String}               walletAddress            walletAddress
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(kycController.getDetailOfSingleKyc);


router.route('/getAllApprovedKyc')
     /**
          * @api {post} /v1/Kyc/getAllApprovedKyc getAllApprovedKyc
          * @apiDescription getAllApprovedKyc
          * @apiVersion 1.0.0
          * @apiName getAllApprovedKyc
          * @apiGroup Kyc
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
     .post(kycController.getAllApprovedKyc);



router.route('/getAllNotApprovedKyc')
     /**
          * @api {post} /v1/Kyc/getAllNotApprovedKyc getAllNotApprovedKyc
          * @apiDescription getAllNotApprovedKyc
          * @apiVersion 1.0.0
          * @apiName getAllNotApprovedKyc
          * @apiGroup Kyc
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
     .post(kycController.getAllNotApprovedKyc);

router.route('/setApprovedKycByWalletAddress')
     /**
          * @api {post} /v1/Kyc/setApprovedKycByWalletAddress setApprovedKycByWalletAddress
          * @apiDescription setApprovedKycByWalletAddress
          * @apiVersion 1.0.0
          * @apiName setApprovedKycByWalletAddress
          * @apiGroup Kyc
          * @apiPermission public
          * 
          * 
          * @apiParam   {String}         walletAddress          walletAddress        
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(kycController.setApprovedKycByWalletAddress);



router.route('/setNotApprovedKycByWalletAddress')
     /**
          * @api {post} /v1/Kyc/setNotApprovedKycByWalletAddress setNotApprovedKycByWalletAddress
          * @apiDescription setNotApprovedKycWalletAddress 
          * @apiVersion 1.0.0
          * @apiName setNotApprovedKycByWalletAddress                       
          * @apiGroup Kyc
          * @apiPermission public
          * 
          * @apiParam {String}          walletAddress        walletAddress
          * 
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(kycController.setNotApprovedKycByWalletAddress);

router.route('/editKycByWalletAddress')
     /**
          * @api {post} /v1/Kyc/editKycByWalletAddress editKycByWalletAddress                  
          * @apiDescription editKycByWalletAddress
          * @apiVersion 1.0.0
          * @apiName editKycByWalletAddress
          * @apiGroup Kyc
          * @apiPermission public
          * 
          * @apiParam  {String}      walletAddress                 walletAddress
          * @apiParam  {String}           name                                    name
          * @apiParam  {String}           email                                   email
          * @apiParam  {String}           documentName                            documentName
          * @apiParam  {String}           country                                 country
          * @apiParam  {File}           kycImageFrontSide                       kycImageFrontSide
          * @apiParam  {File}           kycImageBackSide                        kycImageBackSide
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
     .post(upload.fields([
          {
               name: 'kycImageFrontSide',
               maxCount: 1
          }, {
               name: "kycImageBackSide",
               maxCount: 1
          }
     ]), kycController.editKycByWalletAddress);

router.route('/getKycOfUser')
     /**
          * @api {post} /v1/Kyc/getKycOfUser getKycOfUser
          * @apiDescription getKycOfUser
          * @apiVersion 1.0.0
          * @apiName getKycOfUser
          * @apiGroup Kyc
          * @apiPermission public
          * 
          * @apiParam  {String}           walletAddress              walletAddress
          * 
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(kycController.getKycOfUser);

     router.route('/verifyKyc')
     /**
          * @api {post} /v1/Kyc/verifyKyc verifyKyc
          * @apiDescription verifyKyc
          * @apiVersion 1.0.0
          * @apiName verifyKyc
          * @apiGroup Kyc
          * @apiPermission public
          * 
          * @apiParam  {String}           walletAddress              walletAddress
          * 
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(kycController.verifyKyc);


     router.route('/notVerifyKyc')
     /**
          * @api {post} /v1/Kyc/notVerifyKyc notVerifyKyc
          * @apiDescription notVerifyKyc
          * @apiVersion 1.0.0
          * @apiName notVerifyKyc
          * @apiGroup Kyc
          * @apiPermission public
          * 
          * @apiParam  {String}           walletAddress              walletAddress
          * 
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(kycController.notVerifyKyc);


module.exports = router;