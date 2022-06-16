const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');




//categorias
const categorias = ["Headset", "Mouse", "Teclado"];

//OBJETO CONTROLADOR PRODUCTOS
let ProductsController = {
   
//listar productos 
     productList: (req,res) => {
     
          let allProducts = Product.findAll();

          res.render("productList",{productos: allProducts, categorias: categorias});
     },

//detalle de producto
    productDetail: (req,res) => {

          let allProducts = Product.findAll();

          const producto = allProducts.find(element =>{
               return element.id === parseInt(req.params.id)
          })
         res.render("productDetail",{producto: producto});
     },

//dividir en categorias
     categorias: (req,res) => {  
     
          let allProducts = Product.findAll();

          const categoria = allProducts.filter(element =>{
               return element.categoria === req.params.categoria
          })

         res.render("categorias",{categoria:categoria,categorias: categorias});
     }





/*carrito de compras
     productCart: (req,res) => {
          //No implementado
          res.render("productCart");
     }*/

}



//exportar el controlador
module.exports = ProductsController;