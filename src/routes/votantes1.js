const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.post("/votantes1",(req, res)=>{
  //res.render("index");//para renderizar y enviar el archivo con el nombre y la extencion previamente configurada como .hbs
  var usuario = req.body.usuario;
  var password = req.body.password;;
  const url = "https://qqsm-api.herokuapp.com/usuario/verificarUsuario"
  console.log('ingresando a fetchito');

(async () => {
  const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({usuario: usuario, password: password})
  });
console.log("llego aqui");
const question = await rawResponse.json();

console.log(question);
//redirecciono a la pagina que quiero y envio los datos obtenidos
console.log(question.data.idProfesor, question.data.nombreJuego);
req.session.nombre = usuario.data.nombre;
req.session.apellido = usuario.data.apellido;
req.session.user = usuario.data.user;
req.session.content = usuario;
req.session.juegos = usuario.data.juegos;

});
})
router.get("/index",(req, res)=>{
  res.render("panelPrincipal", {content: req.session.content, juegos:req.session.juegos});
});
module.exports = router;