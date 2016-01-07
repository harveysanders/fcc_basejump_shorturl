'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var mongodbURI = process.env.MONGOLAB_URI || process.env.MONGO_URI)

require('dotenv').load();
var connection = mongoose.createConnection(mongodbURI); //for autoIncrement

autoIncrement.initialize(connection);

var UrlSchema = new Schema({
	origUrl: String,
	shortUrlID: {type: Schema.Types.ObjectId}
});

UrlSchema.plugin(autoIncrement.plugin, 'Url');
var Url = connection.model('Url', UrlSchema);

module.exports = Url;
// module.exports = mongoose.model('Url', Url);