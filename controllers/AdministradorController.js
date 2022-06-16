const fs = require('fs');
const path = require ("path");
//requiero el modulo usuario con su CRUD
const User = require ("../models/User");
const {validationResult} = require("express-validator");
const bcryptjs = require ("bcryptjs");

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

// OBJETO CONTROLADOR ADMINISTRADOR
let AdministradorController = {
     
     filename: "./database/usuarios.json",
   
     administrador: (req,res) => {

         res.render("administrador");
     },


/*---------------------------*/
//USUARIOS
     usersList: (req,res) => {

        let allusers = User.findAll();
        
        
        res.render("usersList", {usuarios : allusers});
     },

     //Creacion de usuario
     usersCreate: (req,res) => {
        
          res.render("usersCreate");
     },

     usersSave: (req,res) => {

          //validacion de campos
          let validaciones = validationResult(req);

          if (validaciones.errors.length > 0) { 

               return res.render("register", {errors:validaciones.mapped(), old: req.body});

          } 

          //validando que el mail no esté registrado
          let userInDB = User.findByField("email", req.body.email);

          if (userInDB) {

               return res.render("register", {errors: {
                    email: {
                         msg:"Este email ya está registrado"
                      }}
                       , old: req.body}
               );
          }

          //usando imagen default en caso que el usuario no cargue una
          let imgDefault = req.file ? req.file.filename : "default.png";

          let userToCreate = {
             ...req.body,
             password: bcryptjs.hashSync(req.body.password, 10),//codificando el password
             img:imgDefault
          }

          //creando usuario nuevo
          let userCreated =  User.create(userToCreate);

          return res.redirect("/administrador/usersList");
     },

     //Editar usuario 
     usersEdit: (req,res) => {

          let userEdit = User.findByPk(parseInt(req.params.id));


          return  res.render("usersEdit", {userEdit: userEdit});
     },
    

     //Editar producto (faltan validaciones y hacerlo a traves de models)
     usersUpdate:(req,res) => {
     
          leerJson()

          allusers.forEach(element => {
              
              let imgEdit = req.file ?  req.file.filename : element.img;    

              if (element.id === parseInt(req.params.id)) {

                   
                   element.nombre = req.body.nombre;
                   element.apellido = req.body.apellido;
                   element.documento = req.body.documento;
                   element.fechaNacimiento = req.body.fechaNacimiento;
                   element.telefono = req.body.telefono;
                   element.email = req.body.email;
                   element.categoria = req.body.categoria;
                   element.img = imgEdit;
                   element.password = req.body.password;
                   
               }
              
          });

                   

          escribirJson();
        
          return res.redirect("/administrador/usersList");
     },

     //Eliminar usuario 
     userDelete:(req,res) => {
          //utilizo el delete del modelo User y le paso como valor el id  
          User.delete(parseInt(req.params.id));

          return res.redirect("/administrador/usersList");
     },

/*---------------------------*/
//PRODUCTOS



}



//exportar el controlador
module.exports = AdministradorController;


