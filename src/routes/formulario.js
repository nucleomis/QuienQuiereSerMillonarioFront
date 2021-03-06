const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
router.post("/registrar",(req, res)=>{
    req.session.nombre=req.body.nombre;
    req.session.apellido=req.body.apellido;
    var direccion=req.body.direccion;
    var user = req.body.user;
    var email=req.body.email;
    var password = req.body.password;
    var cuerpo = {nombre:req.session.nombre, apellido:req.session.apellido, direccion:direccion,user: user, email:email, password: password}
    var dato = "Gracias por registrarte " + req.session.nombre + " " + req.session.apellido + ". Ahora Inicia Sesion";
    const url = "https://qqsm-api.herokuapp.com/usuario/registrar";
    const urlLocal = "http://localhost:8080/usuario/registrar";
    console.log('ingresando a fetch');
    
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
      res.render("index",{dato:dato,nombre:req.session.nombre, apellido:req.session.apellido,})
    })();
});
module.exports = router;