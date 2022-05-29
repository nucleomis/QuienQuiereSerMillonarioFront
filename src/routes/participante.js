const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.post("/jugando",(req,res)=>{
  
  var id=req.body.id;
  var cuerpo = {id:22}
  
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
  
  //req.session.res1 = content.data.preguntas.respuestas.respuesta;
  //req.session.res2 = content.data.preguntas.respuestas.respuesta;
  //req.session.res3 = content.data.preguntas.respuestas.respuesta;
  //req.session.res4 = content.data.preguntas.respuestas.respuesta;


  //console.log(content)
  res.render("participante")
  
  })();
  });


module.exports = router;