const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const session = require("express-session")
const userRoutes = require("./routes/user")
const apartmentRoutes = require("./routes/apartment")
const flatRoutes = require("./routes/flat")
const villaRoutes = require("./routes/villa")
const hotelRoutes = require("./routes/hotel")
const expressLayouts = require('express-ejs-layouts')
const viewEngine = require('view-engine')
const usaRoutes = require('./routes/usa')
const indexRoutes = require('./routes/index')
const passport = require("passport")

const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors")
const cookieParser = require('cookie-parser')


require('./config/passport')(passport)



// const dotenv = require("dotenv")

// const test = process.env.URL

// console.log(test)



const Server = express()


const app = express()

app.set('view engine', 'ejs')
app.use(expressLayouts);

//Server.use = cors()
Server.use(cors({ origin: true }))
Server.use(cookieParser())


Server.use(express.json({limit: "50mb"}))
Server.use(express.urlencoded({limit: "50mb", extended: true}))
 

Server.use(userRoutes)
Server.use(apartmentRoutes)
Server.use(flatRoutes)
Server.use(villaRoutes)
Server.use(hotelRoutes)
Server.use(usaRoutes)
Server.use(indexRoutes)


Server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
Server.use(passport.initialize())
Server.use(passport.session())


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





