var mongoose = require('mongoose');
const userSchema = require('../models/userModel');

const logout = (req, res, next) => {
    var userId = req.query.userId;
    userId = mongoose.Types.ObjectId(userId);

    userSchema.findById(userId)
        .then((user) => {
            if (!user) {
                const error = new Error("User not found");
                error.statusCode = 404;
                error.message = "User not found";
                next(error);
            }
            else {
                res.send({ message: "Successfully logged out" })
            }
        }).catch((err) => {
            next(err);
        });
}

exports.logout = logout;