const express = require("express");
const path = require ("path")
const {body} = require("express-validator")

//validaciones de campos del formulario
const validateUsersCreate = [

        body("nombre").notEmpty().withMessage("Debes completar el campo nombre"),
		body("apellido").notEmpty().withMessage("Debes completar el campo apellido"),
		body("documento").isInt().withMessage("Debes completar un documento válido"),
        body("fechaNacimiento").isDate().withMessage("Debes completar una fecha de nacimiento"),
        body("telefono").isInt().withMessage("Debes completar un telefono válido"),
		body("email").isEmail().withMessage("Debes completar el campo con un email válido"),
        //body("categoria").notEmpty().withMessage("Debes seleccionar una categoría"), este campo ahora es roles_id
        body("password").notEmpty().withMessage("Debes completar el campo password"),
        /*body("img").custom((value, {req}) => {
            let file = req.file;
            let acceptedExtensions = [".jpg", ".png"];

            if (!file) {
                throw new Error("Tienes que subir una imagen");
            }else {
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error("Las extenciones de archivo permitidas son ${acceptedExtensions.join(",")}");
                }
            }
            return true;
        })
        */
            
];

module.exports = validateUsersCreate;