const express = require("express")

const router = express.Router()

const {body} = require("express-validator")

const {createHotelController, listHotelController, 
updateHotelController, deleteHotelController} = require ("../controllers/hotel")



//Routes


//List of all flats and of id
router.get("/hotels/:id?", listHotelController)



//Create
router.post("/hotel",[            
    body("province").trim().not().isEmpty().withMessage("Province cannot be empty"),
    body("city").trim().not().isEmpty().withMessage("City cannot be empty"),
    body("priceForNight").trim().not().isEmpty().withMessage("Price cannot be empty"),
    body("priceForDay").trim().not().isEmpty().withMessage("Price cannot be empty"),
    body("gpsAddress").trim().not().isEmpty().withMessage("GPS Address cannot be empty"),
    body("userId").trim().not().isEmpty().withMessage("AgentId cannot be empty"),    
],
createHotelController)



//Update
router.put('/hotelupdate',[
    body("province").trim().not().isEmpty().withMessage("Province cannot be empty"),
    body("city").trim().not().isEmpty().withMessage("City cannot be empty"),
    body("priceForNight").trim().not().isEmpty().withMessage("Price cannot be empty"),
    body("priceForDay").trim().not().isEmpty().withMessage("Price cannot be empty"),
    body("gpsAddress").trim().not().isEmpty().withMessage("GPS Address cannot be empty"),
],
updateHotelController)


  
//Delete
router.delete("/hoteldelete", deleteHotelController)  



module.exports = router