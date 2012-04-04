'use strict';

define(['jquery'], function($) {
    var exports = {};

    exports.highlightExternalUrls = function(element) {
        $(document).ready(function() {
            $('a:not([href*="madcatswelt"])[href^="http"]:not([class*="noArrow"])', element)
                .addClass('external')
                .attr('title', 'Externer Link')
                .attr('target', '_blank');
        }); 
    }

    exports.highlightSyntax = function(element) {
        require(['libs/jquery/jquery-chili-2.2'], function() {
            $(document).ready(function() {
                $.chili.automatic.active = false;
                $('pre', element).chili();
            });
        });
    }

    exports.initLightbox = function(element, lightboxImageDir) {
        require(['libs/jquery/jquery-lightbox-0.5'], function() {
            var config = {
                imageLoading: lightboxImageDir + 'lightbox-ico-loading.gif',     
                imageBtnPrev: lightboxImageDir + 'lightbox-btn-prev.gif',            
                imageBtnNext: lightboxImageDir + 'lightbox-btn-next.gif',            
                imageBtnClose: lightboxImageDir + 'lightbox-btn-close.gif',      
                imageBlank: lightboxImageDir + 'lightbox-blank.gif'          
            };

            $('a[rel*="lightbox"]', element).lightBox(config);
        });
    }

    exports.init = function(element, lightboxImageDir) {
        this.highlightExternalUrls(element);
        
        if($(element).has('a[rel*="lightbox"]').length > 0) {
            this.initLightbox(element, lightboxImageDir);
        }

        if($(element).has('pre').length > 0) {
          this.highlightSyntax(element);
        }
    }

    return exports;
});