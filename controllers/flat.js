const FlatModel = require("../models/flat")

const { validationResult } = require("express-validator")



const listFlatController = (req, res) => {
    //Finding flat by ID

    const {id} = req.params

    if(id){
        
        FlatModel.find({_id: id}).then( apartment => {
            res.status(200).json({data: apartment})
        }).catch(err => console.log(err))
    } else {
        
        //Fetching a related info of the agent

        FlatModel.find()
          .populate("userId", "firstname lastname phone location -_id")
          .then(flat => {
            res.status(200).json({ data: flat })
        }).catch(err => console.log(err))
    }
}



const createFlatController = (req, res) => {

    //Validation checks
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json({ message: errors.array()[0].msg })
    }

    //Create an flat
    const { province, city, price, years, gpsAddress, isSaleOrRent, 
        numOfBedRooms, numOfBathRooms, numOfGarages, userId } = req.body

    const flat = new FlatModel({
        province, city, price, years, gpsAddress, isSaleOrRent, 
        numOfBedRooms, numOfBathRooms, numOfGarages, userId
    })

    flat.save().then(result => {

        res.status(200).json({ message: "Create successful", data: result })

    }).catch(error => console.log(error))

}



const updateFlatController = (req, res) => {
    //Update an flat
    const {id, province, city, price, years, gpsAddress, isSaleOrRent, 
        numOfBedRooms, numOfBathRooms, numOfGarages} = req.body 
    
     FlatModel.findById({_id: id}).then(flat => {
        if(flat){
            flat.province = province;
            flat.city = city;
            flat.price = price;
            flat.years = years;
            flat.gpsAddress = gpsAddress;
            flat.isSaleOrRent = isSaleOrRent;
            flat.numOfBedRooms = numOfBedRooms;
            flat.numOfBathRooms = numOfBathRooms;
            flat.numOfGarages = numOfGarages;

            flat.save()
            
            res.status(200)
            .json({message: "Update successful", data: flat})
            
        }else{
            res.json({message: "Details cannot be found"})
        }

    }).catch(err => console.log(err))  
}



const deleteFlatController = (req, res) => {
    //delete an Apartment
    const {id} = req.body 
    
    FlatModel.findByIdAndRemove(id).then(deletedFlat => {              
        if(deletedFlat){
            res.status(200).json({message: "Flat deleted", data: deletedFlat}) 
            return
        }
        res.status(400).json({message: "Flat not found"})
    })

}



module.exports = {
    listFlatController,
    createFlatController,
    updateFlatController,
    deleteFlatController,
}