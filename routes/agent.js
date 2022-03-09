const express = require("express")

const AgentModel = require ("../models/agent")

const router = express.Router()

const {body} = require("express-validator")

const isAuth = require("../middlewares/is-auth")

const {listAgentsController, createAgentController, updateAgentController} = require ("../controllers/agent")


//Routes

//View
router.get("/agents/:id?", isAuth, listAgentsController)


//Create
router.post("/agent", isAuth, [                 
    body("firstname").trim().not().isEmpty().withMessage("Name cannot be empty"),
    body("lastname").trim().not().isEmpty().withMessage("Name cannot be empty"),
    body("location").trim().not().isEmpty().withMessage("Location cannot be empty"),
    body("email").trim().not().isEmpty().withMessage("Email cannot be empty"),
    body("phone").isMobilePhone("en-GH")
    .custom((value, {req}) => {
        return AgentModel.findOne({"phone": value}).then(
            AgentDoc => {
                if(AgentDoc)
                return Promise.reject("Phone number already taken")
            }
        ) 
    }),
    body("gps").trim().not().isEmpty().withMessage("GPS cannot be empty"),    
    body("bio").trim().not().isEmpty().withMessage("Bio cannot be empty"),    
],           
createAgentController)


//Update 
router.put("/agent", isAuth, [
    body("location").trim().not().isEmpty().withMessage("Location cannot be empty"),
    body("phone").trim().not().isEmpty().withMessage("Phone cannot be empty"),
    body("gps").trim().not().isEmpty().withMessage("gps cannot be empty"),
], updateAgentController)



module.exports = router
















//body("gender").trim().not().isEmpty().withMessage("gender cannot be empty"),