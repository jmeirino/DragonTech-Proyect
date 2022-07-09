//nuevo modelo Producto en /database/models
const db = require("../database/models")




let MainController = {
   
    index: (req,res) => {
        db.Producto.findAll({ 
            include: "categoria"
            
       })
           .then(function (productos) {
            
                return res.render("index",{productos: productos});
               
           })
  }
  
    }




//exportar el controlador
module.exports = MainController;