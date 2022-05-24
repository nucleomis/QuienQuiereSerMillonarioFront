const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
router.post("/votante",(req,res)=>{
  var id = req.body.id;
  req.session.idJuego = id;
  console.log("Ingreso a la pantalla del votante con el id de juego: "+id);
  res.render("votante");
})

document.getElementById("idbtn").addEventListener("click", comodin);


function comodin() {
    
    router.post("/participante", (req, res)=>{
        const {conexion}=req.body;
            
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