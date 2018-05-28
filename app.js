var express = require('express');
var exphbs  = require('express-handlebars');
var nodemon = require('nodemon');

var scrapedRoute = require('./routes/scraped')

const mongoose = require('mongoose');
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/blogwebsite";

mongoose.Promise = Promise;

mongoose.connect(MONGODB_URI, {}, function(err) {
	console.log(err);
});

var app = express();
var PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'))

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/saved', function(req, res){
	res.render('articles');
})

app.use(scrapedRoute);

app.listen(PORT);