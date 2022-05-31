const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.post("/juegoAlumno",(req,res)=>{
 
console.log("indice pregunta"+req.session.indicepregunta)
console.log("nro pregunta"+req.session.nropreg)
});

module.exports = router;