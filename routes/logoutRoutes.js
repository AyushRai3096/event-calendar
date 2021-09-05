const express = require('express')
const auth = require('../helpers/auth');

//import controllers
const logoutController = require('../controllers/logoutController');
const userController = require('../controllers/userController');

const logoutRouter = express.Router();

logoutRouter.post("/", auth, logoutController.logout)

module.exports = logoutRouter;