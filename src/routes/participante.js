const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
router.post("/participante",(req,res)=>{
  console.log("redireccionando a Pantalla de Juego alumno");
  res.render("participante");
})



module.exports = router;