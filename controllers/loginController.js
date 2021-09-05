const bcrypt = require('bcryptjs');
const userSchema = require('../models/userModel');
const jwt = require('jsonwebtoken');

const login = (req, res, next) => {
    var emailId = req.body.emailId;
    var password = req.body.password;
    var fetchedUser;
    var userPassword; //password saved in db

    userSchema.findOne({ emailId })
        .then(user => {
            if (!user) {
                const error = new Error("User with email id not found, please sign up first");
                error.statusCode = 404;
                error.message = "User with email id not found, please sign up first";
                next(error);
            } else {
                fetchedUser = user;
                userPassword = user.password;
                return bcrypt.compare(password, userPassword)
            }
        })
        .then(isPasswordCorrect => {
            if (!isPasswordCorrect) {
                const error = new Error("Login failed: Incorrect Password");
                error.statusCode = 403;
                error.message = "Login failed: Incorrect Password";
                next(error);
            } else {
                //generate a jwt token
                const token = jwt.sign({
                    emailId: fetchedUser.emailId,
                    userId: fetchedUser._id
                }, "SecretKey");
                res.send({
                    status: "Login success",
                    token,
                    userId: fetchedUser._id
                });
            }
        })
        .catch(err => {
            next(err);
        });
}

exports.login = login;