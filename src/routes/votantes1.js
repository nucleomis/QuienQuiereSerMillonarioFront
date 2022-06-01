const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

<<<<<<< HEAD
=======
router.post("/votantes1",(req, res)=>{
  //res.render("index");//para renderizar y enviar el archivo con el nombre y la extencion previamente configurada como .hbs
  const url = "https://qqsm-api.herokuapp.com/juego/iniciojuego"
  const urlLocal = "http://localhost:8080/juego/iniciojuego"
  console.log('ingresando a fetchito');

(async () => {
  const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
console.log("llego aqui");
const question = await rawResponse.json();

console.log(question);
//redirecciono a la pagina que quiero y envio los datos obtenidos

req.session.res1 = usuario.data.res1;
req.session.res2 = usuario.data.res2;
req.session.res3 = usuario.data.res3;
req.session.res4 = usuario.dato.res4;
req.session.pista1 = usuario.data.pista1;
req.session.pista2 = usuario.data.pista2;

});
})
>>>>>>> 34a83aeb7abe6955e6f4ab31b6c12947ea31d5e0

module.exports = router;