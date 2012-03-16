require(['jquery'], function($) {
	$(document).ready(function() {
		jQuery('article .content a:not([href*="madcatswelt"])[href^="http"]:not([class*="noArrow"])').addClass('external').attr('title', 'Externer Link').attr('target', '_blank');
	});
});