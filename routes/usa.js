const express = require("express")
const router = express.Router()

router.get('/usa', (req, res , next) => {
    res.render('index')
})

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
// });

module.exports = router