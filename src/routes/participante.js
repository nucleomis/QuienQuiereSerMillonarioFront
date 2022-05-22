const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
router.post("/participante",(req,res)=>{

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

    req.session.juego = content.data;

    console.log("juego: "+ content.data);

    res.redirect("/juegoAlumno");
})();
});
module.exports=router;