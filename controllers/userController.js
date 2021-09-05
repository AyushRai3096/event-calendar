const userSchema = require('../models/userModel');


const createNewUser = (req, res, next) => {
    var userName = req.body.userName;
    var password = req.body.password;
    var emailId = req.body.emailId;

    //first check if email id already exists
    userSchema.findOne({ emailId })
        .then(user => {
            if (user) {
                const error = new Error("User with email already present, please login");
                error.statusCode = 409;
                next(error);
            } else {
                var newUser = new userSchema({ userName, password, emailId });
                return newUser.save()
            }
        })
        .then((createdUser) => {
            if (!createdUser) {
                next(createdUser)
            } else {
                res.send(createdUser)
            }
        }).catch((err) => {
            next(err);
        });
}

const getUserById = (req, res, next) => {
    var userId = req.params.id

    userSchema.findById(userId)
        .then((user) => {
            res.send(user)
        }).catch((err) => {
            next(err);
        });
}

exports.createNewUser = createNewUser;
exports.getUserById = getUserById;