const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
router.post("/index",(req, res)=>{
    //res.render("index");//para renderizar y enviar el archivo con el nombre y la extencion previamente configurada como .hbs
    var usuario = req.body.usuario;
    var password = req.body.password;
    const url = "https://qqsm-api.herokuapp.com/usuario/verificarUsuario";
    const url2 = "https://qqsm-api.herokuapp.com/usuario/"
    console.log('ingresando a fetch');
    (async () => {
        const rawResponse = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({usuario: usuario, password: password})
        });
        const content = await rawResponse.json();
        if(content.status == "ok" && content.data.dpoLogin === true){
            console.log("usuario y contraseña correctos");
            //llamo a otro endpoint para obtener los datos del usuario
            (async () => {
              const rawResponse = await fetch(url2+content.data.dpoId, {
                method: 'GET'
              });
              const usuario = await rawResponse.json();
              //redirecciono a la pagina que quiero y envio los datos obtenidos
              res.render("panelPrincipal", {content: usuario});
            })()
        }
        else{
          w
        }
      })();
});
module.exports = router;