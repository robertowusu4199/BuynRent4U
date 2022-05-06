const ApartmentModel = require("../models/apartment")

const { validationResult } = require("express-validator")



const listApartmentController = (req, res) => {
    //Finding apartment by ID

    const {id} = req.params

    if(id){
        
        ApartmentModel.find({_id: id}).then( apartment => {
            res.status(200).json({data: apartment})
        }).catch(err => console.log(err))
    } else {
        
        //Fetching a related info of the agent

        ApartmentModel.find()
          .populate("userId", "firstname lastname phone location -_id")
          .then(apartment => {
            res.status(200).json({ data: apartment })
        }).catch(err => console.log(err))
    }
}



const createApartmentController = (req, res) => {

    //Validation checks
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json({ message: errors.array()[0].msg })
    }

    //Create an aparment
    const { province, city, price, years, gpsAddress, isSaleOrRent, 
        numOfBedRooms, numOfBathRooms, numOfGarages, userId } = req.body

    const apartment = new ApartmentModel({
        province, city, price, years, gpsAddress, isSaleOrRent, 
        numOfBedRooms, numOfBathRooms, numOfGarages, userId
    })

    apartment.save().then(result => {

        res.status(200).json({ message: "Create successful", data: result })

    }).catch(error => console.log(error))

}



const updateApartmentController = (req, res) => {
    //Update an apartment
    const {id, province, city, price, years, gpsAddress, isSaleOrRent, 
        numOfBedRooms, numOfBathRooms, numOfGarages} = req.body 
    
     ApartmentModel.findById({_id: id}).then(apartment => {
        if(apartment){
            apartment.province = province;
            apartment.city = city;
            apartment.price = price;
            apartment.years = years;
            apartment.gpsAddress = gpsAddress;
            apartment.isSaleOrRent = isSaleOrRent;
            apartment.numOfBedRooms = numOfBedRooms;
            apartment.numOfBathRooms = numOfBathRooms;
            apartment.numOfGarages = numOfGarages;

            apartment.save()
            
            res.status(200)
            .json({message: "Update successful", data: apartment})

        }else{
            res.json({message: "Details cannot be found"})
        }

    }).catch(err => console.log(err))  
}



const deleteApartmentController = (req, res) => {
    //delete an Apartment
    const {id} = req.body 
    
    ApartmentModel.findByIdAndRemove(id).then(deletedApartment => {              
        if(deletedApartment){
            res.status(200).json({message: "Apartment deleted", data: deletedApartment}) 
            return
        }
        res.status(400).json({message: "Apartment not found"})
    })

}



module.exports = {
    listApartmentController,
    createApartmentController,
    updateApartmentController,
    deleteApartmentController,
}