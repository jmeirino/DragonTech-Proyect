const express = require("express");
const router = express.Router();
const apiProductosController = require("../controllers/api/ApiProductosController");
const apiUsuariosController = require("../controllers/api/ApiUsuariosController");

router.get('/api/products', apiProductosController.listAll);
router.get('/api/products/:id', apiProductosController.listById);
router.get('/api/users', apiUsuariosController.listAll);
router.get('/api/users/:id', apiUsuariosController.listById);

module.exports = router;