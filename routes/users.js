var express = require('express');
var router = express.Router();
var user = require('../model/user');

router.post('/addUser',(req,res)=>{

  var obj = {
    name:req.body.name,
    age:req.body.age,
    classe:req.body.classe,
    adresse:req.body.adresse,
    password:req.body.password,
  }
  user.insertMany(obj);
  res.status(200).send('User ajouté')
});

router.get('/addUser',(req,res)=>{
  res.render('addUser.twig');
});

module.exports = router;
