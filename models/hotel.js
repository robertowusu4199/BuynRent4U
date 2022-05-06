const mongoose = require("mongoose")

const Schema = mongoose.Schema

const HotelSchema = new Schema({

    province: {
        type: String, 
        required: true,
    },

    city: {
        type: String,
        required: true,
    },
  
    priceForNight: {
        type: Number,
        required: true,
    },
  
    priceForDay: {
        type: Number,
        required: true,
    },

    gpsAddress: {
        type: String,
        required: true
    },
    
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },


})

const HotelModel = mongoose.model("Hotel", HotelSchema)

module.exports = HotelModel