const User = require("../models/User")

function userLogged (req, res, next) {

    //cookie email
    let emailInCookie = req.cookies.userEmail
    let userFromCookie = User.findByField("email", emailInCookie)
    
    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    }


   //barra de navegacion segun este logueado o no
   
    res.locals.isLogged = false;

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    

    next();
}

module.exports = userLogged;