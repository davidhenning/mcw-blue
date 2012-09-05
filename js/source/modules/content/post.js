'use strict';

define(['jquery'], function($) {
    var exports = {};

    exports.initLightbox = function(element, lightboxImageDir) {
        require(['vendor/jquery-plugins/jquery-lightbox-0.5'], function() {
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
        if($(element).has('a[rel*="lightbox"]').length > 0) {
            this.initLightbox(element, lightboxImageDir);
        }
    }

    return exports;
});