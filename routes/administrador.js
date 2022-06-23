//llamar al router de express
const express = require("express");
const router = express.Router();
const validateUsersCreate = require("../middlewares/usersValidator")
const upload = require ("../middlewares/multer")
const uploadProduct = require ("../middlewares/multerProducts")



//llamar al controlador
const AdministradorController = require ("../controllers/AdministradorController")

//crear las rutas para "/..."  (app.get)
router.get("/", AdministradorController.administrador);

//USUARIOS
router.get("/usersList", AdministradorController.usersList);
//crear
router.get("/usersCreate", AdministradorController.usersCreate);
router.post("/usersCreate", upload.single("img"), validateUsersCreate, AdministradorController.usersSave);
//Editar
router.get("/usersEdit/:id", AdministradorController.usersEdit);
router.put("/usersEdit/:id", upload.single("img"), validateUsersCreate, AdministradorController. usersUpdate);
//eliminar
router.delete("/delete/:id",  AdministradorController.userDelete);

//PRODUCTOS
router.get("/productListAdm", AdministradorController.productListAdm);
//Crear productos
router.get("/productCreate", AdministradorController.productCreate);
router.post("/productCreate", uploadProduct.single("img"), AdministradorController.productSave);
//Editar productos
router.get("/productEdit/:id", AdministradorController.productEdit);
router.put("/productEdit/:id", uploadProduct.single("img"), AdministradorController.productUpdate);
//Borrar productos
router.delete("/productDelete/:id", AdministradorController.productDelete);

//exportar el router
module.exports = router;