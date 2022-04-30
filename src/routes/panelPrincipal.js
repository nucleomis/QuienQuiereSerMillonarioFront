const express = require("express");//archivo donde voy a enlazar mi pagina y ver el formulario
//const Juego = require("../models/Juego");//llamo al modelo de notas para la base de datos
const {isAuthenticated} =  require("../helpers/autenticacion");

const router = express.Router();

router.get("/games/nuevo_juego", isAuthenticated,(req, res)=>{
    res.render("games/nuevo_juego");
});

//recibo la peticion de agregar un nuevo juego
router.post("/games/nuevo_juego",isAuthenticated, async (req, res)=>{//async indica que van a existir procesos asincronos
    const {nombre, fecha_creacion}=req.body;//obtengo del formulario el nombre y la fecha de creacion del objeto formulario
    const error = [];

    if(!nombre){
        error.push({text: "Por favor ingrese un nombre"});
    }
    if(error.length>0){
        res.render("games/nuevo_juego",{
            error,
            nombre,
        })
    }
    else{
       const nuevo_juego =  new Juego({nombre, fecha_creacion});
       nuevo_juego.user = req.user.id;
       await nuevo_juego.save();//guardo en la base de datos, con await hago que el proceso de guardado lleve un tiempo determinado
       req.flash("success_msg", "Juego agregado con exito");//llamo a la variable global con flash
       res.redirect("/games");
       
    }

    
});
//listo los juegos y las envio a /games
router.get("/games",isAuthenticated, async (req, res)=>{
    const juegos = await (await Nota.find({user: req.user.id}).lean()).reverse();//obtengo la lista de objetos y los ordeno 
    res.render("games/lista_juegos", {juegos});
    
});

//editar las notas
router.get("/games/editar/:id",isAuthenticated, async (req, res)=>{
    const juego =  await Juego.findById(req.params.id).lean();//obtengo el parametro que me pasa desde el url
    res.render("games/editar", {juego});
});

//recepcion de la nota ya editada
router.post("/games/editar_nota/:id",isAuthenticated, async (req, res)=>{
    const {nombre, fecha_creacion} = req.body;
    await Juego.findByIdAndUpdate(req.params.id, {nombre, fecha_creacion}).lean();
    req.flash("success_msg", "Juego actualizado correctamente");//envio los mensajes de confirmacion a la vista
    res.redirect("/games");
});

//borrar notas
router.delete("/games/borrar/:id",isAuthenticated, async (req, res)=>{
    await Juego.findByIdAndDelete(req.params.id).lean();
    req.flash("success_msg", "Juego borrado correctamente");//envio los mensajes de confirmacion a la vista
    res.redirect("/games");
});

module.exports = router;