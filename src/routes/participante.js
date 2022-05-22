const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
router.post("/participante",(req,res)=>{
  var id = req.body.id;
  req.session.idJuego = id;
  console.log("redireccionando a Pantalla del Juego participante con el id de juego: "+id);
  res.render("participante",{idJuego:req.session.idJuego});
})

module.exports = router;