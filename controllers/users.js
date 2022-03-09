const UserModel = require("../models/user")
const {validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const signupController = (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ message: errors.array()[0].msg })
    }

    const {firstname, lastname, email, gender, password} = req.body

    bcrypt.hash(password, 7).then(hashedPassword => {
        const user = new UserModel({ firstname, lastname, gender, email, password: hashedPassword })

        user.save().then(user => {
            res.json({ "message": "Sign up successful", "data": { firstname: user.firstname, lastname: user.lastname, 
            gender: user.gender, email: user.email, } }) 
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}



const signinController = async (req, res) => {

    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {  
            return res.json({ message: errors.array()[0].msg })
        }

        const { email, password } = req.body
        
        //Find User
        const user = await UserModel.findOne({ email })
        
        if (!user) {
            res.json({ message: "User is not found" })
        }

        //Compare password
        const isAuth = await bcrypt.compare(password, user.password)
        
        if (!isAuth) {
            return res.json({ message: "Email and password combination is incorrect" })
        }
        
        const token = jwt.sign(                                         //Adding the jsonwebtoken
            { name: user.name, email: user.email, userId: user.password },
            "superscretkey",
            { expiresIn: "2h" })      
        return res.json({ message: "user signed in", token })       

    } catch (error) {
        // res.json({ message: "Server error. Please try again" })    //Cannot set headers after they are sent to the client
    }

}



module.exports = {
    signupController,
    signinController,
}