const express = require("express");
const router = express.Router();
router.get("/",(req, res)=>{
    console.log("ingresando al index");
    res.render("index");//para renderizar y enviar el archivo con el nombre y la extencion previamente configurada como .hbs

});

router.get("/about",(req, res)=>{
    res.render("about");
    
});
module.exports = router;