const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
router.post("/juegoAlumno",(req, res)=>{
    //res.render("index");//para renderizar y enviar el archivo con el nombre y la extencion previamente configurada como .hbs
    
    const url = "https://qqsm-api.herokuapp.com/juego/crearJuego";
    console.log('ingresando a fetchito');

const rawResponse = await fetch(url, {
    method: 'POST'
  });
  const pregunta = await rawResponse.json();
  console.log(question);
  //redirecciono a la pagina que quiero y envio los datos obtenidos
  console.log(question.data.idProfesor, question.data.nombreJuego);
  req.session.nombre = usuario.data.nombre;
  req.session.apellido = usuario.data.apellido;
  req.session.user = usuario.data.user;
  req.session.content = usuario;
  req.session.juegos = usuario.data.juegos;
  res.render("panelPrincipal", {content: usuario, juegos: usuario.data.juegos, nombre:usuario.data.nombre,apellido:usuario.data.apellido,user:usuario.data.user});
});













class Subject{
    constructor(){
        this.observers=[]
    }

notifyObserver(observer){
    this.observers.forEach(observer => {
        observer.update(message)
    });
}

}

class Observer{
    update(context){

    }
}

class PistaAssigment extends Subject{
    constructor(dato1, dato2, dato3, dato4){
    super()
    this.dato1= this.dato1
    this.dato2= this.dato2
    this.dato3= this.dato3
    this.dato4= this.dato4
    }
    
    update(message){
    
    }
}

