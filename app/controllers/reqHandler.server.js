'use strict';

require('dotenv').load();

var Urls = require('../models/urls.js');

function reqHandler() {
	return {
		shortUrlGenerator: function(req, res) {
			var origUrl = req.params.url;
		
	        function urlValidator(url) {
	        	// Copyright (c) 2010-2013 Diego Perini, MIT licensed
		        // https://gist.github.com/dperini/729294
		        // see also https://mathiasbynens.be/demo/url-regex
		        // modified to allow protocol-relative URLs
	        	return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( url );
	        }

        	if (urlValidator(origUrl)) {
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
			}else {
				res.json({
					error: 'Invalid URL. Please include protocol. e.g. http://google.com'
				});
			}
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