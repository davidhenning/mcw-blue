'use strict';

define(function() {
    var exports = {};

    exports.init = function(element, trackingId) {
        var _gauges = window._gauges = _gauges || [],
            t   = document.createElement('script'),
            s = document.getElementsByTagName('script')[0];
        
        t.type  = 'text/javascript';
        t.async = true;
        t.id    = 'gauges-tracker';
        t.setAttribute('data-site-id', trackingId);
        t.src = '//secure.gaug.es/track.js';
        s.parentNode.insertBefore(t, s);
    }

    return exports;
});
