const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
router.post("/index",(req, res)=>{
  console.log("usuario: "+req.session.usuario);
  
    //res.render("index");//para renderizar y enviar el archivo con el nombre y la extencion previamente configurada como .hbs
    var usuario = req.body.usuario;
    console.log("usuario: "+req.body.usuario);
    var password = req.body.password;
    const url = "https://qqsm-api.herokuapp.com/usuario/verificarUsuario";
    const url2 = "https://qqsm-api.herokuapp.com/usuario/"
    const urlLocal1 = "http://localhost:8080/usuario/verificarUsuario";
    const urlLocal2 = "http://localhost:8080/usuario/";
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


            //guardo el nombre de usuario en sesion
            req.session.nombreUsuario = usuario;
            //llamo a otro endpoint para obtener los datos del usuario
            (async () => {
              const rawResponse = await fetch(url2+content.data.dpoId, {
                method: 'GET'
              });
              const usuario = await rawResponse.json();
              console.log(usuario.data.id);
              //redirecciono a la pagina que quiero y envio los datos obtenidos
              console.log(usuario.data.juegos);
              req.session.idProfesor = usuario.data.id;
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
          res.render("index", {errorMesnsaje: "Usuario o contraseña incorrectos"});
        }
      })();
 

    });

router.get("/index",(req, res)=>{
  
  res.render("panelPrincipal", {content:req.session.content, juegos:req.session.juegos, user: req.session.user});
});

router.post("/volver",(req, res)=>{
  
  res.render("panelPrincipal", {content:req.session.content, juegos:req.session.juegos, user: req.session.user});
});

module.exports = router;
