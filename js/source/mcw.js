(function() {
    'use strict';

    var cdnUrl = document.getElementsByTagName('body')[0].getAttribute('data-cdn-url') || '',
        requireConfig = {
            paths: {
                'jquery': 'libs/jquery/jquery-1.7.1',
                'moduleloader': 'libs/core/moduleloader'
            }
        };

    if(cdnUrl.length > 0 && cdnUrl.indexOf('http://') > -1) {
      requireConfig.baseUrl = cdnUrl;
    }

    require.config(requireConfig);

    require(['jquery', 'moduleloader'], function(jquery, moduleloader){
      jquery.noConflict();
      moduleloader.load();
    });
})();