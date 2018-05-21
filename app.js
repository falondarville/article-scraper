var express = require('express');
var exphbs  = require('express-handlebars');
var nodemon = require('nodemon');

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

app.listen(PORT);