var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
	title: String,
	summary: String,
	link: String
});

module.exports = mongoose.model('Article', ArticleSchema);