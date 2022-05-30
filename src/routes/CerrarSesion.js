const express = require("express");
const session=require("express-session");
const fetch = require("node-fetch");
const router = express.Router();
router.post("/cerrar",(req,res)=>{
    req.session.destroy();

    res.render("index");
})




module.exports = router;