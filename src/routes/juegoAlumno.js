const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.post("/juegoAlumno",(req,res)=>{
  //envio el nombre del participante de la vista participante.hbs

  
  var datosjuego = req.session.juegoiniciado.data;
    console.log(req.session.nombreParticipante)
  //console.log(pregunta);
  //var res1 = req.session.juegoiniciado.preguntas.respuestas.respuesta;
    
    if(req.session.nombreParticipante===undefined){
      req.session.nombreParticipante = req.body.nombreParticipante;
      req.session.puntaje = 0; 
    }
    req.session.indicepregunta +=1;

    //voy a guardar la respuesta correcta para evaluar cuando sea necesario
    for(var i=0;i<4;i++){
      if(datosjuego.preguntas[req.session.indicepregunta -1].respuestas[i].correcto===1){
        req.session.respuesta = datosjuego.preguntas[req.session.indicepregunta -1].respuestas[i].respuesta;
    } 
  }
    //guardo la dificultad de la pregunta
    req.session.nivel = datosjuego.preguntas[req.session.indicepregunta -1].dificultad;
    //guardo las pistas de la pregunta
    req.session.pistas = datosjuego.preguntas[req.session.indicepregunta -1].pistas;
    console.log("correcta "+req.session.respuesta);

      res.render("juegoAlumno",
    { idJuego:req.session.idJuego,
      puntaje: req.session.puntaje, 
      nombreParticipante:req.session.nombreParticipante, 
      pregunta:datosjuego.preguntas[req.session.indicepregunta-1].pregunta,
      res1:datosjuego.preguntas[req.session.indicepregunta -1].respuestas[0].respuesta,
      res2:datosjuego.preguntas[req.session.indicepregunta -1].respuestas[1].respuesta,
      res3:datosjuego.preguntas[req.session.indicepregunta -1].respuestas[2].respuesta,
      res4:datosjuego.preguntas[req.session.indicepregunta -1].respuestas[3].respuesta,
    });
});

router.post("/respuesta",(req,res)=>{
  var respuesta = req.body.respuesta;
  var correcta = req.session.respuesta;

  if(respuesta===correcta){
    if(req.session.nivel===1){
      req.session.puntaje += 7;
    }
    if(req.session.nivel===2){
      req.session.puntaje += 10;
    }
    if(req.session.nivel===3){
      req.session.puntaje += 14;
    }
  }

  res.render("juegoAlumno",
    { idJuego:req.session.idJuego,
      puntaje: req.session.puntaje, 
      nombreParticipante:req.session.nombreParticipante, 
      pregunta:datosjuego.preguntas[req.session.indicepregunta-1].pregunta,
      res1:datosjuego.preguntas[req.session.indicepregunta -1].respuestas[0].respuesta,
      res2:datosjuego.preguntas[req.session.indicepregunta -1].respuestas[1].respuesta,
      res3:datosjuego.preguntas[req.session.indicepregunta -1].respuestas[2].respuesta,
      res4:datosjuego.preguntas[req.session.indicepregunta -1].respuestas[3].respuesta,
    });
  
});

module.exports = router;