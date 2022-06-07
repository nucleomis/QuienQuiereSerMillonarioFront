const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

//aca va el envio para eliminar dos opciones
router.post("/magiaVotoEliminar",(req, res)=>{
  const url = "https://qqsm-api.herokuapp.com/votar/votar";

  console.log('Eligio eliminar 2 preguntas');
  var idmagia = 1;
  var tipoVoto = 3;
  var indice = req.session.indicepregunta;
    var valor1=req.session.juegoiniciado.data.preguntas[indice-1].respuestas[0].respuesta;
    var valor2=req.session.juegoiniciado.data.preguntas[indice-1].respuestas[1].respuesta;
    var valor3=req.session.juegoiniciado.data.preguntas[indice-1].respuestas[2].respuesta;
    var valor4=req.session.juegoiniciado.data.preguntas[indice-1].respuestas[3].respuesta;
  var punto1=1;
  var punto2=2;
  var punto3=3;
  var punto4=4;
  var magia = {id:idmagia,tipoVotacion:tipoVoto,valor1:valor1,valor2:valor2,valor3:valor3,valor4:valor4,punto1:punto1,punto2:punto2,punto3:punto3,punto4:punto4};
  
    (async () => {
  const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(magia)
  });
 
  console.log(magia);
 const question = await rawResponse.json();


})()
});


//aca va el envio para seleccionar la respuesta correcta
router.post("/magiaVotoPopular",(req, res)=>{
  const url = "https://qqsm-api.herokuapp.com/votar/votar";

  //habilito botones
  
  console.log('Eligio Voto Popular');
    var idmagia = 1;
    var tipoVoto = 2;
    var indice = req.session.indicepregunta;
    var valor1=req.session.juegoiniciado.data.preguntas[indice-1].respuestas[0].respuesta;
    var valor2=req.session.juegoiniciado.data.preguntas[indice-1].respuestas[1].respuesta;
    var valor3=req.session.juegoiniciado.data.preguntas[indice-1].respuestas[2].respuesta;
    var valor4=req.session.juegoiniciado.data.preguntas[indice-1].respuestas[3].respuesta;
    var punto1=1;
    var punto2=2;
    var punto3=3;
    var punto4=4;
    var magia = {id:idmagia,tipoVotacion:tipoVoto,valor1:valor1,valor2:valor2,valor3:valor3,valor4:valor4,punto1:punto1,punto2:punto2,punto3:punto3,punto4:punto4};
    
  (async () => {
    const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(magia)
  });
  const content = await rawResponse.json();
  console.log(magia);
  


})()
});


//aca va el envio para elegir y mostrar la pista
router.post("/magiaPista",(req, res)=>{
  const url = "https://qqsm-api.herokuapp.com/votar/votar";
  console.log('eligio Pistas');
  
  var idmagia = 1;
  var tipoVoto = 1;
  var indice = req.session.indicepregunta;
    var valor1=req.session.juegoiniciado.data.preguntas[indice-1].pistas[0].pista;
    var valor2=req.session.juegoiniciado.data.preguntas[indice-1].pistas[1].pista;
    var valor3=0;
    var valor4=0;
  var punto1=1;
  var punto2=2;
  var punto3=3;
  var punto4=4;
  var magia = {id:idmagia,tipoVotacion:tipoVoto,valor1:valor1,valor2:valor2,valor3:valor3,valor4:valor4,punto1:punto1,punto2:punto2,punto3:punto3,punto4:punto4};

(async () => {
  const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(magia)
  });
 
  console.log(magia);
const question = await rawResponse.json();


})()
});

//aca va el envio para elegir y mostrar la pista
router.post("/lamagia",(req, res)=>{
  const url = "https://qqsm-api.herokuapp.com/votar/quevotar";
  
  console.log('Leyendo la tablita magica del Sistema');
    
  (async () => {
    const rawResponse = await fetch(url, {
    method: 'GET'
  });
    const content = await rawResponse.json();
    req.session.valor1=content.data.valor1;
    req.session.valor2=content.data.valor2;
    req.session.valor3=content.data.valor3;
    req.session.valor4=content.data.valor4;
    //activo o desactivo botones
    req.session.btnpista=content.data.tipoVoto;
    req.session.btnrespuesta=content.data.tipoVoto;
    console.log("tipo votacion "+content.data.tipoVotacion);
    
    if (content.data.tipoVotacion == 3 ){
      btnrespuesta=true;
      btnpista=false;
      console.log("3")
    }
    
    
    if (content.data.tipoVotacion == 2 ){
      btnrespuesta=true;
      btnpista=false;
      console.log("2")
    }


    if (content.data.tipoVotacion == 1){
      btnrespuesta=false;
      btnpista=true;
    }
    
    
    res.render("votantes1",{valor1:req.session.valor1,valor2:req.session.valor2,valor3:req.session.valor3,valor4:req.session.valor4, btnrespuesta:btnrespuesta, btnpista:btnpista })

  })()
   //cargo los valores a los botones
  });


//envio mi voto Opcion 1
router.post("/votoOpcion1",(req, res)=>{
  const url = "https://qqsm-api.herokuapp.com/votar/votar";
  console.log('mando el voto elegido');
  
  const url2 = "https://qqsm-api.herokuapp.com/votar/quevotar";
  
  console.log('Leyendo la tablita magica del Sistema');
    
  (async () => {
    const rawResponse = await fetch(url2,{
      method: 'GET'
    });
    const content = await rawResponse.json();
    req.session.content=content;
    console.log("contenido del id: "+content.data.id);

    //activo o desactivo botones
    req.session.btnpista=content.data.tipoVotacion;
    req.session.btnrespuesta=content.data.tipoVotacion;
    
    req.session.id = content.data.id;
    req.session.tipoVotacion = content.data.tipoVotacion;
    req.session.valor1 = content.data.valor1;
    req.session.valor2 = content.data.valor2;
    req.session.valor3 = content.data.valor3;
    req.session.valor4 = content.data.valor4;
    req.session.puntoa = parseInt(content.data.punto1)+1;
    req.session.puntob = content.data.punto2;
    req.session.puntoc = content.data.punto3;
    req.session.puntod = content.data.punto4;
    req.session.content = content.data;
    
    console.log("valor original: "+content.data.punto1);
    console.log("tipo votacion "+req.session.tipoVotacion);

    console.log("muestro el id: "+req.session.id);
      var magia = {id:1,
      tipoVotacion:req.session.tipoVotacion,
      valor1:req.session.valor1,
      valor2:req.session.valor2,
      valor3:req.session.valor3,
      valor4:req.session.valor4,
      punto1:req.session.puntoa ,
      punto2:req.session.puntob,
      punto3:req.session.puntoc,
      punto4:req.session.puntod};
      
      console.log(magia);

    (async () => {
      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(magia)
      });
      res.render("votantes1");
    const question = await rawResponse.json();
    })()

  })()

      
});

//envio mi voto Opcion 2
router.post("/votoOpcion2",(req, res)=>{
  const url = "https://qqsm-api.herokuapp.com/votar/votar";
  console.log('mando el voto elegido');
  
  const url2 = "https://qqsm-api.herokuapp.com/votar/quevotar";
  
  console.log('Leyendo la tablita magica del Sistema');
    
  (async () => {
    const rawResponse = await fetch(url2,{
      method: 'GET'
    });
    const content = await rawResponse.json();
    req.session.content=content;
    console.log("contenido del id: "+content.data.id);

    //activo o desactivo botones
    req.session.btnpista=content.data.tipoVotacion;
    req.session.btnrespuesta=content.data.tipoVotacion;
    
    req.session.id = content.data.id;
    req.session.tipoVotacion = content.data.tipoVotacion;
    req.session.valor1 = content.data.valor1;
    req.session.valor2 = content.data.valor2;
    req.session.valor3 = content.data.valor3;
    req.session.valor4 = content.data.valor4;
    req.session.puntoa = content.data.punto1;
    req.session.puntob = parseInt(content.data.punto2)+1;
    req.session.puntoc = content.data.punto3;
    req.session.puntod = content.data.punto4;
    req.session.content = content.data;

    console.log("muestro el id: "+req.session.id);
      var magia = {id:1,
      tipoVotacion:req.session.tipoVotacion,
      valor1:req.session.valor1,
      valor2:req.session.valor2,
      valor3:req.session.valor3,
      valor4:req.session.valor4,
      punto1:req.session.puntoa ,
      punto2:req.session.puntob,
      punto3:req.session.puntoc,
      punto4:req.session.puntod};
      
      console.log(magia);

    (async () => {
      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(magia)
      });
      res.render("votantes1");
    const question = await rawResponse.json();
    })()

  })()
});

//envio mi voto Opcion 3
router.post("/votoOpcion3",(req, res)=>{
  const url = "https://qqsm-api.herokuapp.com/votar/votar";
  console.log('mando el voto elegido');
  
  const url2 = "https://qqsm-api.herokuapp.com/votar/quevotar";
  
  console.log('Leyendo la tablita magica del Sistema');
    
  (async () => {
    const rawResponse = await fetch(url2,{
      method: 'GET'
    });
    const content = await rawResponse.json();
    req.session.content=content;
    console.log("contenido del id: "+content.data.id);

    //activo o desactivo botones
    req.session.btnpista=content.data.tipoVotacion;
    req.session.btnrespuesta=content.data.tipoVotacion;
    
    req.session.id = content.data.id;
    req.session.tipoVotacion = content.data.tipoVotacion;
    req.session.valor1 = content.data.valor1;
    req.session.valor2 = content.data.valor2;
    req.session.valor3 = content.data.valor3;
    req.session.valor4 = content.data.valor4;
    req.session.puntoa = content.data.punto1;
    req.session.puntob = content.data.punto2;
    req.session.puntoc = parseInt(content.data.punto3)+1;
    req.session.puntod = content.data.punto4;
    req.session.content = content.data;

    console.log("muestro el id: "+req.session.id);
      var magia = {id:1,
      tipoVotacion:req.session.tipoVotacion,
      valor1:req.session.valor1,
      valor2:req.session.valor2,
      valor3:req.session.valor3,
      valor4:req.session.valor4,
      punto1:req.session.puntoa ,
      punto2:req.session.puntob,
      punto3:req.session.puntoc,
      punto4:req.session.puntod};
      
      console.log(magia);

    (async () => {
      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(magia)
      });
      res.render("votantes1");
    const question = await rawResponse.json();
    })()

  })()
});

//envio mi voto Opcion 4
router.post("/votoOpcion4",(req, res)=>{
  const url = "https://qqsm-api.herokuapp.com/votar/votar";
  console.log('mando el voto elegido');
  
  const url2 = "https://qqsm-api.herokuapp.com/votar/quevotar";
  
  console.log('Leyendo la tablita magica del Sistema');
    
  (async () => {
    const rawResponse = await fetch(url2,{
      method: 'GET'
    });
    const content = await rawResponse.json();
    req.session.content=content;
    console.log("contenido del id: "+content.data.id);

    //activo o desactivo botones
    req.session.btnpista=content.data.tipoVotacion;
    req.session.btnrespuesta=content.data.tipoVotacion;
    
    req.session.id = content.data.id;
    req.session.tipoVotacion = content.data.tipoVotacion;
    req.session.valor1 = content.data.valor1;
    req.session.valor2 = content.data.valor2;
    req.session.valor3 = content.data.valor3;
    req.session.valor4 = content.data.valor4;
    req.session.puntoa = content.data.punto1;
    req.session.puntob = content.data.punto2;
    req.session.puntoc = content.data.punto3;
    req.session.puntod = parseInt(content.data.punto4)+1;
    req.session.content = content.data;

    console.log("muestro el id: "+req.session.id);
      var magia = {id:1,
      tipoVotacion:req.session.tipoVotacion,
      valor1:req.session.valor1,
      valor2:req.session.valor2,
      valor3:req.session.valor3,
      valor4:req.session.valor4,
      punto1:req.session.puntoa ,
      punto2:req.session.puntob,
      punto3:req.session.puntoc,
      punto4:req.session.puntod};
      
      console.log(magia);

    (async () => {
      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(magia)
      });
      res.render("votantes1");
    const question = await rawResponse.json();
    })()

  })()
});



module.exports = router;