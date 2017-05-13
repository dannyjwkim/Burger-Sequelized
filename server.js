var express = require("express");
var db = require("./models");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var PORT = process.env.NODE_ENV || 8080;
var app = express();

//serve up public folder and all content as static files to server.
app.use(express.static('public'));

//use bodyParser, do not encode url
app.use(bodyParser.urlencoded({
  extended: false
}));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

//require handlebars
var exphbs = require('express-handlebars');

//use handlebars engine as template engine, use 'main' as our base file
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

//link to burger controller, set as default page"/"
var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});