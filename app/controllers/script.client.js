(function() {
	var urlInput = document.querySelector('#url-input');
	var getUrlBtn = document.querySelector('#get-url-btn');
	var shortUrlDisplay = document.querySelector('#short-url-display');
	var apiUrl = appUrl + '/new/';

	function displayShortUrl(data) {
		var shortUrl = JSON.parse(data).original_url;
		console.log(JSON.parse(data));
		shortUrlDisplay.innerHTML = shortUrl;
	}

	getUrlBtn.addEventListener('click', function() {
		var origUrl = encodeURIComponent(urlInput.value);
		ajaxFunctions.ajaxRequest('GET', apiUrl + origUrl, displayShortUrl);
	});

})();