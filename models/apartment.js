const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ApartmentSchema = new Schema({
    
    typeOfHouse: {
        type: String,
        required: true,
    },

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

    agentId: {
        type: Schema.Types.ObjectId,
        ref: "Agent",
        required: true,
    }

})

const ApartmentModel = mongoose.model("Apartment", ApartmentSchema)

module.exports = ApartmentModel