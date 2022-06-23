const fs = require('fs');
//requiero el modulo usuario con su CRUD
const User = require ("../models/Product");
const {validationResult} = require("express-validator");
const Product = require('../models/Product');

// Traemos el archivo que contiene nuestra data a mostrar desde un json

//const productos = JSON.parse(fs.readFileSync('./productos.json'))


let MainController = {
   
    index: (req,res) => {
        let allProducts = Product.findAll();
        

         res.render("index",{productos: allProducts});
    }
}



//exportar el controlador
module.exports = MainController;