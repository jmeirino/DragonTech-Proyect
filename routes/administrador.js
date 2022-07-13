//llamar al router de express
const express = require("express");
const router = express.Router();
const validateUsersCreate = require("../middlewares/usersValidator")
const upload = require ("../middlewares/multer")
const uploadProduct = require ("../middlewares/multerProducts")
const {auth, authAdmin} = require ("../middlewares/auth")



//llamar al controlador
const AdministradorController = require ("../controllers/AdministradorController")

//crear las rutas para "/..."  (app.get)
router.get("/", auth, authAdmin, AdministradorController.administrador);

//USUARIOS
router.get("/usersList", auth, authAdmin, AdministradorController.usersList);
//crear
router.get("/usersCreate", auth, authAdmin,AdministradorController.usersCreate);
router.post("/usersCreate", auth, authAdmin,upload.single("img"), validateUsersCreate, AdministradorController.usersSave);
//Editar
router.get("/usersEdit/:id",auth, authAdmin, AdministradorController.usersEdit);
router.put("/usersEdit/:id", auth, authAdmin,upload.single("img"), validateUsersCreate, AdministradorController. usersUpdate);
//eliminar
router.delete("/delete/:id", auth, authAdmin, AdministradorController.userDelete);

//PRODUCTOS
router.get("/productListAdm", auth, authAdmin,AdministradorController.productListAdm);
//Crear productos
router.get("/productCreate", auth, authAdmin,AdministradorController.productCreate);
router.post("/productCreate", auth, authAdmin,uploadProduct.single("img"), AdministradorController.productSave);
//Editar productos
router.get("/productEdit/:id", auth, authAdmin,AdministradorController.productEdit);
router.put("/productEdit/:id", auth, authAdmin,uploadProduct.single("img"), AdministradorController.productUpdate);
//Borrar productos
router.delete("/productDelete/:id", auth, authAdmin, AdministradorController.productDelete);

//exportar el router
module.exports = router;