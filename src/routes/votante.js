const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
router.post("/votante",(req,res)=>{
  var id = req.body.id;
  req.session.idJuego = id;
  console.log("redireccionando a Pantalla de Votante ");
  res.render("votante");
})

//formvotante.getElementById("idbtn").addEventListener("click", comodin);


function comodin() {
    formvotante = enabled
    router.post("/participante", (req, res)=>{
        const {conexion}=req.session.idJuego;
            
        if(conexion==1){
            
        }
        if(conexion==2){
            
        }
        if(conexion==3){
            
        }
        else{
           req.flash("alert_msg", "Agregue un ID de Juego");
                   
        }
    
        
    })}



module.exports = router;