require.config({
  paths: {
    'jquery': 'libs/jquery/jquery-1.7.1',
    'exturls': 'modules/mcw/externalurls',
    'annotationloader': 'libs/core/annotationloader'
  }
});

require(['jquery', 'exturls', 'annotationloader'], function(jquery, exturls, annotationloader){
  jquery.noConflict();
  annotationloader.load();
  exturls.init();
});