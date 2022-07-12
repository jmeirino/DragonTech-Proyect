module.exports = function (sequelize, dataTypes) {
    let alias = "Usuario"

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
		nombre: {
            type: dataTypes.STRING
        },
		apellido: {
            type: dataTypes.STRING
        },
		documento: {
            type: dataTypes.STRING
        },
		fechaNacimiento: {
            type: dataTypes.STRING
        },
		telefono: {
            type: dataTypes.STRING
        },
		email: {
            type: dataTypes.STRING
        },
		password: {
            type: dataTypes.STRING
        },
		img: {
            type: dataTypes.STRING
        },
        roles_id: {
            type: dataTypes.INTEGER
        },
        activo: {
            type: dataTypes.INTEGER,
            allowNull: false
        }

    }

    let config = {
        tableName: "usuarios",
        timestamps:false
    }

    let Usuario = sequelize.define(alias, cols, config)

    Usuario.associate = function (models) {
        Usuario.belongsTo(models.Rol, {
            as: "rol",
            foreignKey: "roles_id"
        })
    }


    return Usuario
}