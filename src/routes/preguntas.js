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
    var pista1={pista:req.body.pista1};
    var pista2={pista:req.body.pista2};
    var inicial = req.body.inicial;
    
    //var dificultad = req.body.dificultad;
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

    var pistas = [];
    pistas.push(pista1);
    pistas.push(pista2);
    var idProfesor = req.session.idProfesor;
    
    
    const url = "https://qqsm-api.herokuapp.com/juego/crearJuego";
    const urlLocal = "http://localhost:8080/juego/crearJuego";

    if(!req.body.numeroPregunta){
      var contadorPreguntas = 1;
    }
    else{
      var contadorPreguntas = Number.parseInt(req.body.numeroPregunta);
    }

    if(!inicial){
      dificultad = 1;
      req.session.preguntas = [];
      req.session.inicial= 1;
      req.session.dificultad=1;
    }

    var preguntaClass = {pregunta:pregunta,dificultad:req.session.dificultad,respuestas:respuestas,pistas:pistas};


    if(req.body.boton==="SIGUIENTE"){
      req.session.preguntas.push(preguntaClass);
      //console.log(req.session.preguntas);
      contadorPreguntas+=1;
      
    }
    if(req.body.boton==="GUARDAR"){
      dificultad+=1;
      req.session.preguntas.push(preguntaClass);
      req.session.dificultad = dificultad;
      contadorPreguntas = 1;
      habilitado = null;
    }

    if(req.body.boton==="FINALIZAR"){
    
      req.session.preguntas.push(preguntaClass);
      var data = {idProfesor: req.session.idProfesor, nombreJuego: req.session.nombreJuego,preguntas: req.session.preguntas};
      const url2 = "https://qqsm-api.herokuapp.com/usuario/";
      const urlLocal2 = "http://localhost:8080/usuario/";
      console.log(data);
      (async () => {
        const rawResponse = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const content = await rawResponse.json();
        (async () => {
          const rawResponse = await fetch(url2+req.session.idProfesor, {
            method: 'GET'
          });
          const usuario = await rawResponse.json();
          console.log("dentro de finalizar para redireccionar: "+usuario.data.id);
          //redirecciono a la pagina que quiero y envio los datos obtenidos
          req.session.idProfesor = usuario.data.id;
          req.session.nombre = usuario.data.nombre;
          req.session.apellido = usuario.data.apellido;
          req.session.user = usuario.data.user;
          req.session.content = usuario;
          req.session.juegos = usuario.data.juegos;

          res.render("panelPrincipal", 
          { content: req.session.content, 
            juegos: req.session.juegos, 
            nombre:req.session.nombre,
            apellido:req.session.apellido,
            user:req.session.user
          });
        })();
        
      })();
      
    }
    if(req.session.dificultad==3){
      finalizar = true;
    }
    if(contadorPreguntas>=4){
      habilitado = true;
    }
    if(req.body.boton==="FINALIZAR"){
      res.render("panelPrincipal", 
      { content: req.session.content, 
        juegos: req.session.juegos, 
        nombre:req.session.nombre,
        apellido:req.session.apellido,
        user:req.session.user
      });
    }else{
      res.render("preguntas",{success_msg:req.body.success_msg,dificultad:req.session.dificultad, inicial:true, habilitado:habilitado, numeroPregunta:contadorPreguntas, finalizar:finalizar, nombreJuego:req.session.nombreJuego});
    }
    
});

router.post("/borrarJuego",(req,res)=>{
  var id = req.body.id;
  const url = "https://qqsm-api.herokuapp.com/juego/borrarJuego";
  const url2 = "https://qqsm-api.herokuapp.com/usuario/";
  const urlLocal = "http://localhost:8080/juego/borrarJuego";
  const urlLocal2 = "http://localhost:8080/usuario/";

  var cuerpo = {id:id};


  console.log(cuerpo);
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

    console.log("usuario: "+ req.session.user);

    (async () => {
      const rawResponse = await fetch(url2+req.session.idProfesor, {
        method: 'GET'
      });
      const usuario = await rawResponse.json();
      console.log(usuario.data.id);
      //redirecciono a la pagina que quiero y envio los datos obtenidos
      console.log(usuario.data.juegos);
      req.session.idProfesor = usuario.data.id;
      req.session.nombre = usuario.data.nombre;
      req.session.apellido = usuario.data.apellido;
      req.session.user = usuario.data.user;
      req.session.content = usuario;
      req.session.juegos = usuario.data.juegos;
      res.render("panelPrincipal", {content: usuario, juegos: usuario.data.juegos, nombre:usuario.data.nombre,apellido:usuario.data.apellido,user:usuario.data.user});
    })()
   
})();


});
module.exports=router;