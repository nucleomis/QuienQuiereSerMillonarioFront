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
    var dificultad=req.body.dificultad;
    const url = "https://qqsm-api.herokuapp.com/usuario/preguntas";
   
    (async () => {
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

        
        
    });
})
module.exports=router;