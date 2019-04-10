var express = require('express');
var router = express.Router();
var option = require('../model/option');

/*/!* GET users listing. *!/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/


router.get('/addOption', (req, res) => {
    res.render('addOption.twig');
});

router.post('/addOption', async (req, res) => {
    var obj = {
        nom: req.body.nom,
        score: req.body.score,

    };
    var option_added = await option.insertMany(obj);
    /*    if (user_added) {
            res.status(200).send(user_added);

        }*/
    res.redirect('/users/getusers');
});

module.exports = router;
