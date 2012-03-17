require.config({
  paths: {
    'jquery': 'libs/jquery/jquery-1.7.1',
    'exturls': 'modules/mcw/externalurls',
    'annotationloader': 'libs/core/annotationloader',
    'syntaxhl': 'modules/mcw/syntaxhl'
  }
});

require(['jquery', 'exturls', 'annotationloader', 'syntaxhl'], function(jquery, exturls, annotationloader, syntaxhl){
  jquery.noConflict();
  annotationloader.load();
  exturls.init();
  syntaxhl.init();
});