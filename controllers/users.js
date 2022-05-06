const UserModel = require("../models/user")
const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const _ = require("lodash")
const { OAuth2Client } = require("google-auth-library")
const dotenv = require('dotenv');
dotenv.config();


const mailgun = require("mailgun-js");
const user = require("../models/user");
const DOMAIN = "sandbox591fe8bff81b4bd6a9d6885f1a2c38ee.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });


const client = new OAuth2Client(process.env.CLIENT_ID)



const signupController = (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.json({ message: errors.array()[0].msg })
    }

    const { firstname, lastname, email, gender, phone, location, password } = req.body


    const token = jwt.sign({ firstname, lastname, email, gender, phone, location, password }, process.env.JWT_ACC_ACTIVATE, { expiresIn: "20m" })


    const data = {
        from: "noreply@hello.com",
        to: email,
        subject: "Account Activation Link",
        html: `
            <h2>Please click on given link to activate you account:</h2>
            <a href="${process.env.BASE_URL},${token}"><p>/authentication/activate${process.env.BASE_URL},${token}</p></a>
        `
    };

    mg.messages().send(data, function (error, body) {
        if (error) {
            return res.status(400).json({
                error: err.message
            })
        }
        return res.status(200).json({ message: "Email has been sent, kindly activate your account" },)
    });



}



const activateAccount = (req, res) => {
    const { token } = req.body
    if (token) {
        jwt.verify(token, process.env.JWT_ACC_ACTIVATE, function (err, decodedToken) {
            if (err) {
                return res.status(400).json({ error: "Incorrect or Expired link." })
            }
            const { firstname, lastname, gender, email, phone, location, password } = decodedToken
            bcrypt.hash(password, 10).then(hashedPassword => {
                const user = new UserModel({ firstname, lastname, gender, email, phone, location, password: hashedPassword })

                user.save().then(user => {
                    res.status(200).json({
                        "message": "Sign up successful", "data": {
                            firstname: user.firstname, lastname: user.lastname,
                            gender: user.gender, email: user.email,
                            phone: user.phone, location: user.location,
                        }
                    })
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
        })
    } else {
        return res.status(400).json({ error: "Something went wrong!!!" })
    }
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
            res.status(400).json({ message: "This user doesn't exist, signup first" })
        }

        //Compare password
        const isAuth = await bcrypt.compare(password, user.password)

        if (!isAuth) {
            return res.status(400).json({ message: "Email or password is incorrect" })
        }

        const token = jwt.sign(                                         //Adding the jsonwebtoken
            { name: user.name, email: user.email, userId: user.password },
            "superscretkey",
            { expiresIn: "4h" })
        return res.status(200).json({ message: "User signed in", token })

    } catch (error) {
        res.json({ message: "Server error. Please try again" })
    } 

}



const forgotPassword = async (req, res) => {
    const { email } = req.body

    user.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: "User with this email does not exists." })
        }

        const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, { expiresIn: "20m" })

        const data = {
            from: "noreply@hello.com",
            to: email,
            subject: "Account Activation Link",
            html: `
            <h2>Please click on given link to reset your password</h2>
            <p>/resetpassword/${token}</p>
        `
        };

        return user.updateOne({ restLink: token }, function (err, success) {
            if (err) {
                return res.status(400).json({ error: "Reset password link error" })
            } else {
                mg.messages().send(data, function (error, body) {
                    if (error) {
                        return res.json({
                            error: err.message
                        })
                    }
                    return res.status(200).json({ message: "Email has been sent, kindly follow the instructions" })
                });
            }
        })
    })
}



const resetPassword = async (req, res) => {
    const { resetLink, newPass } = req.body
    if (resetLink) {
        jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, function (error, decodedData) {
            if (error) {
                return res.status(401).json({
                    error: "Incorrect token or it is expired."
                })
            }
            console.log(decodedData)
            user.findOne({ _id: decodedData._id }, (err, user) => {
                if (err || !user) {
                    return res.status(400).json({ error: "User with this token does not exists." })
                }
                const obj = {
                    password: newPass,
                    restLink: ""
                }

                user = _.extend(user, obj)
                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({ error: "Reset password error" })
                    } else {
                        return res.status(200).json({ message: "Your password has been changed." })
                    }
                })

            })
        })
    } else {
        return res.status(401).json({ error: "Authentication error!!!" })
    }

}


const googleLogin = (req, res) => {
    const { tokenId } = req.body

    client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.CLIENT_ID
    }).then(response => {
        const { email_verfied, name, email } = response.payload
        console.log(response.payload)
        if (email_verfied) {
            user.findOne({ email }).exec((err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: "Something went wrong..."
                    })
                } else {
                    if (user) {
                        const token = jwt.sign({ _id: user._id }, process.env.RESET_SIGNIN_KEY, { expiresIn: "20m" })
                        const { _id, name, email } = user

                        res.json({
                            token,
                            user: { _id, name, email }
                        })
                    } else {
                        let password = email + process.env.JWT_SIGNIN_KEY
                        let newUser = new User({ name, email, password })
                        newUser.save((err, data) => {
                            if (err) {
                                return res.status(400).json({
                                    error: "Something went wrong..."
                                })
                            }
                            const token = jwt.sign({ _id: data._id }, process.env.RESET_SIGNIN_KEY, { expiresIn: "20m" })
                            const { _id, name, email } = newUser

                            res.json({
                                token,
                                user: { _id, name, email }
                            })
                        })
                    }
                }
            })
        }
    })
    console.log()
}


const listUsersController = (req, res) => {
    //Find users by id

    const {id} = req.params

    if(id){

        UserModel.find({ _id: id}).then(users => {
            res.status(200).json({ message: "Successful",  data: users })
        }).catch(err => console.log(err))
    } else {
        UserModel.find().then(users => {
            res.status(200).json({ message: "Successful",  data: users })
        }).catch(err => console.log(err))
    }
}


const updateUserController = (req, res) => {
    //Agent update
    const {id, location, phone, gps} = req.body 
    
    UserModel.findById({_id: id}).then(user => {
        if(agent){
            user.location = location;
            user.phone = phone;
            user.gps = gps;

            user.save()
            
            res.status(200)
            .json({message: "Update Successful", data: user})

        }else{
            res.json({message: "Cannot be found"})
        }


    }).catch(err => console.log(err))

}




module.exports = {
    signupController,
    activateAccount,
    signinController,
    forgotPassword,
    resetPassword,
    googleLogin,
    listUsersController,
    updateUserController,
}