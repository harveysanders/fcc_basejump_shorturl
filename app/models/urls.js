'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

require('dotenv').load();
var connection = mongoose.createConnection(process.env.MONGO_URI); //for autoIncrement

autoIncrement.initialize(connection);

var UrlSchema = new Schema({
	origUrl: String,
	shortUrlID: Schema.Types.ObjectId
});

UrlSchema.plugin(autoIncrement.plugin, 'Url');
var Url = connection.model('Url', UrlSchema);

module.exports = Url;
// module.exports = mongoose.model('Url', Url);