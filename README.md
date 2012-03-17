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

##Issues
Currently mcw[blue] supports only the german language. Multi-language support is planed for the next version.

## How to add a module using a div element

Syntax:
	
	<div data-module="{$pathToYourModule}" data-module-parameters="{$yourModuleParametersCommaSeparated"></div>

The module path is relativ to the directory "js" in theme directory. List the parameters as comma-separated string.

Example:
    
    <div data-module="modules/tracking/googleanalytics" data-module-parameters="UA-XXXXXXX-X"></div>

##Why?
I was searching for a new slim HTML 5 theme for my blog. My old theme was a really big one. It is highly customizable via the admin panel but very slow and the generated markup is a mess with way to much nested elements. The search wasn't very successful, so I decided to create my own theme.

##Who
I am web developer at Chip Xonio Online Ltd in Munich working in the portal development team for chip.de, the leading IT website in germany.