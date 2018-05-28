var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
	title: {
		type: String,
		unique: true
	},
	summary: String,
	link: String
});

module.exports = mongoose.model('Article', ArticleSchema);