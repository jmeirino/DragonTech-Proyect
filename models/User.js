const fs = require('fs');
//const path = require('path');



const User = {
    filename: "./database/usuarios.json",

    getData: function () {
        return JSON.parse (fs.readFileSync(this.filename, 'utf-8'));
    },

    generateId: function () {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser) {
            return lastUser.id + 1;
        }
        return 1;
    },

    findAll: function () {
        return this.getData();
    },
//buscar a un usuario por su ID 
    findByPk: function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(element => element.id === id);
        return userFound;
    },
//buscar al usuario que se quiere loguear por un campo
    findByField: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(element => element[field] === text);
        return userFound;
    },
//guardar al usuario en la DB
    create: function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.filename,JSON.stringify (allUsers, null, " "));
        return newUser;
    },
//Editar la informacion de un usuario
    edit: function () {
    //let allUsers = this.findAll();
    /*
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

    */

    /*let allUsers = this.findAll();
    let newUser = {
        id: this.generateId(),
        ...userData
    }
    allUsers.push(newUser);
    fs.writeFileSync(this.filename,JSON.stringify (allUsers, null, " "));
    return newUser;*/
},


//eliminar a un usuario de la DB
    delete: function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(element => element.id !== id);
        fs.writeFileSync(this.filename,JSON.stringify (finalUsers, null, "\t"));
        return true;
    }
}

module.exports = User;
//console.log(User.create({nombre: "manuel", email: "manuel@gmail.com"}));
//console.log(User.delete(3));



