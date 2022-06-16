//importar express
const express = require ('express');
//importar session
const session = require ('express-session');
//importar cookies
const cookies = require ('cookie-parser');
//vista header segun este logueado o no
const userLogged = require("./middlewares/userLogged");
//importar method override  (PUT Y DELETE)
const methodOverride = require("method-override");
//importar el router
const mainRouter = require ('./routes/main');
const usersRouter = require ('./routes/users');
const administradorRouter = require ('./routes/administrador');
const productsRouter = require ('./routes/products');

const app = express();
const port = 3000;


//session
app.use(session({ 
  secret: "shh",
  resave: false,
  saveUninitialized: false
}));

//cookies
app.use(cookies());

//vista header segun este logueado o no
app.use(userLogged);

//para usar metodo Put y Delete
app.use(methodOverride("_method"));

//para usar metodo POST
app.use(express.urlencoded({ extended:false}));
app.use(express.json());

//archivos estaticos
app.use(express.static("public"));

//template engine - motor de plantillas (en este caso ejs)
app.set("view engine", "ejs");


//usar los get del router
app.use("/", mainRouter);
app.use("/users", usersRouter);
app.use("/administrador", administradorRouter)
app.use("/productos", productsRouter)

//levantar servidor 
app.listen(process.env.PORT || port, () => {
  console.log("Levantando un servidor con Express")
});