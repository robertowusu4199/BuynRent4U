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
const isAuth = require("../middlewares/is-auth")
const {listUsersController, updateUserController} = require ("../controllers/users")


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
    body("phone").isMobilePhone("en-GH")
    .custom((value, {req}) => {
        return UserModel.findOne({"phone": value}).then(
            UserDoc => {
                if(UserDoc)
                return Promise.reject("Phone number already taken")
            }
        ) 
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



router.get("/users/:id?", isAuth, listUsersController)


//Update 
router.put("/userUpdate", isAuth, [
    body("location").trim().not().isEmpty().withMessage("Location cannot be empty"),
    body("phone").trim().not().isEmpty().withMessage("Phone cannot be empty"),
    body("gps").trim().not().isEmpty().withMessage("gps cannot be empty"),
], updateUserController)



module.exports = router