const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
router.post("/nuevapregunta",(req,res)=>{
  console.log("redireccionando a nueva pregunta");
  res.render("preguntas");
})


router.post("/preguntas",(req, res)=>{
    var pregunta=req.body.pregunta;
    var res1=req.body.res1;
    var res2=req.body.res2;
    var res3=req.body.res3;
    var res4=req.body.res4;
    var inicial = req.body.inicial;
    var dificultad = req.body.dificultad;
    var habilitado = null;
    var finalizar = null;
    const url = "https://qqsm-api.herokuapp.com/usuario/preguntas";

    if(!req.body.numeroPregunta){
      var contadorPreguntas = 1;
    }
    else{
      var contadorPreguntas = Number.parseInt(req.body.numeroPregunta);
    }

    if(!inicial){
      req.session.inicial= 1;
      req.session.listaPreguntas=[];
      req.session.dificultad=1;
    }

    if(req.body.boton=="siguiente"){
      req.session.listaPreguntas.push({pregunta,res1,res2,res3,res4,dificultad});
      contadorPreguntas+=1;
    }
    if(req.body.boton==="guardar"){
      req.session.listaPreguntas.push({pregunta,res1,res2,res3,res4,dificultad});
      req.session.dificultad += 1;
      contadorPreguntas = 1;
      habilitado = null;
    }

    if(req.session.dificultad==3){
      finalizar = true;
    }

    if(contadorPreguntas>=4){
      habilitado = true;
    }
    res.render("preguntas",{success_msg:req.body.success_msg,dificultad:req.session.dificultad, inicial:true, habilitado:habilitado, numeroPregunta:contadorPreguntas, finalizar:finalizar});


   
    /*(async () => {
        var preguntasbody = {pregunta:pregunta, res1:res1, res2:res2,res3:res3, res4:res4, dificultad:dificultad}
        
        const rawResponse = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(preguntasbody)
         
        });
        console.log("Ingreso Exitoso")
        res.render("preguntas")

        
        
    });*/
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