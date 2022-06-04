const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.post("/juegoAlumno",(req,res)=>{
  req.session.nropreg = req.session.indicepregunta+1;
 

  if (req.session.nropreg<=10){
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
    //guardo la dificultad de la+ pregunta
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
      nropreg:req.session.nropreg,dato:req.session.respuesta,
    });
  }
  else{
    res.render("finJuego",
  { idJuego:req.session.idJuego,
    puntaje: req.session.puntaje, 
    nombreParticipante:req.session.nombreParticipante, 

  });
  }
});


router.post("/respuesta",(req,res)=>{
  var respuesta = req.body.respuesta;
  var correcta = req.session.respuesta;

  console.log("capturo la respuesta correcta: "+ correcta);
  console.log("capturo los botones: "+req.body.respuesta);


  if(respuesta===correcta){
    if(req.session.nivel===1){
      
      req.session.puntaje += 7;
      var dato = "Respuesta correcta";
    }
    if(req.session.nivel===2){
      
      req.session.puntaje += 10;
      var dato = "Respuesta correcta";
    }
    if(req.session.nivel===3){
      
      req.session.puntaje += 14;
      var dato = "Respuesta correcta";
    }
    
  }
  else{
    dato = "Respuesta incorrecta!";
  }
  var datosjuego = req.session.juegoiniciado.data;
  res.render("juegoAlumno",
    { idJuego:req.session.idJuego,
      puntaje: req.session.puntaje, 
      dato: dato,
      idJuego:req.session.idJuego,
      puntaje: req.session.puntaje, 
      nombreParticipante:req.session.nombreParticipante, 
      pregunta:datosjuego.preguntas[req.session.indicepregunta-1].pregunta,
      res1:datosjuego.preguntas[req.session.indicepregunta -1].respuestas[0].respuesta,
      res2:datosjuego.preguntas[req.session.indicepregunta -1].respuestas[1].respuesta,
      res3:datosjuego.preguntas[req.session.indicepregunta -1].respuestas[2].respuesta,
      res4:datosjuego.preguntas[req.session.indicepregunta -1].respuestas[3].respuesta,
      dato:req.session.respuesta,
    });
  
});

/*router.post("/solucion",(req,res)=>{
  var dato = "la respuesta correcta es: "+req.session.respuesta;
  var datosjuego = req.session.juegoiniciado.data;
  res.render("juegoAlumno",
    { idJuego:req.session.idJuego,
      puntaje: req.session.puntaje, 
      dato: dato,
      idJuego:req.session.idJuego,
      puntaje: req.session.puntaje, 
      nombreParticipante:req.session.nombreParticipante, 
      pregunta:datosjuego.preguntas[req.session.indicepregunta-1].pregunta,
      res1:datosjuego.preguntas[req.session.indicepregunta -1].respuestas[0].respuesta,
      res2:datosjuego.preguntas[req.session.indicepregunta -1].respuestas[1].respuesta,
      res3:datosjuego.preguntas[req.session.indicepregunta -1].respuestas[2].respuesta,
      res4:datosjuego.preguntas[req.session.indicepregunta -1].respuestas[3].respuesta,
    });

});*/

/// MUESTRO LA MAS VOTADA

router.post("/mostrarVotacion",(req, res)=>{
  const url = "https://qqsm-api.herokuapp.com/votar/quevotar";
    
  (async () => {
    const rawResponse = await fetch(url,{
      method: 'GET'
    });
    const content = await rawResponse.json();
    req.session.content=content;
    console.log(req.session.content);
    req.session.id = content.data.id;
    req.session.tipoVotacion = content.data.tipoVotacion;
    req.session.valor1 = content.data.valor1;
    req.session.valor2 = content.data.valor2;
    req.session.valor3 = content.data.valor3;
    req.session.valor4 = content.data.valor4;
    req.session.puntoa = content.data.punto1;
    req.session.puntob = content.data.punto2;
    req.session.puntoc = content.data.punto3;
    req.session.puntod = content.data.punto4;
    req.session.content = content.data;
    
      var magia = {id:1,
      tipoVotacion:req.session.tipoVotacion,
      valor1:req.session.valor1,
      valor2:req.session.valor2,
      valor3:req.session.valor3,
      valor4:req.session.valor4,
      punto1:req.session.puntoa,
      punto2:req.session.puntob,
      punto3:req.session.puntoc,
      punto4:req.session.puntod};
      
      console.log(magia);

      //
      let kokiArrayRespuesta = [magia.valor1,magia.valor2,magia.valor3,magia.valor4];
      let kokiArrayPuntaje= [magia.punto1,magia.punto2,magia.punto3,magia.punto4];
      req.session.puntajeGanador;
      req.session.respuestaGanadora;
      indice=0;  
      var puntajeGanador=0;
      for (let indice = 0; indice < kokiArrayRespuesta.length; indice++) {
        if (  kokiArrayPuntaje[indice] > puntajeGanador){
          puntajeGanador = kokiArrayPuntaje[indice];
          req.session.puntajeGanador=kokiArrayPuntaje[indice];
          req.session.respuestaGanadora=kokiArrayRespuesta[indice];
          console.log(req.session.puntajeGanador)
        }       
              
      }
      console.log("Respuesta Ganadora:"+req.session.respuestaGanadora+" con: "+req.session.puntajeGanador+" puntos.")
      
      
    

  })()

      
});



module.exports = router;