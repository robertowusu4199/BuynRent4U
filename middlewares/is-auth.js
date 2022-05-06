const jwt = require("jsonwebtoken")

const isAuth = (req, res, next) => {

    try {
        //exctract the authorization from the hearder
        const authorizationHeader = req.get("Authorization")
        if (!authorizationHeader)
            throw new Error("Unauthenticated")

        const token = authorizationHeader.split(" ")[1]
        console.log(token)
        //Verify the token with jwt
        const decodedToken = jwt.verify(token, "superscretkey")

        if(!decodedToken)
           throw new Error("Unauthorized")

           req.userId = decodedToken.userId;
        next()

    } catch (error) {
        console.log(error)
        res.status(400).json({message: error.message})
    }
}

module.exports = isAuth