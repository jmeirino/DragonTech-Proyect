
const Product = require ("../models/Product")
const {validationResult} = require("express-validator");
const bcryptjs = require ("bcryptjs");
const db = require("../database/models")

     let allusers;

     //Funcion para leer JSON
     function leerJson() {
          const allusersJsonRead = fs.readFileSync(path.join(__dirname, '../database/usuarios.json'),{encoding:'utf-8'})
     
          if (allusersJsonRead === "") {
               allusers = [];
          }else {
               allusers = JSON.parse(allusersJsonRead);
          }

          return allusers
     }

     //Función para escribir JSON 
     function escribirJson() {
          const allusersJsonWrite = JSON.stringify(allusers, null, "\t");
          fs.writeFileSync(path.join(__dirname, '../database/usuarios.json'), allusersJsonWrite);
     }

     //Funcion para leer JSON
     function leerJson2() {
          const productosJsonRead = fs.readFileSync(path.join(__dirname, '../database/productos.json'),{encoding:'utf-8'})
          
          if (productosJsonRead === "") {
          productos = [];
          }else {
          productos = JSON.parse(productosJsonRead);
          }
          return productos
          }
     
     //Función para escribir JSON 
     function escribirJson2() {
          const productosJsonWrite = JSON.stringify(productos, null, "\t");
          fs.writeFileSync(path.join(__dirname, '../database/productos.json'), productosJsonWrite);
     }

// OBJETO CONTROLADOR ADMINISTRADOR
let AdministradorController = {
     
     //filename: "./database/usuarios.json",
   
     administrador: (req,res) => {

        return res.render("administrador");
     },


/*---------------------------*/
//USUARIOS
     usersList: (req,res) => {

          db.Usuario.findAll({ 
               include: "rol",
               where: {
                    activo: 1    
               }
               })
              .then(function (usuarios) {
               
                 return res.render("usersList", {usuarios:usuarios} )
                  
              })

              .catch(function (error) {
               console.log(error);
             })
     },

     //Creacion de usuario
     usersCreate: (req,res) => {

          db.Rol.findAll()

              .then(function (roles) {
                  res.render("usersCreate", {roles:roles})
              })

              .catch(function (error) {
               console.log(error);
             })
              
     },

     usersSave: async(req,res) => {


          //validacion de campos
          let validaciones = validationResult(req);

          if (validaciones.errors.length > 0) { 

               db.Rol.findAll()

              .then(function (roles) {
                  return res.render("usersCreate", { roles:roles, errors:validaciones.mapped(), old: req.body })
              })  

              .catch(function (error) {
               console.log(error);
             })

          } else {

               
          //validando que el mail no esté registrado
          let userInDB = await db.Usuario.findOne({
               where: {
                    email: req.body.email
               }
          })
              
          
          if (userInDB) {

               return res.render("usersCreate", {errors: {
                    email: {
                         msg:"No ha sido posible crear el usuario"
                      }}
                       , old: req.body}
               );
          }

          //crear usuario
          
           //usando imagen default en caso que el usuario no cargue una
          let imgDefault = req.file ? req.file.filename : "default.png";

          db.Usuario.create({
          ...req.body,
          password: bcryptjs.hashSync(req.body.password, 10),//codificando el password
          img: imgDefault
          })

        
        
          return res.redirect("/administrador/usersList")

          }


        },

     //Editar usuario 
     usersEdit: (req,res) => {

          let pedidoUsuarios = db.Usuario.findByPk(req.params.id)
          let pedidoRoles = db.Rol.findAll()

          Promise.all([pedidoUsuarios, pedidoRoles])

               .then(function ([usuario, roles]) {
                    res.render("usersEdit", {usuario:usuario, roles:roles})
               })

               .catch(function (error) {
                    console.log(error);
                  })

     },
    

     usersUpdate:async(req,res) => {

          let user = await db.Usuario.findByPk(req.params.id)
  
          let imgEdit = req.file ?  req.file.filename : user.img; 
  
          db.Usuario.update({
  
              ...req.body,
              img: imgEdit
  
              }, {
              
                  where:{ id: req.params.id }
  
              })
              .then(function (data) {
               return res.redirect("/administrador/usersList");
              })

              .catch(function (error) {
               console.log(error);
             })
          
     },

     //Eliminar usuario 
     userDelete:async(req,res) => {

          let user = await db.Usuario.findByPk(req.params.id)
  
          db.Usuario.update({
  
              activo: 0,
              
  
              }, {
              
                  where:{ id: req.params.id }
  
              })
              .then(function (data) {
               return res.redirect("/administrador/usersList");
              })

              .catch(function (error) {
               console.log(error);
             })
                
  
       

          
     },




/*---------------------------*/
//PRODUCTOS

     productListAdm:(req,res) => {

          db.Producto.findAll({ 
               include: "categoria"
               
          })
              .then(function (productos) {
               
               res.render("productListAdm", {productos : productos});
                  
              })
          
     },

//crear producto
     productCreate:(req,res) => {
     
          db.Categoria.findAll()
          .then(function (categorias) {
              res.render("productCreate", {categorias:categorias})
          })
          
},
     productSave:(req,res) => {
          //Faltan validaciones       
              
               db.Producto.create({
                    ...req.body,
                    img: req.file.filename
               })
               
               return res.redirect("/administrador/productListAdm");
     },

//Editar producto 
     productEdit:(req,res) => {

               let pedidoProductos = db.Producto.findByPk(req.params.id)
               let pedidoCategorias = db.Categoria.findAll()
     
               Promise.all([pedidoProductos, pedidoCategorias])
                    .then(function ([producto, categorias]) {
                         res.render("productEdit", {producto:producto, categorias:categorias})
                    })
               
     },

     //Editar producto 
     productUpdate:async(req,res) => {

          //Faltan validaciones  

          let user = await db.Producto.findByPk(req.params.id)
  
          let imgEdit = req.file ?  req.file.filename : user.img; 
  
          db.Producto.update({
  
              ...req.body,
              img: imgEdit
  
              }, {
              
                  where:{ id: req.params.id }
  
              })
              .then(function (data) {
                    return res.redirect("/administrador/productListAdm");
              })
          
           
     
          
     },

//Eliminar producto 
     productDelete:(req,res) => {

          db.Producto.destroy({
               where: {id: req.params.id}
          })

          return res.redirect("/administrador/productListAdm");
     }
    



}



//exportar el controlador
module.exports = AdministradorController;


