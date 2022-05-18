const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
router.post("/registrar",(req, res)=>{
    var nombre=req.body.nombre;
    var apellido=req.body.apellido;
    var direccion=req.body.direccion;
    var user = req.body.user;
    var email=req.body.email;
    var password = req.body.password;
    var cuerpo = {nombre:nombre, apellido:apellido, direccion:direccion,user: user, email:email, password: password}
    console.log(nombre);
    const url = "https://qqsm-api.herokuapp.com/usuario/registrar";
    console.log('ingresando a fetch');
    console.log(apellido);
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
      res.render("panelPrincipal")
    })();
});
module.exports = router;