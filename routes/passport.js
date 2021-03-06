const express = require("express")
const router = express.Router()
require('../authh')
const passport = require("passport")

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>')
})

router.get("/auth/google",
  passport.authenticate('google', {scope: ['email', 'profile'] })
)
  
router.get('/auth/google/callback', 
  passport.authenticate('google', { 
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
  })
)

router.get('/auth/failure', (req, res) => {
  res.send('Something went wrong...')
})

router.get('/protected', isLoggedIn, (req, res) => {
  res.send('Hello ${req.user.displayName}')
})


router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye'); 
})


module.exports = router