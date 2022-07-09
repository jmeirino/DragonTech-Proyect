
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
               include: "rol"
               
          })
              .then(function (usuarios) {
               
                 return res.render("usersList", {usuarios:usuarios} )
                  
              })
                 
     },

     //Creacion de usuario
     usersCreate: (req,res) => {

          db.Rol.findAll()
              .then(function (roles) {
                  res.render("usersCreate", {roles:roles})
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

          } 

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

        },

     //Editar usuario 
     usersEdit: (req,res) => {

          let pedidoUsuarios = db.Usuario.findByPk(req.params.id)
          let pedidoRoles = db.Rol.findAll()

          Promise.all([pedidoUsuarios, pedidoRoles])
               .then(function ([usuario, roles]) {
                    res.render("usersEdit", {usuario:usuario, roles:roles})
               })

     },
    
     //Editar producto (faltan validaciones y hacerlo a traves de models)
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
                
  
       

          
     },




/*---------------------------*/
//PRODUCTOS

     productListAdm:(req,res) => {

          let allProducts = Product.findAll();
        
        
          res.render("productListAdm", {productos : allProducts});
     },

//crear producto
     productCreate:(req,res) => {
     
     leerJson2();
          
     res.render("productCreate", {productos:productos});
},
     productSave:(req,res) => {
          //if que valida si hay archivo de imagen
          if (req.file) {
          
               leerJson2();
          
          
               let ultimoProd = productos.length -1;
               let nuevoId = productos[ultimoProd].id + 1     

               let productoNuevo = {

                    id: nuevoId,
                    marca: req.body.marca,
                    modelo:req.body.modelo,
                    precio: req.body.precio,
                    detalle: req.body.detalle,
                    categoria:req.body.categoria,
                    img: req.file.filename
          
               };
     

               productos.push(productoNuevo);

               escribirJson2();

               res.redirect("productListAdm");

          }else {
               res.render("productCreate", {productos:productos});
          }
     },

//Editar producto 
     productEdit:(req,res) => {

          leerJson2();

          const producto = productos.find(element =>{
          return element.id === parseInt(req.params.id)
          })

          res.render("productEdit",{productoEdit: producto});
     },

     //Editar producto 
     productUpdate:(req,res) => {

          leerJson2();
           
          productos.forEach(element => {
          
               let imgEdit = req.file ?  req.file.filename : element.img;
               
               if (element.id === parseInt(req.params.id)) {
                    element.marca = req.body.marca;
                    element.modelo = req.body.modelo;
                    element.precio = req.body.precio;
                    element.detalle = req.body.detalle;
                    element.categoria = req.body.categoria;
                    element.img = imgEdit ;
               }
               
          });
          

          escribirJson2();

          res.render("productListAdm");
     },

//Eliminar producto 
     productDelete:(req,res) => {

          //utilizo el delete del modelo Product y le paso como valor el id  
          Product.delete(parseInt(req.params.id));

          return res.render("/administrador/productListAdm");
     }
    



}



//exportar el controlador
module.exports = AdministradorController;


