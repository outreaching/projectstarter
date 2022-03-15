const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../models/user.model');
const Kyc = require('../models/kyc.model');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const user = await User.get(id);
    req.locals = { user };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get user
 * @public
 */
exports.get = (req, res) => res.json(req.locals.user.transform());

/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = (req, res) => res.json(req.user.transform());

/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Replace existing user
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { user } = req.locals;
    const newUser = new User(req.body);
    const ommitRole = user.role !== 'admin' ? 'role' : '';
    const newUserObject = omit(newUser.toObject(), '_id', ommitRole);

    await user.updateOne(newUserObject, { override: true, upsert: true });
    const savedUser = await User.findById(user._id);

    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Update existing user
 * @public
 */
exports.update = (req, res, next) => {
  const ommitRole = req.locals.user.role !== 'admin' ? 'role' : '';
  const updatedUser = omit(req.body, ommitRole);
  const user = Object.assign(req.locals.user, updatedUser);

  user.save()
    .then((savedUser) => res.json(savedUser.transform()))
    .catch((e) => next(User.checkDuplicateEmail(e)));
};

/**
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const users = await User.list(req.query);
    const transformedUsers = users.map((user) => user.transform());
    res.json(transformedUsers);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 * @public
 */
exports.remove = (req, res, next) => {
  const { user } = req.locals;

  user.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e) => next(e));
};


exports.blockpassApi = async (req, res, next) => {
  try {
    const request = req.body;
    console.log('in blockpass api REQ.REQUEST:::::', request);

    if (request.event === "user.created") {
      // mongo create user
      await Kyc.create({
        walletAddress: request.refId,
        statusOfApplication: "pending",
        responseFromBlockPass: "created",
      });
    }
    else if (request.event === "review.approved") {
      await Kyc.findOneAndUpdate({ walletAddress: request.refId }, { 
        statusOfApplication: "approved",
        responseFromBlockPass: "approved",
       }, { new: true }
      );
      // mongo update status waiting
    }
    else if (request.event === "review.rejected") {
      // mongo update status approved 
      await Kyc.findOneAndUpdate({ walletAddress: request.refId }, { 
        statusOfApplication: "rejected",
        responseFromBlockPass: "rejected",
       }, { new: true }
      );
    }
    else if (request.event === "user.blocked") {
      // mongo update status blocked
      await Kyc.findOneAndUpdate({ walletAddress: request.refId }, { 
        statusOfApplication: "blocked",
        responseFromBlockPass: "blocked",
       }, { new: true }
      );
    }

    return res.status(200).json({ msg: "success" });
  } catch (error) {
    console.log('erroor::::', error)
    return res.status(500).json({ msg: error.message });
  }
};