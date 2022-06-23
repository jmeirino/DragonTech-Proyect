function guest(req, res, next) {
    if (req.session.userLogged) {
        return res.redirect("/users/userProfile")
    }
    next();
}

module.exports = guest;