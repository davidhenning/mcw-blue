var cdnUrl = document.getElementsByTagName('body')[0].getAttribute('data-cdn-url');
var requireConfig = {
  paths: {
    'jquery': 'libs/jquery/jquery-1.7.1',
    'exturls': 'modules/mcw/externalurls',
    'annotationloader': 'libs/core/annotationloader',
    'syntaxhl': 'modules/mcw/syntaxhl'
  }
};

if(cdnUrl.length > 0 && cdnUrl.indexOf('http://') > -1) {
  requireConfig.baseUrl = cdnUrl;
}

require.config(requireConfig);

require(['jquery', 'exturls', 'annotationloader', 'syntaxhl'], function(jquery, exturls, annotationloader, syntaxhl){
  jquery.noConflict();
  annotationloader.load();
  exturls.init();
  syntaxhl.init();
});