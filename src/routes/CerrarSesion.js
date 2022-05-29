const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
router.post("/cerrar",(req,res)=>{
  
  req.session.idJuego = req.body.id;
  console.log("redireccionando a Pantalla del Juego participante con el id de juego: "+req.session.idJuego);
  res.render("juegoAlumno");
})

module.exports = router;