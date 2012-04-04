'use strict';

define(function() {
    var exports = {};

    exports.init = function(element, trackingId) {
        var _gaq = window._gaq = _gaq || [],
            ga = document.createElement('script'),
            s = document.getElementsByTagName('script')[0];

        _gaq.push(['_setAccount', trackingId]);
        _gaq.push(['_trackPageview']);

        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';

        s.parentNode.insertBefore(ga, s);
    }

    return exports;
});
