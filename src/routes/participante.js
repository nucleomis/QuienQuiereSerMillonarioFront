const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.post("/jugando",(req,res)=>{
  req.session.idJuego = req.body.id;
  var id=req.body.id;
  var cuerpo = {id:id}
  
  const url = "https://qqsm-api.herokuapp.com/juego/iniciojuego";
  (async () => {
    const rawResponse = await fetch(url, {
    
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cuerpo)
    });
    
  const content = await rawResponse.json();
  
  req.session.juegoiniciado = content;
    req.session.indicepregunta = 0;
  res.render("participante")
  
  })();
  });
module.exports = router;