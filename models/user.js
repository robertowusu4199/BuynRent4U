const mongoose = require("mongoose")

const crypto = require("crypto")

const Schema = mongoose.Schema


const UserSchema = new Schema ({
    firstname: {
        type: String,
        required: true,
        max: 20,
    },

    lastname: {
        type: String,
        required: true,
        max: 20,
    },

    gender: {
        type: String, 
        required: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    resetLink: {
        data: String, 
        default: ""
    },

    agents: [ 
        {
            id: {type: Schema.Types.ObjectId,ref: "Apartment",}
        }
    ]

}, ({timeStamp: true}))

module.exports = mongoose.model("User", UserSchema)