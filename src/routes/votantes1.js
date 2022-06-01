const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

//aca va el envio para eliminar dos opciones
router.post("/magiaVotoPopular",(req, res)=>{
  const url = "https://qqsm-api.herokuapp.com/votar/votar";
  console.log('Introduciendo la Magia al Sistema');
    var idmagia = 1;
    var tipoVoto = 3;
    var valor1=req.session.res1;
    var valor2=req.session.res2;
    var valor3=req.session.res3;
    var valor4=req.session.res4;
    var magia = {id:idmagia,tipoVotacion:tipoVoto,valor1:valor1,valor2:valor2,valor3:valor3,valor4:valor4};
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


});
})


//aca va el envio para seleccionar la respuesta correcta
router.post("/magiaVotoPopular",(req, res)=>{
  const url = "https://qqsm-api.herokuapp.com/votar/votar";
  console.log('Introduciendo la Magia al Sistema');
    var idmagia = 1;
    var tipoVoto = 2;
    var valor1=req.session.res1;
    var valor2=req.session.res2;
    var valor3=req.session.res3;
    var valor4=req.session.res4;
    var magia = {id:idmagia,tipoVotacion:tipoVoto,valor1:valor1,valor2:valor2,valor3:valor3,valor4:valor4};
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


});
})


//aca va el envio para elegir y mostrar la pista
router.post("/magiaPista",(req, res)=>{
  const url = "https://qqsm-api.herokuapp.com/votar/votar";
  console.log('Introduciendo la Magia al Sistema');
    var idmagia = 1;
    var tipoVoto = 1;
    var valor1=req.session.pista1;
    var valor2=req.session.pista2;

    var magia = {id:idmagia,tipoVotacion:tipoVoto,valor1:valor1,valor2:valor2};
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


});
})

//aca va el envio para elegir y mostrar la pista
router.post("/lamagia",(req, res)=>{
  const url = "https://qqsm-api.herokuapp.com/votar/quevotar";
  console.log('Leyendo la tablita magica del Sistema');
    
(async () => {
  const rawResponse = await fetch(url, {
    method: 'GET'
  });
    const tablita = await rawResponse.json();
    req.session.valor1=tablita.data.valor1;
    req.session.valor2=tablita.data.valor2;
    req.session.valor3=tablita.data.valor3;
    req.session.valor4=tablita.data.valor4;
    console.log(req.session.valor1,req.session.valor2,req.session.valor3,req.session.valor4) 

  });
   
  res.render("votantes1",{valor1:req.session.valor1,valor2:req.session.valor2,valor3:req.session.valor3,valor4:req.session.valor4})
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