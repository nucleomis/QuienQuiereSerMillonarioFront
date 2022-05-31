const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride =require("method-override");
const  session= require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

//inicializaciones
const app = express();
require("./config/passport");
const User = require("./models/User");

//settings
app.set("port", 3001);//seteo el puerto para el uso en caso de subir a algun servidor y escuchar el puerto, por recomendacion express usa el 3000
app.set("views", path.join(__dirname, "views"));//views usa path.join para setear la direccion de las vistas del proyecto con __dirname seguido del nombre de la carpeta
app.engine(".hbs", exphbs({ //permite el uso de los handlebars en el proyecto usando la libreria express-handlebars
    defaultLayout:"main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname:".hbs",
}));

app.set("view engine", ".hbs");//configuro express para que reconozca las vistas con la extencion .hbs

//midlewares
app.use(express.urlencoded({extended:false}))//para evitar el envio de extenciones como imagenes como .img, .jpg etc
app.use(methodOverride("_method"));
app.use(session({//utilizo de la libreria express-session 
    secret:"mysecretapp",
    resave: true,
    saveUninitialized: true,
}));
app.use(express.json());//para que el servidor entienda los datos en formato json

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
//variables globales
app.use(
    async(req,res, next)=>{
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        res.locals.error = req.flash("error");
        res.locals.user = req.user ||null;
        next();//para que no se quede ejecutando la funcion
});


//routes
app.use(require("./routes/index"));
app.use(require("./routes/verificaUsuario"));
app.use(require("./routes/panelPrincipal"));
app.use(require("./routes/formulario"));
app.use(require("./routes/preguntas"));
app.use(require("./routes/juegoAlumno"));
app.use(require("./routes/participante"));
app.use(require("./routes/votante"));
app.use(require("./routes/votantes1"));
app.use(require("./routes/CerrarSesion"));
//app.use(require("./routes/finJuego"));

//archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

//escucha del servidor
app.listen(app.get("port"), ()=> console.log("Servidor en el puerto ",app.get("port")));

