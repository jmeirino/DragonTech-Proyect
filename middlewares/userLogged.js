const db = require ("../database/models")

async function userLogged (req, res, next) {

    
    try {

    let emailInCookie = req.cookies.userEmail ? req.cookies.userEmail : "";
    //cookie email
    
    let userFromCookie = await db.Usuario.findOne({
        where: {
                       email: emailInCookie

                  }})
    
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

    } catch (error) {
        console.log(error);
    }
    
    
}

module.exports = userLogged;