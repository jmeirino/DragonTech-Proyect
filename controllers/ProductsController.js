const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
//nuevo modelo Producto en /database/models
const db = require("../database/models")



//categorias
//const categorias = ["Headset", "Mouse", "Teclado"];

//OBJETO CONTROLADOR PRODUCTOS
let ProductsController = {
   
//listar productos con mysql
     productList: (req,res) => {
               
         let pedidoProductos = db.Producto.findAll()
         let pedidoCategorias = db.Categoria.findAll()

         Promise.all([pedidoProductos, pedidoCategorias])

          .then(function ([productos, categorias]) {
                    
                   res.render("productList", {productos:productos, categorias:categorias})
              })

          .catch(function (error) {
                   console.log(error);
                 })

     },

//detalle de producto FALTA MYSQL
    productDetail: (req,res) => {

          db.Producto.findByPk(req.params.id, {
               include:[{association: "categoria"}]})
          
          .then(function (producto) {
               return res.render("productDetail", {producto:producto} )
            })
          .catch(function (error) {
               console.log(error);
             })
            
     },

//dividir en categorias FALTA MYSQL
     categorias: (req,res) => {  

          let pedidoProductos = db.Producto.findAll({
               where: {
                    categorias_id: req.params.id
               } 
          })
          let pedidoCategorias = db.Categoria.findAll()

          Promise.all([pedidoProductos, pedidoCategorias])

          .then(function ([productos, categorias]) {
                    
                   res.render("categorias", {productos:productos, categorias:categorias})
              })

          .catch(function (error) {
                   console.log(error);
                 })

               

          /*
          let allProducts = Product.findAll();

          const categoria = allProducts.filter(element =>{
               return element.categoria === req.params.categoria
          })

         res.render("categorias",{categoria:categoria, categorias: categorias});
         */

        


     },
     
     //carrito de compras FALTA TODO
     productCart: (req,res) => {
          //No implementado
          res.render("productCart");
     }

}



//exportar el controlador
module.exports = ProductsController;