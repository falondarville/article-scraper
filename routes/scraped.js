// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

var databaseUrl = "blogwebsite";
var collections = ["articles"];

var db = mongojs(databaseUrl, collections);

// scrapes the content from my personal website. Note that when the user clicks on the scrape button, we will need to check if the data has already been added, so that we do not have duplicate data.
// this should be an on click function
app.get('/scrape', function(req, res){

	request("https://www.falondarville.com/blog", function(error, response, html) {

	  var $ = cheerio.load(html);

	  $("div.singular-post-information").each(function(i, element) {

	    var title = $(element).children("h4").text();
	    var summary = $(element).children("p").text();

	    db.articles.insert({title: title, summary: summary})

	  	res.status(200).send();
	});
})