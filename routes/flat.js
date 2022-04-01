const express = require("express")

const FlatModel = require ("../models/flat")

const router = express.Router()

const {body} = require("express-validator")

const {createFlatController, listFlatController, 
updateFlatController, deleteFlatController} = require ("../controllers/flat")



//Routes


//List of all flats and of id
router.get("/flats/:id?", listFlatController)



//Create
router.post("/flat", [                 
    body("typeOfHouse").trim().not().isEmpty().withMessage("typeOfHouse cannot be empty"),
    body("province").trim().not().isEmpty().withMessage("Province cannot be empty"),
    body("city").trim().not().isEmpty().withMessage("City cannot be empty"),
    body("price").trim().not().isEmpty().withMessage("Price cannot be empty"),
    body("gpsAddress").trim().not().isEmpty().withMessage("GPS Address cannot be empty"),
    body("isSaleOrRent").trim().not().isEmpty().withMessage("IsSaleOrRent cannot be empty"),    
    body("numOfBedRooms").trim().not().isEmpty().withMessage("NumOfBedRooms cannot be empty"),    
    body("numOfBathRooms").trim().not().isEmpty().withMessage("NumOfBathRooms cannot be empty"),    
    body("numOfGarages").trim().not().isEmpty().withMessage("NumOfGarages cannot be empty"),
    body("agentId").trim().not().isEmpty().withMessage("AgentId cannot be empty"),    
],           
createFlatController)



//Update
router.put('/updateFlat',[
    body("typeOfHouse").trim().not().isEmpty().withMessage("typeOfHouse cannot be empty"),
    body("province").trim().not().isEmpty().withMessage("Province cannot be empty"),
    body("city").trim().not().isEmpty().withMessage("City cannot be empty"),
    body("price").trim().not().isEmpty().withMessage("Price cannot be empty"),
    body("gpsAddress").trim().not().isEmpty().withMessage("GPS Address cannot be empty"),
    body("isSaleOrRent").trim().not().isEmpty().withMessage("IsSaleOrRent cannot be empty"),    
    body("numOfBedRooms").trim().not().isEmpty().withMessage("NumOfBedRooms cannot be empty"),    
    body("numOfBathRooms").trim().not().isEmpty().withMessage("NumOfBathRooms cannot be empty"),    
    body("numOfGarages").trim().not().isEmpty().withMessage("NumOfGarages cannot be empty"),
],
updateFlatController)


  
//Delete
router.delete("/deleteFlat", deleteFlatController)  



module.exports = router