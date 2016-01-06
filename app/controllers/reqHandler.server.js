'use strict';

require('dotenv').load();

var Urls = require('../models/urls.js');

function reqHandler() {
	return {
		shortUrlGenerator: function(req, res) {
			var origUrl = req.params.url;
			Urls.findOne({ 'origUrl': origUrl }, function(err, url) {
				if (err) {
					throw err;
				}

				if (url) {
					return; 
				} else {
					var newUrl = new Urls();

					newUrl.origUrl = origUrl;

					newUrl.save(function (err, newUrl, numAffected) {
						if (err) {throw err;}
						console.log(newUrl);
						res.json({
							original_url: newUrl.origUrl,
							short_url: process.env.APP_URL + newUrl['_id']
						});
						return;
					});
				}
			});
		},
		shortUrlRedirect: function(req, res) {
			var shortUrlID = req.params['url'];
			Urls.findOne({ '_id':shortUrlID }, function(err, doc) {
				if (err) 
					res.send(err);
				else
					res.redirect(doc.origUrl);
			});
		}
	};
}

module.exports = reqHandler;