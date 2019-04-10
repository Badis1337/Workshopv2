var express = require('express');
var router = express.Router();
var user = require('../model/user');
var option = require('../model/option.js');

/*/!* GET users listing. *!/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/


router.get('/addUser', (req, res) => {
    option.find({}).exec((err, data) => {
        if (err)
            console.log(err);
        else {

            res.render('addUser.twig', {'option': data});
        }


    })

});

router.post('/addUser', async (req, res) => {
    var obj = {
        name: req.body.name,
        age: req.body.age,
        classe: req.body.classe,
        adresse: req.body.adresse,
        password: req.body.password,
    };
    user.insertMany(obj);

    res.redirect('/users/getUsers');
});


router.get('/login', (req, res) => {
    res.render('login.twig', {connected: "not ok"});
});


router.post('/login', (req, res) => {
    const user_logged = user.findOne({name: req.body.username,
        password: req.body.password})
        .exec((err, data) => {
            if (err) {
                console.log(err);
                res.render('login.twig', {connected: "not ok"});


            } else {
                //user non trouvé
                if (data == null) {
                    console.log(data);

                    res.render('login.twig', {connected: "not ok"});

                } else {
                    console.log(data);
                    res.render('login.twig',{connected:'ok'});
                }
            }
        })
});

router.get('/getUsers', (req, res) => {
    var users = user.find({}).populate("option").exec((err, data) => {
        if (err)
            console.log(err)
        else {
            res.render('listUsers.twig', {userList: data});
        }
    })
});

router.get('/delete/:id', (req, res, next) => {
    let query = {"_id": req.params.id};
    console.log(query);
    user.remove(query, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/users/getusers');

        }

    });
});


router.post('/mod/:id', (req, res, next) => {
    var name = req.body.name;
    var age = req.body.age;
    var classe = req.body.classe;
    var adresse = req.body.adresse;
    var password = req.body.password;
    console.log(req.params.id);
    let obj = {"name": name, "age": age, "classe": classe, 'adresse': adresse, 'classe': classe, 'password': password};

    user.findOneAndUpdate({_id: req.params.id}, obj, {new: true}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/users/getusers');
        }
    });
});
router.get('/update/:id', (req, res, next) => {
    let query = {"_id": req.params.id};
    console.log(query);
    user.findById(query, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.render('updateUser.twig', {obj: data});

        }
    });

});
module.exports = router;
