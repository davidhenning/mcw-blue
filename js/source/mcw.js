var cdnUrl = document.getElementsByTagName('body')[0].getAttribute('data-cdn-url') || '';
var requireConfig = {
  paths: {
    'jquery': 'libs/jquery/jquery-1.7.1',
    'annotationloader': 'libs/core/annotationloader'
  }
};

if(cdnUrl.length > 0 && cdnUrl.indexOf('http://') > -1) {
  requireConfig.baseUrl = cdnUrl;
}

require.config(requireConfig);

require(['jquery', 'annotationloader'], function(jquery, annotationloader){
  jquery.noConflict();
  annotationloader.load();
});