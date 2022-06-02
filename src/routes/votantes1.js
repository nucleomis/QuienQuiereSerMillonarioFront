const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

//aca va el envio para eliminar dos opciones
router.post("/magiaVotoEliminar",(req, res)=>{
  const url = "https://qqsm-api.herokuapp.com/votar/votar";
  console.log('Eligio eliminar 2 preguntas');
  var idmagia = 1;
  var tipoVoto = 3;
  var indice = req.session.indicepregunta;
    var valor1=req.session.juegoiniciado.data.preguntas[indice-1].respuestas[0].respuesta;
    var valor2=req.session.juegoiniciado.data.preguntas[indice-1].respuestas[1].respuesta;
    var valor3=req.session.juegoiniciado.data.preguntas[indice-1].respuestas[2].respuesta;
    var valor4=req.session.juegoiniciado.data.preguntas[indice-1].respuestas[3].respuesta;
  var punto1=1;
  var punto2=2;
  var punto3=3;
  var punto4=4;
  var magia = {id:idmagia,tipoVotacion:tipoVoto,valor1:valor1,valor2:valor2,valor3:valor3,valor4:valor4,punto1:punto1,punto2:punto2,punto3:punto3,punto4:punto4};
 
    (async () => {
  const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(magia)
  });
 
  console.log(magia);
 const question = await rawResponse.json();


})()
});


//aca va el envio para seleccionar la respuesta correcta
router.post("/magiaVotoPopular",(req, res)=>{
  const url = "https://qqsm-api.herokuapp.com/votar/votar";
  console.log('Eligio Voto Popular');
    var idmagia = 1;
    var tipoVoto = 2;
    var indice = req.session.indicepregunta;
    var valor1=req.session.juegoiniciado.data.preguntas[indice-1].respuestas[0].respuesta;
    var valor2=req.session.juegoiniciado.data.preguntas[indice-1].respuestas[1].respuesta;
    var valor3=req.session.juegoiniciado.data.preguntas[indice-1].respuestas[2].respuesta;
    var valor4=req.session.juegoiniciado.data.preguntas[indice-1].respuestas[3].respuesta;
    var punto1=1;
    var punto2=2;
    var punto3=3;
    var punto4=4;
    var magia = {id:idmagia,tipoVotacion:tipoVoto,valor1:valor1,valor2:valor2,valor3:valor3,valor4:valor4,punto1:punto1,punto2:punto2,punto3:punto3,punto4:punto4};
    
  (async () => {
    const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(magia)
  });
  const content = await rawResponse.json();
  console.log(magia);
  


})()
});


//aca va el envio para elegir y mostrar la pista
router.post("/magiaPista",(req, res)=>{
  const url = "https://qqsm-api.herokuapp.com/votar/votar";
  console.log('eligio Pistas');
  var idmagia = 1;
  var tipoVoto = 1;
  var indice = req.session.indicepregunta;
    var valor1=req.session.juegoiniciado.data.preguntas[indice-1].pistas[0].pista;
    var valor2=req.session.juegoiniciado.data.preguntas[indice-1].pistas[1].pista;
    var valor3=0;
    var valor4=0;
  var punto1=1;
  var punto2=2;
  var punto3=3;
  var punto4=4;
  var magia = {id:idmagia,tipoVotacion:tipoVoto,valor1:valor1,valor2:valor2,valor3:valor3,valor4:valor4,punto1:punto1,punto2:punto2,punto3:punto3,punto4:punto4};

(async () => {
  const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(magia)
  });
 
  console.log(magia);
const question = await rawResponse.json();


})()
});

//aca va el envio para elegir y mostrar la pista
router.post("/lamagia",(req, res)=>{
  const url = "https://qqsm-api.herokuapp.com/votar/quevotar";
  
  console.log('Leyendo la tablita magica del Sistema');
    
  (async () => {
    const rawResponse = await fetch(url, {
    method: 'GET'
  });
    const content = await rawResponse.json();
    req.session.valor1=content.data.valor1;
    req.session.valor2=content.data.valor2;
    req.session.valor3=content.data.valor3;
    req.session.valor4=content.data.valor4;
    console.log(req.session.valor1,req.session.valor2,req.session.valor3, req.session.valor4) 
    res.render("votantes1",{valor1:req.session.valor1,valor2:req.session.valor2,valor3:req.session.valor3,valor4:req.session.valor4})

  })()
   //cargo los valores a los botones
  });


//cargo los valores a los botones
router.post("/lamagia2",(req,res)=>{
  var valor1 = req.session.valor1;
  var valor2 = req.session.valor2;
  var valor3 = req.session.valor3;
  var valor4 = req.session.valor4;
  console.log(req.session.valor1,req.session.valor2,req.session.valor3,req.session.valor4)
  
  res.render("votantes1");
});


module.exports = router;