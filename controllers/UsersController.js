const fs = require('fs');
//requiero el modulo usuario con su CRUD
const User = require ("../models/User");
const {validationResult} = require("express-validator");
const bcryptjs = require ("bcryptjs");
const db = require("../database/models")


let UsersController = {
   
     register: (req,res) => {
          return res.render("register");
     },

     newRegister: (req,res) => {

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
                         msg:"Este email ya se encuentra registrado"
                    }}
                    , old: req.body}
               );
          }

          //usando imagen default en caso que el usuario no cargue una
          let imgDefault = req.file ? req.file.filename : "default.png";

          let userToCreate = {
               ...req.body,
               password: bcryptjs.hashSync(req.body.password, 10),//codificando el password
               categoria: "cliente", //el cliente por defecto se registra con su categoria
               img:imgDefault
          }

          //creando usuario nuevo
          let userCreated =  User.create(userToCreate);
          
          return res.redirect("/users/login");
          
         
     },


     login: (req,res) => {
         return res.render("login");
     },
//Proceso de logueo
     loginProcess: async(req,res) => {
          
          //let userToLogin = User.findByField("email", req.body.email);
          let userToLogin = await db.Usuario.findOne({
               where: {
                    email: req.body.email
               }
          })

          //si el email me da TRUE  
          if (userToLogin && userToLogin.activo === 1) {

               let okPass = bcryptjs.compareSync(req.body.password, userToLogin.password)
               //Si la pass me da TRUE
               if (okPass) {
                    delete userToLogin.password;//borro la contraseña por seguridad
                    req.session.userLogged = userToLogin;//meto al tipo en sesion

                    if (req.body.recordar_usuario) {
                         res.cookie("userEmail", req.body.email, { maxAge: 365 * 24 * 60 * 60 * 1000 })//la cookie dura 1 año
                    }

                    return res.redirect("/users/userProfile")
                   

                   
               }
               //Si el password esta mal, mando msj de error
               return res.render("login", {
                         errors: {
                              email: {
                                   msg: "Email o Password inválidos"
                              }
                         }
               });
               
          }
          //Si el email no existe mando msj de error
          return res.render("login", {
               errors: {
                    email: {
                         msg: "Email o Password inválidos"
                    }
               }
          });
     },
          
     //perfil del usuario
     userProfile: (req,res) => {
              
          return  res.render("userProfile", {
               user: req.session.userLogged
          });
     },

     //desloguearse de la session
          userLogout:(req,res) => {
               //eliminar cookie para poder cerrar sesion
               res.clearCookie("userEmail");
               req.session.destroy();

               return res.redirect("/");
          }



}


module.exports = UsersController;


