const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.get('authorization');
    if(!authHeader) {
        var error = new Error('No auth token attached');
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(" ")[1];
    var decodedToken;
    try {
        decodedToken = jwt.verify(token, "SecretKey");
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    if(!decodedToken) {
        const error = new Error("Not Authorized");
        error.statusCode = 401;
        throw error;
    } else {
        req.userId = decodedToken.userId;
        next();
    }
}

module.exports = verifyToken;