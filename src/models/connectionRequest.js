const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId
    },
    status: {
        type: String,
        enum: {
            values: ["ignored", "interested", "accepeted", "rejected"],
            message: `{value} is incorrect status type`
        }
    }
}, { timestamps: true })

//pre method is always call before save
connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    //check if the fromUserid is same as toUserId
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error(" Cannot send connection request to yourself!")
    }
    next();
})

const connectionRequestModel = new mongoose.model(
    'ConnectionRequest', connectionRequestSchema
)
module.exports = connectionRequestModel;