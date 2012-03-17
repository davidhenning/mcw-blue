define(['jquery'], function($) {
	var exports = {};

	exports.init = function(element, typeKitUrl) {
		$(document).ready(function() {
			if(typeof(typeKitUrl) === 'string' && typeKitUrl.indexOf('use.typekit.com') > -1) {
				require([typeKitUrl], function() {
					try {
						Typekit.load();
					} catch(e) {

					}
				});
			}
		});
	}

	return exports;
});