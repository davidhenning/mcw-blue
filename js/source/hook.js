(function() {
    'use strict';

    var cdnUrl = document.getElementsByTagName('body')[0].getAttribute('data-cdn-url') || '',
        requireConfig = {
            paths: {
                'jquery': 'vendor/jquery/jquery-1.8.0',
                'moduleloader': 'core/moduleloader',
                'ga': 'modules/tracking/googleanalytics',
                'piwik': 'modules/tracking/piwik',
                'gauges': 'modules/tracking/gauges',
                'googleplus': 'modules/social/googleplus',
                'twitter': 'modules/social/twitter',
                'fb': 'modules/social/facebook'
            }
        };

    if(cdnUrl.length > 0 && cdnUrl.indexOf('http://') > -1) {
      requireConfig.baseUrl = cdnUrl;
    }

    require.config(requireConfig);

    require(['jquery', 'moduleloader'], function(jQuery, moduleloader){
        jQuery.noConflict();
        moduleloader.load();

        (function($) {
            var gaid = $('[data-gaid]').data('gaid');
            var piwikurl = $('[data-piwikurl]').data('piwikurl');
            var gaugesid = $('[data-gaugesid]').data('gaugesid');

            if(typeof(gaid) !== 'undefined' && gaid.length > 0) {
                require(['ga'], function(tracking) {
                    tracking.init(null, gaid);
                });
            }

            if(typeof(piwikurl) !== 'undefined' && piwikurl.length > 0) {
                require(['piwik'], function(tracking) {
                    tracking.init(null, piwikurl);
                });
            }

            if(typeof(gaugesid) !== 'undefined' && gaugesid.length > 0) {
                require(['gauges'], function(tracking) {
                    tracking.init(null, gaugesid);
                });
            }
        })(jQuery);

        (function() {
            require(['googleplus', 'twitter', 'fb'], function(g, t, f) {
                g.init();
                t.init();
                f.init();
            });
        })();
    });
})();