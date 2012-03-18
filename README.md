#Readme

##What?
mcw[blue] is a Wordpress theme for my personal blog. It is written in HTML 5 and CSS-3 utilizing the Compass CSS Framework.

##Features
- HTML 5
- CSS-3 with the Compass CSS Framework
- use of require.js for asynchronous loading of JavaScript
- module system based on require.js (included modules: jQuery 1.7.1, jQuery Lightbox 0.5, own version of Chili 2.2 (syntax highlighting), TypeKit, Piwik, Google Analytics)
- modules load automaticly (jQuery, Lightbox, Chili) or can be loaded with a simple div element using HTML 5 data attributes
- CDN support for the module system (just upload them and specify the cdn url in your theme configuration)
- twitter integration (shows your last tweet just before the footer)
- add your own custom footer in theme options
- add your TypeKit JavaScript snippet or any other webfont system (in case you don't want to use the module)
- sidebar with widget support
- custom archive template grouped by year and month
- i18n support (included languages english and german)

##Load a JavaScript module using a div element

Syntax:
	
	<div data-module="{$pathToYourModule}" data-module-parameters="{$yourModuleParametersCommaSeparated"></div>

The module path is relativ to the directory "js" in theme directory. List the parameters as comma-separated string.

Example:
    
    <div data-module="modules/tracking/googleanalytics" data-module-parameters="UA-XXXXXXX-X"></div>

##Write your own JavaScript module

Example:

	define(['jquery'], function($) {
		var exports = {};

		function doMyStuff(element) {
			$(element).append('<p>Have fun!</p>')
		}

		exports.init = function(element [, param1 [, param2 ...]]) {
			$(document).ready(function() {
				doMyStuff(element);
			});
		}

		return exports;
	});

Use the function define() to write your module. The first parameter is an array containing the libraries (called dependencies in require.js) you want to use. In this example we are using a dependency to jQuery (jquery is a keyword containing the full path to jQuery specified in the require.js config in the file js/mcw.js). As second parameter you have to create a callback function. The callbacks parameters are the libraries you specified as dependencies before. This example uses a $ for jQuery.

Within the callback you can write your own code. There is only one simple convention you have to follow: the callback must return an object with a method called init which has to start your own code as in the example above.

If you are calling your module from a div element, a reference of the calling div element is passed as the first parameter to your init method. If your div has module paramaters, they are passed as well as second, third etc. parameter.

For a more detailed description please take a look at the [require.js documentation].

__Important:__ the init method is a convention of my module loading system and has nothing to do with require.js!


##Why?
I was searching for a new slim HTML 5 theme for my blog. My old theme was a really big one. It is highly customizable via the admin panel but very slow and the generated markup is a mess with way to much nested elements. The search wasn't very successful, so I decided to create my own theme.

##Who
I am web developer at Chip Xonio Online Ltd in Munich working in the portal development team for chip.de, the leading IT website in germany.

[require.js documentation]: http://requirejs.org/docs/api.html#defdep