define(['jquery'], function($) {
	var exports = {};

	exports.init = function() {
		$(document).ready(function() {
			$('article .content a:not([href*="madcatswelt"])[href^="http"]:not([class*="noArrow"])').addClass('external').attr('title', 'Externer Link').attr('target', '_blank');
		});
	}

	return exports;
});