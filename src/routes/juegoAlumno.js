const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.post("/juegoAlumno",(req,res)=>{
  var idJuego = req.session.idJuego;
  var nombreParticipante = req.body.nombreParticipante;

  //tomamos en id del juego recibido y llamamos al endpoint que nos construye el juego
  
  console.log("redireccionando a Pantalla de Juego alumno");
  res.render("juegoAlumno");
})

module.exports = router;