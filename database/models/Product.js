module.exports = function (sequelize, dataTypes) {
    let alias = "Producto"
    //Hay que chequear que todo este bien
    let cols = {
        
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
		marca: {
            type: dataTypes.STRING
        },
		modelo: {
            type: dataTypes.STRING
        },
		precio: {
            type: dataTypes.STRING
        },
		detalle: {
            type: dataTypes.STRING
        },
		email: {
            type: dataTypes.STRING
        },
		img: {
            type: dataTypes.STRING
        },
		usuarios_id: {
            type: dataTypes.STRING
        },
        categorias_id: {
            type: dataTypes.INTEGER
        }

    }

    let config = {
        tableName: "productos",
        timestamps:false
    }

    let Producto = sequelize.define(alias, cols, config)

    Producto.associate = function (models) {
        Producto.belongsTo(models.Categoria, {
            as: "categoria",
            foreignKey: "categorias_id"
        })
    }


    return Producto
}