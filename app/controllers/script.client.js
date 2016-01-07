(function() {
	var urlInput = document.querySelector('#url-input');
	var getUrlBtn = document.querySelector('#get-url-btn');
	var shortUrlDisplay = document.querySelector('#short-url-display');
	var apiUrl = appUrl + '/new/';

	function displayShortUrl(data) {
		if (JSON.parse(data).error) {
			shortUrlDisplay.innerHTML = JSON.parse(data).error;
		} else {
			var shortUrl = JSON.parse(data).short_url;
			shortUrlDisplay.innerHTML = '<a href="' + shortUrl + '">' + shortUrl + '</a>';
		}
		
	}

	getUrlBtn.addEventListener('click', function() {
		var origUrl = encodeURIComponent(urlInput.value);
		ajaxFunctions.ajaxRequest('GET', apiUrl + origUrl, displayShortUrl);
	});

})();