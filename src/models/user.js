const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

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
    password: {
        type: String,
        required: true,
        validate: (value) => {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Please enter a strong password: " + value)
            }
        }
    },
    age: {
        type: String
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'others']
        },
        validate: (value) => {
            if (!['male', 'female', 'others'].includes(value)) {
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl: {
        type: String,
        validate: (value) => {
            if (!validator.isURL(value)) {
                throw new Error("Invalid Photo URL: " + value)
            }
        }
    },
    about: {
        type: String,

    },
    skills: {
        type: [String]
    },
}, { timestamps: true });

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, 'dev@Tinder$770', { expiresIn: '1d' });

    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwardHash = user.password

    const isPasswardValid = await bcrypt.compare(passwordInputByUser, passwardHash)
    return isPasswardValid;
}

module.exports = mongoose.model('User', userSchema)
