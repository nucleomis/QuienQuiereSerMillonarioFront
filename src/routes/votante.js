const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
router.post("/votante",(req,res)=>{
  var id = req.body.id;
  req.session.idJuego = id;
  console.log("redireccionando a Pantalla de Votante ");
  res.render("votantes1",{btnrespuesta:null, btnpista:null,idJuego:req.session.idJuego })
  
});

router.post("/nuevoVotante",(req,res)=>{
  var id = req.body.id;
  req.session.idJuego = id;
  console.log("redireccionando a Pantalla de Votante ");
  res.render("votante");
});
module.exports = router;