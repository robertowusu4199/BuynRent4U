const mongoose = require("mongoose")

const crypto = require("crypto")

const Schema = mongoose.Schema


const GuserSchema = new Schema ({
    googleId: {
        type: String,
        required: true
    },

    name: {
        type: String, 
        required: true
    },

    photos: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("Guser", GuserSchema)