//llamar al router de express
const express = require("express");
const path = require ("path")


//llamar a multer (procesar archivos)

const multer = require("multer");

const storage = multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/img/imgUsers"))
    },
    filename: function(req, file, cb) {
        let imagenUsuario = Date.now() + path.extname(file.originalname);
        cb(null, imagenUsuario);
    }
})

const upload = multer ({ storage : storage })

module.exports = upload;

