const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
    },
    lastName: {
        type: String,
        minLength: 4,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: (value) => {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address: " + value)
            }
        }
    },
    passward: {
        type: String,
        required: true,
         validate: (value) => {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Please enter a strong passward: " + value)
            }
        }
    },
    age: {
        type: String
    },
    gender: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)
