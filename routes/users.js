//llamar al router de express
const express = require("express");
const router = express.Router();
const validateUsersCreate = require("../middlewares/usersValidator")
const upload = require ("../middlewares/multer")
const guest = require("../middlewares/guest")
const {auth, authAdmin} = require("../middlewares/auth")


//llamar al controlador
const UsersController = require ("../controllers/UsersController")

//login
router.get("/login", guest, UsersController.login);
//Proceso de login
router.post("/login", UsersController.loginProcess);

//register
router.get("/register", guest, UsersController.register);
router.post("/register", upload.single("img"), validateUsersCreate, UsersController.newRegister);

//Perfil de usuario
router.get("/userProfile", auth, UsersController.userProfile);

//Deslogueo - Logout
router.get("/userLogout", auth, UsersController.userLogout);

//exportar el router
module.exports = router;