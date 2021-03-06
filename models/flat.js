const mongoose = require("mongoose")

const Schema = mongoose.Schema

const FlatSchema = new Schema({

    province: {
        type: String, 
        required: true,
    },

    city: {
        type: String,
        required: true,
    },
  
    price: {
        type: Number,
        required: true,
    },

    years: {
        type: Number,
        required: true,
    },

    gpsAddress: {
        type: String,
        required: true
    },

    isSaleOrRent: {
        type: String,
        required: true,
    },

    numOfBedRooms: {
        type: String,
        required: true,
    },
        
    numOfBathRooms: {
        type: String,
        required: true,
    },

    numOfGarages: {
        type: Number,
        required: true,
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

})

const FlatModel = mongoose.model("Flat", FlatSchema)

module.exports = FlatModel