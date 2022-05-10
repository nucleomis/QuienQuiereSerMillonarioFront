const express = require("express");//archivo donde voy a enlazar mi pagina y ver el formulario
//const Juego = require("../models/Juego");//llamo al modelo de notas para la base de datos
const {isAuthenticated} =  require("../helpers/autenticacion");

const router = express.Router();


router.get("/panelPrincipal",isAuthenticated, async (req, res)=>{
    res.render("juegoAlumno", {idjuego});
    res.redirect("/juegoAlumno", {idjuego});


});
module.exports = router;