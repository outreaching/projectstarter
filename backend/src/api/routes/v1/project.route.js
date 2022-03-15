const express = require('express');
const validate = require('express-validation');
const projectController = require('../../controllers/project.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const router = express.Router();
const upload = require('../../middlewares/upload');


router.route('/addProject')
     /**
          * @api {post} /v1/Project/addProject addProject
          * @apiDescription add Project
          * @apiVersion 1.0.0
          * @apiName addProject
          * @apiGroup Project
          * @apiPermission public
          * 
          * @apiParam  {String}           projectName                           projectName
          * @apiParam  {String}           symbol                                symbol
          * @apiParam  {String}           projectDescription                    projectDescription
          * @apiParam  {String}           logoURL                               logoURL
          * @apiParam  {String}           contractAddress                       contractAddress
          * @apiParam  {String}           websiteLink                            websiteLink
          * @apiParam  {String}           twitterLink                            twitterLink
          * @apiParam  {String}           telegramlink                           telegramlink
          * @apiParam  {String}           discrodLink                            discrodLink
          * @apiParam  {String}           mediumLink                             mediumLink
          * @apiParam  {String}           contactPersonName                      contactPersonName
          * @apiParam  {String}           contactPersonEmail                     contactPersonEmail
          * @apiParam  {String}           contactPersonWalletAddress             contactPersonWalletAddress
          * @apiParam  {Number}           totalSupplyOfToken                     totalSupplyOfToken
          * @apiParam  {Number}           tokenDecimals                          tokenDecimals
          * @apiParam  {Number}           amountAllocatedForPresale              amountAllocatedForPresale
          * @apiParam  {Number}           tokenPriceInBNB                        tokenPriceInBNB
          * @apiParam  {Date}             preSaleStartDateAndTime                preSaleStartDateAndTime
          * @apiParam  {Date}             preSaleEndDateAndTime                  preSaleEndDateAndTime
          * @apiParam  {String}           statusOfApplication                    statusOfApplication
          * @apiParam  {Number}           contractAddressDeployed                contractAddressDeployed
          * @apiParam  {Number}           firstIterationPercentage               firstIterationPercentage
          * @apiParam  {Number}           secondIterationPercentage              secondIterationPercentage
          * @apiParam  {Boolean}          finalizeSaleDone                       finalizeSaleDone
          * @apiParam  {Boolean}          kycVerified                            kycVerified
          * @apiParam  {String}           kycFirstName                           kycFirstName
          * @apiParam  {String}           kycSecondName                          kycSecondName
          * @apiParam  {String}           kycPassportPicture                     kycPassportPicture    
          * @apiParam  {Number}           listingPriceInBNB                      listingPriceInBNB  
          * @apiParam  {Number}           liquidityPercentageForPancake          liquidityPercentageForPancake
          * @apiParam  {Number}           launchPadFeePercentage                 launchPadFeePercentage
          * @apiParam  {Number}           projectFee                             projectFee  
          * 
          * @apiParam  {Date}             FCFSStartdate                          FCFSStartdate
          * @apiParam  {Date}             FCFSEnddate                            FCFSEnddate
          * @apiParam  {Number}           maxAllocation1                         maxAllocation1
          * @apiParam  {Number}           maxAllocation2                         maxAllocation2
          * @apiParam  {Number}           maxAllocation3                         maxAllocation3
          * @apiParam  {Number}           maxAllocation4                         maxAllocation4
          * @apiParam  {Number}           maxAllocation5                         maxAllocation5
          * @apiParam  {Number}           maxAllocation6                         maxAllocation6
          * @apiParam  {Number}           minAllocation1                         minAllocation1
          * @apiParam  {Number}           minAllocation2                         minAllocation2
          * @apiParam  {Number}           minAllocation3                         minAllocation3
          * @apiParam  {Number}           minAllocation4                         minAllocation4
          * @apiParam  {Number}           minAllocation5                         minAllocation5
          * @apiParam  {Number}           minAllocation6                         minAllocation6
          * @apiParam  {Number}           noofVesting                            noofVesting
          * @apiParam  {Number}           tier1MaxCap                            tier1MaxCap
          * @apiParam  {Number}           tier2MaxCap                            tier2MaxCap
          * @apiParam  {Number}           tier3MaxCap                            tier3MaxCap
          * @apiParam  {Number}           tier4MaxCap                            tier4MaxCap
          * @apiParam  {Number}           tier5MaxCap                            tier5MaxCap
          * @apiParam  {Number}           tier6MaxCap                            tier6MaxCap
          * @apiParam  {Number}           softCapPercentage                      softCapPercentage
          * @apiParam  {Array}            attributes                              attributes
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
               name: 'logoURL',
               maxCount: 1
          }, {
               name: "kycPassportPicture",
               maxCount: 1
          }
     ]), projectController.addProject);


router.route('/editProjectById')
     /**
          * @api {post} /v1/Project/editProjectById editProjectById
          * @apiDescription editProjectById
          * @apiVersion 1.0.0
          * @apiName editProjectById
          * @apiGroup Project
          * @apiPermission public
          * 
          * @apiParam  {String}           _id                       _id
          
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
               name: 'logoURL',
               maxCount: 1
          }, {
               name: "kycPassportPicture",
               maxCount: 1
          }
     ]), projectController.editProjectById);

router.route('/deployProjectByID')
          /**
          * @api {post} /v1/Project/deployProjectByID deployProjectByID
          * @apiDescription deployProjectByID
          * @apiVersion 1.0.0
          * @apiName deployProjectByID
          * @apiGroup Project
          * @apiPermission public
          * 
          * @apiParam  {String}           _id                       _id
          * @apiParam  {String}           contractAddressDeployed     contractAddressDeployed
          * 
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(projectController.deployProjectByID);

router.route('/getAllProject')
     /**
          * @api {post} /v1/Project/getAllProject getAllProject
          * @apiDescription getAllProject
          * @apiVersion 1.0.0
          * @apiName getAllProject
          * @apiGroup Project
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
     .post(projectController.getAllProject);

router.route('/findProjectById')
     /**
          * @api {post} /v1/Project/findProjectById findProjectById
          * @apiDescription findProjectById
          * @apiVersion 1.0.0
          * @apiName findProjectById
          * @apiGroup Project
          * @apiPermission public
          * 
          * @apiParam  {String}           _id                       _id
          * 
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(projectController.findProjectById);

router.route('/deleteProjectById')
     /**
          * @api {post} /v1/Project/deleteProjectById deleteProjectById
          * @apiDescription deleteProjectById
          * @apiVersion 1.0.0
          * @apiName deleteProjectById
          * @apiGroup Project
          * @apiPermission public
          * 
          * @apiParam  {String}           _id                       _id
          * 
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(projectController.deleteProjectById);


router.route('/setSoftDeleteProjectById')
     /**
          * @api {post} /v1/Project/setSoftDeleteProjectById setSoftDeleteProjectById
          * @apiDescription setSoftDeleteProjectById
          * @apiVersion 1.0.0
          * @apiName setSoftDeleteProjectById
          * @apiGroup Project
          * @apiPermission public
          * 
          * @apiParam  {String}           _id                       _id
          * 
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(projectController.setSoftDeleteProjectById);



router.route('/setNotSoftDeleteProjectById')
     /**
          * @api {post} /v1/Project/setNotSoftDeleteProjectById setNotSoftDeleteProjectById
          * @apiDescription setNotSoftDeleteProjectById
          * @apiVersion 1.0.0
          * @apiName setNotSoftDeleteProjectById
          * @apiGroup Project
          * @apiPermission public
          * 
          * @apiParam  {String}           _id                       _id
          * 
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(projectController.setNotSoftDeleteProjectById);




router.route('/setApprovedProjectById')
     /**
          * @api {post} /v1/Project/setApprovedProjectById setApprovedProjectById
          * @apiDescription setApprovedProjectById
          * @apiVersion 1.0.0
          * @apiName setApprovedProjectById
          * @apiGroup Project
          * @apiPermission public
          * 
          * 
          * @apiParam   {String}               _id            _id        
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(projectController.setApprovedProjectById);



router.route('/setNotApprovedProjectById')
     /**
          * @api {post} /v1/Project/setNotApprovedProjectById setNotApprovedProjectById
          * @apiDescription setNotApprovedProjectById
          * @apiVersion 1.0.0
          * @apiName setNotApprovedProjectById
          * @apiGroup Project
          * @apiPermission public
          * 
          * @apiParam {String}          _id        _id
          * 
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(projectController.setNotApprovedProjectById);



router.route('/getApprovedProject')
     /**
          * @api {post} /v1/Project/getApprovedProject getApprovedProject
          * @apiDescription getApprovedProject
          * @apiVersion 1.0.0
          * @apiName getApprovedProject
          * @apiGroup Project
          * @apiPermission public
          * 
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
     .post(projectController.getApprovedProject);

router.route('/getNotApprovedProject')
     /**
          * @api {post} /v1/Project/getNotApprovedProject getNotApprovedProject
          * @apiDescription getNotApprovedProject
          * @apiVersion 1.0.0
          * @apiName getNotApprovedProject
          * @apiGroup Project
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
     .post(projectController.getNotApprovedProject);


router.route('/getDetailOfSingleProjectById')
     /**
          * @api {post} /v1/Project/getDetailOfSingleProjectById getDetailOfSingleProjectById
          * @apiDescription getDetailOfSingleProjectById
          * @apiVersion 1.0.0
          * @apiName getDetailOfSingleProjectById
          * @apiGroup Project
          * @apiPermission public
          * 
          * @apiParam  {String}           _id                       _id
          * 
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(projectController.getDetailOfSingleProjectById);

router.route('/getProjectOfUser')
     /**
          * @api {post} /v1/Project/getProjectOfUser getProjectOfUser
          * @apiDescription getProjectOfUser
          * @apiVersion 1.0.0
          * @apiName getProjectOfUser
          * @apiGroup Project
          * @apiPermission public
          * 
          * @apiParam  {String}           _id                       _id
          
          * 
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(projectController.getProjectOfUser);


router.route('/getAllComingSoonPresaleProject')
     /**
          * @api {post} /v1/Project/getAllComingSoonPresaleProject getAllComingSoonPresaleProject
          * @apiDescription getAllComingSoonPresaleProject
          * @apiVersion 1.0.0
          * @apiName getAllComingSoonPresaleProject
          * @apiGroup Project
          * @apiPermission public
          * 
          * @apiParam  {String}           _id                       _id
          
          * 
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(projectController.getAllComingSoonPresaleProject);


router.route('/getAllOpenProject')
     /**
          * @api {get} /v1/Project/getAllOpenProject getAllOpenProject
          * @apiDescription getAllOpenProject
          * @apiVersion 1.0.0
          * @apiName getAllOpenProject
          * @apiGroup Project
          * @apiPermission public
          * 
          * @apiParam  {String}           _id                       _id
          
          * 
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(projectController.getAllOpenProject);

router.route('/getAllClosedProject')
     /**
          * @api {post} /v1/Project/getAllClosedProject getAllClosedProject
          * @apiDescription getAllClosedProject
          * @apiVersion 1.0.0
          * @apiName getAllClosedProject
          * @apiGroup Project
          * @apiPermission public
          * 
          * @apiParam  {String}           _id                       _id
          
          * 
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(projectController.getAllClosedProject);

     router.route('/claimProject')
     /**
          * @api {post} /v1/Project/claimProject claimProject
          * @apiDescription claimProject
          * @apiVersion 1.0.0
          * @apiName claimProject
          * @apiGroup Project
          * @apiPermission public
          * 
          * @apiParam  {String}           contractAddressDeployed     contractAddressDeployed
          * @apiParam  {String}           account                     account
          
          * 
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(projectController.claimProject);



     router.route('/getAllUserProject')
     /**
          * @api {post} /v1/Project/getAllUserProject getAllUserProject
          * @apiDescription getAllUserProject
          * @apiVersion 1.0.0
          * @apiName getAllUserProject
          * @apiGroup Project
          * @apiPermission public
          * 
          * @apiParam  {String}           address                       address
          * 
          * @apiSuccess (Created 200) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(projectController.getAllUserProject);

     

     router.route('/finalizeProjectStatus')
     /**
          * @api {post} /v1/Project/finalizeProjectStatus finalizeProjectStatus
          * @apiDescription finalizeProjectStatus
          * @apiVersion 1.0.0
          * @apiName finalizeProjectStatus
          * @apiGroup Project
          * @apiPermission public
          * 
          * @apiParam  {String}           _id                       _id
          * 
          * @apiSuccess (Created 201) {Object}  data      data
          * 
          *   
          * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
          * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
          * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
          * 
          */
     .post(projectController.finalizeProjectStatus);

module.exports = router;