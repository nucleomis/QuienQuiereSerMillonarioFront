const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.post("/juegoAlumno",(req,res)=>{
  //envio el nombre del participante de la vista participante.hbs

  
  var datosjuego = req.session.juegoiniciado.data;
    console.log(req.session.nombreParticipante)
  //console.log(pregunta);
  //var res1 = req.session.juegoiniciado.preguntas.respuestas.respuesta;
  
    req.session.nombreParticipante = req.body.nombreParticipante; 
    req.session.indicepregunta +=1;
      res.render("juegoAlumno",{idJuego:req.session.idJuego, 
      nombreParticipante:req.session.nombreParticipante, 
      pregunta:datosjuego.preguntas[req.session.indicepregunta].pregunta,
      res1:datosjuego.preguntas[req.session.indicepregunta -1].respuestas[0].respuesta,
      res2:datosjuego.preguntas[req.session.indicepregunta -1].respuestas[1].respuesta,
      res3:datosjuego.preguntas[req.session.indicepregunta -1].respuestas[2].respuesta,
      res4:datosjuego.preguntas[req.session.indicepregunta -1].respuestas[3].respuesta,
      
      
      
    });
    
  
  

});

module.exports = router;