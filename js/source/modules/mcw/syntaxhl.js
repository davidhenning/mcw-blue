define(['jquery'], function($) {
	var exports = {};

	exports.init = function() {
		require(['libs/jquery/jquery-chili-2.2', 'libs/jquery/jquery-chili-recipes'], function() {
			$.chili.options.automatic.active = false;
			$('pre[name="code"]').chili();
		});
	}

	return exports;
});