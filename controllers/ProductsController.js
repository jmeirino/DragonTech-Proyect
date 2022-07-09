const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
//nuevo modelo Producto en /database/models
const db = require("../database/models")



//categorias
const categorias = ["Headset", "Mouse", "Teclado"];

//OBJETO CONTROLADOR PRODUCTOS
let ProductsController = {
   
//listar productos con mysql
     productList: (req,res) => {
     
          db.Producto.findAll({ 
               include: "categoria"
               
          })
              .then(function (productos) {
               
                 return res.render("productList", {productos:productos} )
                  
              })
     },

//detalle de producto FALTA MYSQL
    productDetail: (req,res) => {

          let allProducts = Product.findAll();

          const producto = allProducts.find(element =>{
               return element.id === parseInt(req.params.id)
          })
         res.render("productDetail",{producto: producto});
     },

//dividir en categorias FALTA MYSQL
     categorias: (req,res) => {  
     
          let allProducts = Product.findAll();

          const categoria = allProducts.filter(element =>{
               return element.categoria === req.params.categoria
          })

         res.render("categorias",{categoria:categoria,categorias: categorias});
     },
     
     //carrito de compras FALTA TODO
     productCart: (req,res) => {
          //No implementado
          res.render("productCart");
     }

}



//exportar el controlador
module.exports = ProductsController;