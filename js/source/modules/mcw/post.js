define(['jquery'], function($) {
	var exports = {};

	exports.highlightExternalUrls = function(element) {
		$(document).ready(function() {
			$('a:not([href*="madcatswelt"])[href^="http"]:not([class*="noArrow"])', element)
				.addClass('external')
				.attr('title', 'Externer Link')
				.attr('target', '_blank');
		});	
	}

	exports.highlightSyntax = function(element) {
		require(['libs/jquery/jquery-chili-2.2', 'libs/jquery/jquery-chili-recipes'], function() {
			$(document).ready(function() {
				$.chili.automatic.active = false;
				$('pre', element).chili();
			});
		});
	}

	exports.init = function(element) {
		this.highlightExternalUrls(element);
		this.highlightSyntax(element);
	}

	return exports;
});