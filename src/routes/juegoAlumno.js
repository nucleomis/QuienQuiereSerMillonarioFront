const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
router.post("/juegoAlumno",(req,res)=>{
  console.log("redireccionando a Pantalla de Juego alumno");
  res.render("juegoAlumno");
})



module.exports = router;