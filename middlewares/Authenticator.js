const jwt = require('jsonwebtoken');
require('dotenv').config();

const Authenticator = async (req, res, next) => {
    // try {
    //     let token = req.headers.authorization;
    //     if (token) {
    //         token = req.headers.authorization.split(' ')[1];
    //     } else {
    //         return res.status(400).json({ msg: "User is not authorized." });
    //     }
    //     const validToken = await jwt.verify(token, process.env.JWT_KEY);
    //     if (validToken) {
    //         req.body.userId = validToken.userId;
    //     } else {
    //         return res.status(400).json({ msg: "User is not authorized." });
    //     }
    // } catch (error) {
    //     console.log(error);
    //     return res.status(400).json({ msg: "Something is wrong." });
    // }

    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, "hello", (err, decoded) => {
            if (decoded) {
                req.body.author = decoded.userId;
                next();
            } else {
                res.send({ msg: "Please login first" });
            }
        });
    } else {
        res.send({ msg: "please login first" });
    }
}
module.exports = { Authenticator };