// gets the scraped content from the database, to be displayed on the home page.
app.get('/all', function(req, res){
	db.articles.find({}, function(err, data){
		if(!err){
			res.json(data)
		} else {
			res.status(500).send();
		}
	})
})