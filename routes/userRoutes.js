const express = require('express');
const auth = require('../helpers/auth');

//import controllers
const userController = require('../controllers/userController');

const newUserRouter = express.Router();

newUserRouter.get("/:id", auth, userController.getUserById)
newUserRouter.post("/", auth, userController.createNewUser)

module.exports = newUserRouter;
