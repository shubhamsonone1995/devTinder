const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest')
const User = require("../models/user")

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id
        const toUserId = req.params.toUserId
        const status = req.params.status

        const allowedStatus = ["ignored", "interested"]
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status type: " + status })
        }
        //check is that user is available or not
        const toUser = await User.findById(toUserId)
        if (!toUser) {
            return res.status(400).json({ message: "User not found !" })
        }
        //check the connection request is already exist
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ]
        })
        if (existingConnectionRequest) {
            return res.status(400).json({ message: "Connection Request Already Exists !!" })
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const data = await connectionRequest.save()

        res.json({
            message: "Connection request send successfully!",
            data,
        })
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})
module.exports = requestRouter;