const jwt = require('jsonwebtoken');
const User = require("../models/user")

const userAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;
        if (!token) {
            throw new Error("Token is not valid !!!!")
        }
        const decodeMessage = jwt.verify(token, 'dev@Tinder$770');
        const { _id } = decodeMessage;
        const user = await User.findById(_id)
        if (!user) {
            throw new Error("User dose not exist")
        }
        req.user = user;
        next()
    } catch (err) {
        res.status(401).send("ERROR: " + err.message)
    }

}
module.exports = {
    userAuth
};