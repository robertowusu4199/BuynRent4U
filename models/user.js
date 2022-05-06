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

    phone: { 
        type: String,
        required: true,
    },

    location: { 
        type: String,
        required: true,
    },

    gps: { 
        type: String,
        required: true,
    },
    
    bio: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    resetLink: {
        data: String, 
        default: ""
    },

    apartment: [
        {
            apartmentId: {required: true, type: Schema.Types.ObjectId, ref: "Apartment"} 
        }
    ],

    flat: [
        {
            flatId: {required: true, type: Schema.Types.ObjectId, ref: "Flat"} 
        }
    ],

    villa: [
        {
            villaId: {required: true, type: Schema.Types.ObjectId, ref: "Villa"} 
        }
    ],

    Hotel: [
        {
        hotelId: {required: true, type: Schema.Types.ObjectId, ref: "Hotel"} 
        }
    ],

}, ({timeStamp: true}))

module.exports = mongoose.model("User", UserSchema)