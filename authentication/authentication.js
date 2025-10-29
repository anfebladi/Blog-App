
const jwt = require("jsonwebtoken")
const User = require('../models/User.js')
require('dotenv').config()


//authentication for routes
const authentication = (req, res, next) => {
    const token = req.cookies.jwt
    if(token) {
        jwt.verify(token, process.env.PERSONAL_SECRET, (err, decodedToken)=> {
            if(err) {
                res.redirect('/login')
            } else {
                next();
            }
        }) 
    }
    else {
        res.redirect("/login");
    }
}



module.exports = { authentication }