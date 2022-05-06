const express = require("express")

const ApartmentModel = require ("../models/apartment")

const router = express.Router()

const {body} = require("express-validator")

const {createApartmentController, listApartmentController, 
  updateApartmentController, deleteApartmentController} = require ("../controllers/apartment")


//Routes


//List of all apartments and of id
router.get("/apartments/:id?", listApartmentController)



//Create
router.post("/apartment", [                 
  body("province").trim().not().isEmpty().withMessage("Province cannot be empty"),
  body("city").trim().not().isEmpty().withMessage("City cannot be empty"),
  body("price").trim().not().isEmpty().withMessage("Price cannot be empty"),
  body("years").trim().not().isEmpty().withMessage("Years cannot be empty"),
  body("gpsAddress").trim().not().isEmpty().withMessage("GPS Address cannot be empty"),
  body("isSaleOrRent").trim().not().isEmpty().withMessage("IsSaleOrRent cannot be empty"),    
  body("numOfBedRooms").trim().not().isEmpty().withMessage("NumOfBedRooms cannot be empty"),    
  body("numOfBathRooms").trim().not().isEmpty().withMessage("NumOfBathRooms cannot be empty"),    
  body("numOfGarages").trim().not().isEmpty().withMessage("NumOfGarages cannot be empty"),
  body("userId").trim().not().isEmpty().withMessage("userId cannot be empty"),    
],           
createApartmentController)



//Update
router.put('/updateApartment',[
  body("province").trim().not().isEmpty().withMessage("Province cannot be empty"),
  body("city").trim().not().isEmpty().withMessage("City cannot be empty"),
  body("price").trim().not().isEmpty().withMessage("Price cannot be empty"),
  body("years").trim().not().isEmpty().withMessage("Years cannot be empty"),
  body("gpsAddress").trim().not().isEmpty().withMessage("GPS Address cannot be empty"),
  body("isSaleOrRent").trim().not().isEmpty().withMessage("IsSaleOrRent cannot be empty"),    
  body("numOfBedRooms").trim().not().isEmpty().withMessage("NumOfBedRooms cannot be empty"),    
  body("numOfBathRooms").trim().not().isEmpty().withMessage("NumOfBathRooms cannot be empty"),    
  body("numOfGarages").trim().not().isEmpty().withMessage("NumOfGarages cannot be empty"),
],
updateApartmentController)



//Delete
router.delete("/deleteapartment", deleteApartmentController)



module.exports = router