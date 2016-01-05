'use strict';

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
					return done(null, url); //???
				} else {
					var newUrl = new Urls();

					newUrl.origUrl = origUrl;
					//newUrl.shortUrlID = 0;

					newUrl.save(function (err, newUrl, numAffected) {
						if (err) {throw err;}
						return;
					});
				}
			});

			res.json({
				original_url: origUrl,
				short_url: null
			});
		},
		shortUrlRedirect: function(req, res) {
			var shortUrlID = req.params['url-id'];
			res.send(shortUrlID);
		}
	};
}

module.exports = reqHandler;