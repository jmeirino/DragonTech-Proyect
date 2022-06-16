const fs = require('fs');
//const path = require('path');



const Product = {
    filename: "./database/productos.json",

    getData: function () {
        return JSON.parse (fs.readFileSync(this.filename, 'utf-8'));
    },

    generateId: function () {
        let allProducts = this.findAll();
        let lastProduct = allProducts.pop();
        if (lastProduct) {
            return lastProduct.id + 1;
        }
        return 1;
    },

    findAll: function () {
        return this.getData();
    },
//buscar a un usuario por su ID 
    findByPk: function (id) {
        let allProducts = this.findAll();
        let productFound = allProducts.find(element => element.id === id);
        return productFound;
    },
//buscar al usuario que se quiere loguear por un campo
    findByField: function (field, text) {
        let allProducts = this.findAll();
        let productFound = allProducts.find(element => element[field] === text);
        return productFound;
    },
    //guardar al usuario en la DB
    create: function (productData) {
        let allProducts = this.findAll();
        let newProduct = {
            id: this.generateId(),
            ...productData
        }
        allProducts.push(newProduct);
        fs.writeFileSync(this.filename,JSON.stringify (allProducts, null, " "));
        return newProduct;
    },
    //Editar la informacion de un usuario
    edit: function () {
    /*No creada en el modelo*/
    },


//eliminar a un usuario de la DB
    delete: function (id) {
        let allProducts = this.findAll();
        let finalProducts = allProducts.filter(element => element.id !== id);
        fs.writeFileSync(this.filename,JSON.stringify (finalProducts, null, "\t"));
        return true;
    }
}

module.exports = Product;




