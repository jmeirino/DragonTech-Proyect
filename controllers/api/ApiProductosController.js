const db = require("../../database/models")

let apiProductosController = {
     listAll: (req,res) => {
        let allProducts = db.Producto.findAll({ include: ['categoria'] });
        let allCategories = db.Categoria.findAll({ include: ['productos'] });

        Promise.all([allProducts, allCategories])
        .then(function ([productos, categorias]) {
            let productosJSON = productos.map(producto => {
                return {
                    id: producto.id,
                    name: producto.marca + ' ' + producto.modelo,
                    description: producto.detalle,
                    categoria: producto.categoria,
                    img: producto.img,
                    detail: req.protocol + '://' + req.get('host') + '/api/products/' + producto.id
                }
            });

            
            let categoriasCount = categorias.map(categoria => {
                return {
                    [categoria.nombre]: categoria.productos.length
                }
            });
            return res.status(200).json({
                count: productos.length,
                countByCategory: flatten(categoriasCount),
                products: productosJSON,
            });
        })
        .catch(function (error) {
            return res.status(500).json(error)
        });
    },
    listById: (req,res) => {
        let dataproducto = db.Producto.findByPk(req.params.id, {
            include:[{association: "categoria"}]});
        
        Promise.all([dataproducto])
        .then(function ([producto]) {
          
            return res.status(200).json({
                ...producto.toJSON(),
                img_url: req.protocol + '://' + req.get('host') + '/img/imgProducts/' + producto.img
            });
        })
        .catch(function (error) { console.log(error);
            return res.status(500).json(error)
        });
    }
};

function flatten (obj){
    const result = {};
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (typeof value === 'object') {
        const flattened = flatten(value);
        Object.keys(flattened).forEach( subKey => {
           result[subKey] = flattened[subKey]
        })
      } else {
        result[key] = value
      }
    });
    return result;
  }
  

module.exports = apiProductosController;