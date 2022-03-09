const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const agentRoutes = require("./routes/agent")
const userRoutes = require("./routes/user")
const apartmentRoutes = require("./routes/apartment")
const cloudinaryRoutes = require("./routes/cloudinary")
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors")
const cookieParser = require('cookie-parser')

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
Server.use(cloudinaryRoutes)


const port = process.env.PORT || 7000     


Server.use((error, request, response, next) => {
  
  response.status(500).send({ error: error.message })
  next()
  
})

 
mongoose.connect(
    process.env.URL,
{useNewUrlParser: true, useUnifiedTopology: true}
)
.then(result => {
    
    Server.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })

}).catch(err => console.log(err))





