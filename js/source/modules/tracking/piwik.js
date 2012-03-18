define(function() {
	var exports = {};

	exports.init = function(element, pkBaseURL) {
		require([pkBaseURL + 'piwik.js'], function() {
			try {
				var piwikTracker = Piwik.getTracker(pkBaseURL + "piwik.php", 1);
				piwikTracker.trackPageView();
				piwikTracker.enableLinkTracking();
			} catch(e) {

			}
		});
	}

	return exports;
});