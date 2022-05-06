const HotelModel = require("../models/hotel")

const { validationResult } = require("express-validator")

const dotenv = require('dotenv');
dotenv.config();



const listHotelController = (req, res) => {
    //Finding flat by ID

    const {id} = req.params

    if(id){
        
        HotelModel.find({_id: id}).then( hotel => {
            res.status(200).json({data: hotel})
        }).catch(err => console.log(err))
    } else {
        
        //Fetching a related info of the agent

        HotelModel.find()
          .populate("userId", "firstname lastname phone location -_id")
          .then(hotel => {
            res.status(200).json({ data: hotel })
        }).catch(err => console.log(err))
    }
}



const createHotelController = (req, res) => {

     //Validation checks
     const errors = validationResult(req)
     if (!errors.isEmpty()) {
         console.log(errors)
         return res.status(400).json({ message: errors.array()[0].msg })
     }
 
     //Create an flat
     const { province, city, priceForNight, priceForDay, gpsAddress, userId } = req.body
 
     const hotel = new HotelModel({
        province, city, priceForNight, priceForDay, gpsAddress, userId
     })
 
     hotel.save().then(result => {
 
         res.status(200).json({ message: "Create successful", data: result })
 
     }).catch(error => console.log(error))
    

}



const updateHotelController = (req, res) => {
    //Update an hotel
    const {id, province, city, priceForNight, priceForDay, gpsAddress} = req.body 
    
     HotelModel.findById({_id: id}).then(hotel => {
        if(hotel){
            hotel.province = province;
            hotel.city = city;
            hotel.priceForNight = priceForNight;
            hotel.priceForDay = priceForDay;
            hotel.gpsAddress = gpsAddress;

            hotel.save()
            
            res.status(200)
            .json({message: "Update successful", data: hotel})
            
        }else{
            res.json({message: "Details cannot be found"})
        }

    }).catch(err => console.log(err))  
}



const deleteHotelController = (req, res) => {
    //delete an Apartment
    const {id} = req.body 
    
    HotelModel.findByIdAndRemove(id).then(deletedHotel => {              
        if(deletedHotel){
            res.status(200).json({message: "Hotel deleted", data: deletedHotel}) 
            return
        }
        res.status(400).json({message: "Hotel not found"})
    })

}



module.exports = {
    listHotelController,
    createHotelController,
    updateHotelController,
    deleteHotelController,
}