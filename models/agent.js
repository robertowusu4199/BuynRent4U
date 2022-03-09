const mongoose = require("mongoose")

const Schema = mongoose.Schema

const AgentSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    phone: { 
        type: String,
        required: true,
    },

    location: { 
        type: String,
        required: true,
    },

    email: {
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

    apartment: [
        {
            apartmentId: {required: true, type: Schema.Types.ObjectId, ref: "Apartment"} 
        }
    ]

})

const AgentModel = mongoose.model("Agent", AgentSchema)

module.exports = AgentModel













// gender: {
//     type: String, 
//     enum: ["Male", "Female"]
// }, 

// imageUrl: { 
//     type: String, 
//     required: true, 
// },

// description: { 
//     type: String,
//     required: true,
// },