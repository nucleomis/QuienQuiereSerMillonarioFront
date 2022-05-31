const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.post("/nuevoJuego",(req,res)=>{
  console.log("redireccionando a nueva pregunta");
  res.render("nuevoJuego");
})


router.post("/formulariopreguntas",(req,res)=>{

  var nombreJuego = req.body.nombreJuego;
  
  req.session.nombreJuego = nombreJuego;

  console.log("redireccionando a nueva pregunta");

  res.render("preguntas", {nombreJuego: nombreJuego});

});


router.post("/preguntas", (req, res)=>{
    var nombreJuego = req.session.nombreJuego;
    var pregunta=req.body.pregunta;
    var res1=req.body.res1;
    var res2=req.body.res2;
    var res3=req.body.res3;
    var res4=req.body.res4;
    var pista1=req.body.pista1;
    var pista2=req.body.pista2;
    var inicial = req.body.inicial;
    
    var dificultad = req.body.dificultad;
    var habilitado = null;
    var finalizar = null;
    var respuesta1 = {respuesta:res1,correcto:1};
    var respuesta2 = {respuesta:res2,correcto:2};
    var respuesta3 = {respuesta:res3,correcto:2};
    var respuesta4 = {respuesta:res4,correcto:2};
    //aca armo los objetos para armar el juego
    var respuestas = [];
    respuestas.push(respuesta1);
    respuestas.push(respuesta2);
    respuestas.push(respuesta3);
    respuestas.push(respuesta4);

    var pistas = {pista1,pista2};
    var idProfesor = req.session.idProfesor;
    
    var preguntas = [{pregunta:pregunta,dificultad:dificultad,respuestas:respuestas,pistas:pistas}];
    var juegoArmado = {idProfesor:idProfesor,nombreJuego:nombreJuego,preguntas:preguntas};

    console.log(juegoArmado);
    console.log(juegoArmado.preguntas[0].respuestas)
    


    var miprimeravez = {juegoArmado:juegoArmado}
    const url = "https://qqsm-api.herokuapp.com/juego/crearJuego";


    if(!req.body.numeroPregunta){
      var contadorPreguntas = 1;
    }
    else{
      var contadorPreguntas = Number.parseInt(req.body.numeroPregunta);
    }

    if(!inicial){
      req.session.inicial= 1;
      req.session.listaPreguntas=[];
      req.session.listaRespuestas=[];
      req.session.listaPistas=[];
      req.session.dificultad=1;
    }

    if(req.body.boton==="SIGUIENTE"){
      req.session.listaRespuestas.push(respuestas);
      req.session.listaPistas.push(pistas);
      req.session.listaPreguntas.push(pregunta);
      contadorPreguntas+=1;
      
    }
    if(req.body.boton==="GUARDAR"){
      req.session.listaPreguntas.push({pregunta,res1,res2,res3,res4,pista1,pista2,dificultad});
      req.session.dificultad += 1;
      contadorPreguntas = 1;
      habilitado = null;
    }

    if(req.body.boton==="FINALIZAR"){
      (async () => {
        const rawResponse = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(miprimeravez)
        });
        const content = await rawResponse.json();
        
      })();
    }

    if(req.session.dificultad==3){
      finalizar = true;
    }

    if(contadorPreguntas>=4){
      habilitado = true;
    }
    res.render("preguntas",{success_msg:req.body.success_msg,dificultad:req.session.dificultad, inicial:true, habilitado:habilitado, numeroPregunta:contadorPreguntas, finalizar:finalizar, nombreJuego:req.session.nombreJuego});

});

router.post("/borrarJuego",(req,res)=>{
  var id = req.body.id;
  const url = "https://qqsm-api.herokuapp.com/juego/borrarJuego";
  var cuerpo = {id:id};

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

    req.session.juegos = content.data;

    console.log("usuario: "+ content.data);

    res.redirect("/index");
})();
});
module.exports=router;