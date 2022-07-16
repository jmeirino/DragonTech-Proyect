const express = require("express");
const router = express.Router();
const path = require("path");


//llamar al controlador
const ProductsController = require ("../controllers/ProductsController")

//crear las rutas 

//productos
router.get("/productList", ProductsController.productList);
router.get("/productDetail/:id", ProductsController.productDetail);
router.get("/categorias/:id", ProductsController.categorias);
router.get("/productCart", ProductsController.productCart);





//exportar el router
module.exports = router;