// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var router = express.Router();
var article = require('./../models/article')

// renders the homepage with the articles that exist in the database
router.get('/', function(req, res){
	article.find({}, function(error, found){
		res.render('home', {
			article: found
		});
	})
})

router.get('/saved', function(req, res){
	article.find({}, function(error, found){
	res.render('articles', {
			article: found
	});
	})
})

router.delete('/articles/:id/comment/:index', function(req, res){
	var id = req.params.id;
	let unsetValue = {};
	unsetValue['comments.' + req.params.index] = 1;
	article.update({ _id: id }, {$unset: unsetValue}, function(result){
		article.update({ _id: id }, {$pull: {comments: null}}, function(response){
			res.status(200).json({message: 'comment deleted'})
		})
	})
})

router.post('/comment', function(request, response){

	var id = request.body.id;
	article.update({ _id: id }, {$push: { comments: request.body.comment }}, function(result){
		response.redirect('/saved')
	})
})

router.put('/articles/:id', function(request, response){

	var id = request.params.id;
	article.update({ _id: id }, { $set: { saved: request.body.saved }}, function(result){
		response.status(200).json({message: 'changed saved status'})
	})
})

// scrapes the content from my personal website. Note that when the user clicks on the scrape button, we will need to check if the data has already been added, so that we do not have duplicate data.
router.get('/scrape', function(req, res){

	request("https://www.falondarville.com/blog", function(error, response, html) {

	  var $ = cheerio.load(html);

	  $("div.singular-post-information").each(function(i, element) {

	    var title = $(element).children("h4").text();
	    var summary = $(element).children("p").text();
	    var link = $(element).parent().attr("href");

		console.log({title, summary, link})

	    if(title && summary && link) {
	    	// check if the article has already been added, if not, then add the new article
	    	article.find({ title: title }, function(err, data){
	    		if(err){
	    			article.create({
		    			title: title, 
		    			summary: summary,
		    			link: link
		    	})
	    		} else {
	    			return
	    		}
	    	})
	    }
	})
	res.redirect('/');
	})
})

module.exports = router;