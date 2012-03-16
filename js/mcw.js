require.config({
  paths: {
    "jquery": "libs/jquery/jquery-1.7.1",
  }
});

require(["jquery"], function(jquery){
  jquery.noConflict();	
});