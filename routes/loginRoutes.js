const express = require('express')

//import controllers
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');

const loginRouter = express.Router();

loginRouter.post("/", loginController.login)

module.exports = loginRouter;