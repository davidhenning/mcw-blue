#Readme

##What?
mcw[blue] is a Wordpress theme for my personal blog. It is written in HTML 5 and CSS-3 utilizing the Compass CSS Framework.

##Features
- HTML 5
- CSS-3 with the Compass CSS Framework
- Responsive layout for iOS and Android browsers (in development)
- Retina display support (icons and stylesheet)
- use of require.js for asynchronous loading of JavaScript
- module system based on require.js (included modules: jQuery 1.7.1, jQuery Lightbox 0.5, own version of Chili 2.2 (syntax highlighting), TypeKit, Piwik, Google Analytics, Gaug.es)
- modules load automaticly (jQuery, Lightbox, Chili) or can be loaded with a simple div element using HTML 5 data attributes
- CDN support for the module system (just upload them and specify the cdn url in your theme configuration)
- twitter integration (shows your last tweet just before the footer)
- add your own custom footer in theme options
- add your TypeKit JavaScript snippet or any other webfont system (in case you don't want to use the module)
- sidebar with widget support
- custom archive template grouped by year and month
- i18n support (included languages english and german)

##Planned
- Complete rewrite of all stylesheets to implement a mobile first layout

##Load a JavaScript module using a div element

Syntax:

```html
<div data-module="{$pathToYourModule}" data-module-parameters="{$yourModuleParametersCommaSeparated"></div>
```

The module path is relativ to the directory "js" in theme directory. List the parameters as comma-separated string.

Example:

```html    
<div data-module="modules/tracking/googleanalytics" data-module-parameters="UA-XXXXXXX-X"></div>
```

##Write your own JavaScript module

Example:

```javascript
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
```

Use the function define() to write your module. The first parameter is an array containing the libraries (called dependencies in require.js) you want to use. In this case the dependency is on jQuery. As secound parameter you have to create a callback function which is called, when all dependencies are solved. Each depedency will be injected as parameter into the callback function. The example uses a $ for jQuery, so jQuery can be called as usual.

Within the callback you can write your own code. There is only one simple convention you have to follow: the callback must return an object with a method named init that starts your own code.

If you are calling your module from a div element, a reference of the calling div element is passed as the first parameter to your init method. If your div has module paramaters, they are passed as well as second, third etc. parameter.

For a more detailed description please take a look at the [require.js documentation].

__Important:__ the init method is a convention of my module loading system and has nothing to do with require.js!


##Why?
I was looking for a new slim HTML 5 theme for my blog. My old theme was really big and oversized. It is highly customizable but slow and the generated markup is a mess with way to much nested elements. The search wasn't very successful, so I decided to create my own theme.

##Who
I am a web developer at Chip Xonio Online in Munich, one of the largest websites in Germany.

[require.js documentation]: http://requirejs.org/docs/api.html#defdep