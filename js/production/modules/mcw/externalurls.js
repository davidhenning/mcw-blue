define(["jquery"],function(a){var b={};return b.init=function(){a(document).ready(function(){a('article .content a:not([href*="madcatswelt"])[href^="http"]:not([class*="noArrow"])').addClass("external").attr("title","Externer Link").attr("target","_blank")})},b});