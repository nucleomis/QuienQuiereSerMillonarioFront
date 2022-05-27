const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.post("/juegoAlumno",(req,res)=>{
  //envio el nombre del participante de la vista participante.hbs
  req.session.nombreParticipante = req.body.nombreParticipante;
  
  
  console.log("redireccionando a Pantalla de Juego alumno");
  res.render("juegoAlumno",{idJuego:req.session.idJuego, nombreParticipante:req.session.nombreParticipante});
})

module.exports = router;