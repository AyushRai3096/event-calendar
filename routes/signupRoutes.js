const express = require('express')

//import controllers
const signupController = require('../controllers/signupController');
const userController = require('../controllers/userController');

const signupRouter = express.Router();

signupRouter.post("/", signupController.signup, userController.createNewUser)

module.exports = signupRouter;