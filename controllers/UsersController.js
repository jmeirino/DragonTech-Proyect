const {validationResult} = require("express-validator");
const bcryptjs = require ("bcryptjs");
const db = require("../database/models")
const userLogged = require("../middlewares/userLogged")


let UsersController = {
   
     register: (req,res) => {

          db.Rol.findAll()
              .then(function (roles) {
                return res.render("register", {roles:roles})
              })
     },
 
     newRegister: async(req,res) => {


          //validacion de campos
          let validaciones = validationResult(req);

          if (validaciones.errors.length > 0) { 

               db.Rol.findAll()
              .then(function (roles) {
                  return res.render("register", {roles:roles, errors:validaciones.mapped(), old: req.body})
              })  

          } 

          //validando que el mail no esté registrado
          let userInDB = await db.Usuario.findOne({
               where: {
                    email: req.body.email
               }
          })
              
          
          if (userInDB) {

               return res.render("register", {errors: {
                    email: {
                         msg:"No ha sido posible crear el usuario"
                      }}
                       , old: req.body}
               );
          }

          
           //usando imagen default en caso que el usuario no cargue una
          let imgDefault = req.file ? req.file.filename : "default.png";

          db.Usuario.create({
          ...req.body,
          roles_id: 1,
          password: bcryptjs.hashSync(req.body.password, 10),//codificando el password
          img: imgDefault
          

        })
          
          return res.redirect("/users/login");
          
         
     },


     login: (req,res) => {
         return res.render("login");
     },

//Proceso de logueo

     loginProcess: async(req,res) => {
          
          try {
               let userToLogin = await db.Usuario.findOne({
                    where: {
                         email: req.body.email
                    }
               })
                  
          
          console.log(userToLogin);
          //si el email me da TRUE  
          if (userToLogin && userToLogin.activo == 1 ) {

               console.log("linea 91");

               let okPass = bcryptjs.compareSync(req.body.password, userToLogin.password)

               console.log("linea 93", req.body.password);

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

          } catch (error) {
               console.log(error);
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


