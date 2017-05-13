//dependencies
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var router = express.Router();
var burger = require('../models')

//redirect to burger route by default
router.get('/', function(req, res) {
  res.redirect('/burgers');
});

//when directed to burgers route, get burger.js logic, call functions within it. 
router.get('/burgers', function(req, res) {
  models.burgers.findAll().then(function(data){
    res.render('index', { burgers: data });
    });
});

router.post('/burgers/create', function(req, res) {
  models.burgers.create({
    burger_name:req.body.name,
    devoured: 0
  }).then(function(){
    res.redirect('/burgers');
  });
})

router.put('/burgers/update/devour/:id', function(req, res) {
  //tableName, column, ID, callback
  models.burgers.update({
    devoured:1
  },{where:{
    id:req.params.id
  }}
  ).then(function(){
    res.redirect('/burgers');
  }) 
})

router.delete('/burgers/delete/:id', function(req, res) {
  //run burger.js logic of deleteOne(table,id,callback)
  models.burgers.destroy(
    {where:{
      id:req.params.id
    }}).then(function(){
      res.redirect('/burgers');
    })
})

//initial load/direct
router.use(function(req, res) {
    res.redirect('/burgers');
})

module.exports = router;