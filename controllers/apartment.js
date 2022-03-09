const ApartmentModel = require("../models/apartment")

const { validationResult } = require("express-validator")



const listApartmentController = (req, res) => {
    //Finding apartment by ID

    const {id} = req.params

    if(id){
        
        ApartmentModel.find({_id: id}).then( apartment => {
            res.json({data: apartment})
        }).catch(err => console.log(err))
    } else {
        
        //Fetching a related info of the agent

        ApartmentModel.find()
          .populate("agentId", "firstname lastname phone location -_id")
          .then(apartment => {
            res.json({ data: apartment })
        }).catch(err => console.log(err))
    }
}



const createApartmentController = (req, res) => {

    //Validation checks
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ message: errors.array()[0].msg })
    }

    //Create an aparment
    const { typeOfHouse, province, city, price, gpsAddress, isSaleOrRent, 
        numOfBedRooms, numOfBathRooms, numOfGarages, agentId } = req.body

    const apartment = new ApartmentModel({
        typeOfHouse, province, city, price, gpsAddress, isSaleOrRent, 
        numOfBedRooms, numOfBathRooms, numOfGarages, agentId
    })

    apartment.save().then(result => {

        res.json({ message: "create successful", data: result })

    }).catch(error => console.log(error))

}



const updateApartmentController = (req, res) => {
    //Update an apartment
    const {id, typeOfHouse, province, city, price, gpsAddress, isSaleOrRent, 
        numOfBedRooms, numOfBathRooms, numOfGarages} = req.body 
    
    ApartmentModel.findById({_id: id}).then(apartment => {
        if(apartment){
            apartment.typeOfHouse = typeOfHouse;
            apartment.province = province;
            apartment.city = city;
            apartment.price = price;
            apartment.gpsAddress = gpsAddress;
            apartment.isSaleOrRent = isSaleOrRent;
            apartment.numOfBedRooms = numOfBedRooms;
            apartment.numOfBathRooms = numOfBathRooms;
            apartment.numOfGarages = numOfGarages;

            apartment.save()
            
            res.status(202)
            .json({message: "update successful", data: apartment})
        }

        //res.json({message: "details cannot be found"})

    }).catch(err => console.log(err))  
}



const deleteApartmentController = (req, res) => {
    //delete an Apartment
    const {id} = req.body 
    
    ApartmentModel.findByIdAndRemove(id).then(deletedApartment => {              
        if(deletedApartment){
            res.json({message: "Apartment deleted", data: deletedApartment}) 
            return
        }
        res.json({message: "Apartment not found"})
    })

}



module.exports = {
    listApartmentController,
    createApartmentController,
    updateApartmentController,
    deleteApartmentController,
}