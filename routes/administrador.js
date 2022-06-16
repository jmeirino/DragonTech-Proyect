//llamar al router de express
const express = require("express");
const router = express.Router();
const validateUsersCreate = require("../middlewares/usersValidator")
const upload = require ("../middlewares/multer")



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
router.delete("/delete/:id", AdministradorController.userDelete);
/*
//PRODUCTOS
router.get("/productListAdm", ProductsController.productListAdm);
//Crear productos
router.get("/productCreate", ProductsController.productCreate);
router.post("/productCreate", upload.single("img"), ProductsController.productSave);
//Editar productos
router.get("/productEdit/:id", ProductsController.productEdit);
router.put("/productEdit/:id", upload.single("img"), ProductsController.productUpdate);
//Borrar productos
router.delete("/delete/:id", ProductsController.productDelete);
*/
//exportar el router
module.exports = router;