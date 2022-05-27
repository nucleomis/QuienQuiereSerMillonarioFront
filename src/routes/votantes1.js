const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
router.post("/votantes1",(req,res)=>{
  var id = req.body.id;
  req.session.idJuego = id;
  console.log("redireccionando a Pantalla de Votante ");
  res.render("votantes1");
})

module.exports = router;