module.exports = {
auth : function (req, res, next) {

    if (!req.session.userLogged) {
        return res.redirect("/users/login")
    }
    next();
},

authAdmin : function (req, res, next) {

    if (req.session.userLogged.roles_id != 2){
        return res.redirect("/users/userProfile")
    } 
        
    next();
    
    
}

}
