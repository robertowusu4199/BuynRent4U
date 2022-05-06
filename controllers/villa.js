const VillaModel = require("../models/villa")

const { validationResult } = require("express-validator")



const listVillaController = (req, res) => {
    //Finding villa by ID

    const {id} = req.params

    if(id){
        
        VillaModel.find({_id: id}).then( villa => {
            res.status(200).json({data: villa})
        }).catch(err => console.log(err))
    } else {
        
        //Fetching a related info of the agent

        VillaModel.find()
          .populate("userId", "firstname lastname phone location -_id")
          .then(villa => {
            res.status(200).json({ data: villa })
        }).catch(err => console.log(err))
    }
}



const createVillaController = (req, res) => {

    //Validation checks
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json({ message: errors.array()[0].msg })
    }

    //Create an villa
    const { province, city, price, years, gpsAddress, isSaleOrRent, 
        numOfBedRooms, numOfBathRooms, numOfGarages, userId } = req.body

    const villa = new VillaModel({
        province, city, price, years, gpsAddress, isSaleOrRent, 
        numOfBedRooms, numOfBathRooms, numOfGarages, userId
    })

    villa.save().then(result => {

        res.status(200).json({ message: "Create successful", data: result })

    }).catch(error => console.log(error))

}



const updateVillaController = (req, res) => {
    //Update an flat
    const {id, province, city, price, years, gpsAddress, isSaleOrRent, 
        numOfBedRooms, numOfBathRooms, numOfGarages} = req.body 
    
     VillaModel.findById({_id: id}).then(villa => {
        if(villa){
            villa.province = province;
            villa.city = city;
            villa.price = price;
            villa.years = years;
            villa.gpsAddress = gpsAddress;
            villa.isSaleOrRent = isSaleOrRent;
            villa.numOfBedRooms = numOfBedRooms;
            villa.numOfBathRooms = numOfBathRooms;
            villa.numOfGarages = numOfGarages;

            villa.save()
            
            res.status(200)
            .json({message: "Update successful", data: villa})

        }else{
            res.json({message: "Details cannot be found"})
        }

    }).catch(err => console.log(err))  
}



const deleteVillaController = (req, res) => {
    //delete an Apartment
    const {id} = req.body 
    
    VillaModel.findByIdAndRemove(id).then(deletedVilla => {              
        if(deletedVilla){
            res.status(200).json({message: "Villa deleted", data: deletedVilla}) 
            return
        }
        res.status(400).json({message: "Villa not found"})
    })

}



module.exports = {
    listVillaController,
    createVillaController,
    updateVillaController,
    deleteVillaController,
}