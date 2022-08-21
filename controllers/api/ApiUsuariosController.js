const db = require("../../database/models")

let apiUsuariosController = {
     listAll: (req,res) => {
        let allUsers = db.Usuario.findAll({ where: {
            activo: 1
       } });

        Promise.all([allUsers])
        .then(function ([usuarios]) {
            let usuariosJSON = usuarios.map(usuario => {
                return {
                    id: usuario.id,
                    name: usuario.nombre,
                    email: usuario.email,
                    detail: req.protocol + '://' + req.get('host') + '/api/users/' + usuario.id
                }
            });

            return res.status(200).json({
                count: usuarios.length,
                users: usuariosJSON,
            });
        })
        .catch(function (error) {
            return res.status(500).json(error)
        });
    },
    listById: (req,res) => {
        let datausuario = db.Usuario.findByPk(req.params.id);
        
        Promise.all([datausuario])
        .then(function ([usuario]) {
          
            return res.status(200).json({
                id: usuario.id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                documento: usuario.documento,
                fechaNacimiento: usuario.fechaNacimiento,
                telefono: usuario.telefono,
                email: usuario.email,
                img_url: req.protocol + '://' + req.get('host') + '/img/imgUsers/' + usuario.img
            });
        })
        .catch(function (error) { console.log(error);
            return res.status(500).json(error)
        });
    }
};


module.exports = apiUsuariosController;