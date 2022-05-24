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
              console.log(usuario);
              //redirecciono a la pagina que quiero y envio los datos obtenidos
              console.log(usuario.data.juegos);
              req.session.nombre = usuario.data.nombre;
              req.session.apellido = usuario.data.apellido;
              req.session.user = usuario.data.user;
              req.session.content = usuario;
              req.session.juegos = usuario.data.juegos;
              res.render("panelPrincipal", {content: usuario, juegos: usuario.data.juegos, nombre:usuario.data.nombre,apellido:usuario.data.apellido,user:usuario.data.user});
            })()
        }
        else if(req.session.content){
          res.render("panelPrincipal", {content: req.session.content, juegos:req.session.juegos, nombreUsuario:nombreUsuario,apellidoUsuario:apellidoUsuario,user:user}); 
        }

        else{
          res.render("index", {messaje: "Usuario o contraseña incorrectos"});
        }
      })();
});

router.get("/index",(req, res)=>{
  res.render("panelPrincipal", {content: req.session.content, juegos:req.session.juegos});
});

module.exports = router;
