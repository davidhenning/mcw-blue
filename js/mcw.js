require.config({
  paths: {
    'jquery': 'libs/jquery/jquery-1.7.1',
    'exturls': 'modules/mcw/externalurls'
  }
});

require(['jquery', 'exturls'], function(jquery, exturls){
  jquery.noConflict();
  exturls.init();
});