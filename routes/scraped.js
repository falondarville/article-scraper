// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var router = express.Router();
var article = require('./../models/article')

router.get('/', function(req, res){
	article.find({}, function(error, found){
		if(error){
			console.log(error);
		} else {
			res.json(found);
		}
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
	res.status(200).send("Scraping done.");
	})
})

module.exports = router;