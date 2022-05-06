module.exports = {
    ensureAuth: (req, res, next) => {
        if(req.isAuthenticated()) {
            console.log("Authenticated")
           return next()
        }else{
            return res.redirect("/auth")
        }
    },


    guestAuth: (req, res, next) => {
        if(req.isAuthenticated()) {
            console.log("Authenticated")
            return res.redirect("/dashboard")
        }else{
            console.log("Not Authenticated")
            next()
        }
    },
}