const express = require ("express")
const {body} = require ("express-validator")
const router = express.Router()
const {signupController} = require("../controllers/users.js")
const {activateAccount} = require("../controllers/users")
const {signinController} = require("../controllers/users")
const {forgotPassword} = require("../controllers/users")
const {resetPassword} = require("../controllers/users")
const {googleLogin} = require("../controllers/users")
const UserModel = require("../models/user")


router.post("/signup",  [
    body("firstname").trim().not().isEmpty().withMessage("User is required firstname"),
    body("lastname").trim().not().isEmpty().withMessage("User is required lastname"),
    body("gender").trim().not().isEmpty().withMessage("User is required gender"),
    body("email")
    .isEmail()
    .withMessage("Email is invalid")
    .custom((value, {req}) => {
        
        //check if email is already taken
        
        return UserModel.findOne({email:value}).then(userDoc => {
            if(userDoc)
            return Promise.reject("Email already taken")
        })
    }),                                       
    body("password").trim().isLength({min:5})
], signupController)


router.post("/email-activate", activateAccount)


router.post("/signin", [
    body("email")
        .isEmail()
        .withMessage("Email is invalid"),
    body("password").trim().isLength({min:5})
], signinController)



router.put("/forgot-password", forgotPassword)



router.put("/reset-password", resetPassword)



router.post("/google-login", googleLogin) //


module.exports = router