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
          .populate("agentId", "firstname lastname phone location -_id")
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
    const { typeOfHouse, province, city, price, gpsAddress, isSaleOrRent, 
        numOfBedRooms, numOfBathRooms, numOfGarages, agentId } = req.body

    const flat = new FlatModel({
        typeOfHouse, province, city, price, gpsAddress, isSaleOrRent, 
        numOfBedRooms, numOfBathRooms, numOfGarages, agentId
    })

    flat.save().then(result => {

        res.status(200).json({ message: "create successful", data: result })

    }).catch(error => console.log(error))

}



const updateFlatController = (req, res) => {
    //Update an flat
    const {id, typeOfHouse, province, city, price, gpsAddress, isSaleOrRent, 
        numOfBedRooms, numOfBathRooms, numOfGarages} = req.body 
    
     FlatModel.findById({_id: id}).then(flat => {
        if(flat){
            flat.typeOfHouse = typeOfHouse;
            flat.province = province;
            flat.city = city;
            flat.price = price;
            flat.gpsAddress = gpsAddress;
            flat.isSaleOrRent = isSaleOrRent;
            flat.numOfBedRooms = numOfBedRooms;
            flat.numOfBathRooms = numOfBathRooms;
            flat.numOfGarages = numOfGarages;

            flat.save()
            
            res.status(200)
            .json({message: "update successful", data: flat})
        }

        //res.json({message: "details cannot be found"})

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