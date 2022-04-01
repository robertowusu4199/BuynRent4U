const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const agentRoutes = require("./routes/agent")
const userRoutes = require("./routes/user")
const apartmentRoutes = require("./routes/apartment")
const flatRoutes = require("./routes/flat")
const cloudinaryRoutes = require("./routes/cloudinary")
const multercloudianryRoutes = require("./routes/multercloudinary")
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors")
const cookieParser = require('cookie-parser')

const passport = require("passport")
const passportRoutes = require("./routes/passport")


// const dotenv = require("dotenv")

// const test = process.env.URL

// console.log(test)





const Server = express()




//Server.use = cors()
Server.use(cors({ origin: true }))
Server.use(cookieParser())


Server.use(express.json({limit: "50mb"}))
Server.use(express.urlencoded({limit: "50mb", extended: true}))
 

Server.use(agentRoutes)
Server.use(userRoutes)
Server.use(apartmentRoutes)
Server.use(flatRoutes)
Server.use(cloudinaryRoutes)
Server.use(multercloudianryRoutes)
Server.use(passportRoutes)


Server.use(passport.initialize())


const PORT = 7000      //process.env.PORT



Server.use((error, request, response, next) => {
  
  response.status(500).send({ error: error.message })
  next()
  
})

 
mongoose.connect(
    process.env.URL,
{useNewUrlParser: true, useUnifiedTopology: true}
)
.then(result => {
    
    Server.listen(process.env.PORT || 7000, () => {
        console.log(`Server is running on port ${PORT}`)
    })

}).catch(err => console.log(err))





