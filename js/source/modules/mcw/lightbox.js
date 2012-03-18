define(['jquery'], function($) {
	var exports = {};

	exports.init = function(element, imageDirUrl) {
		require(['libs/jquery/jquery-lightbox-0.5'], function() {
			var config = {
				imageLoading: imageDirUrl + 'lightbox-ico-loading.gif',		
				imageBtnPrev: imageDirUrl + 'lightbox-btn-prev.gif',			
				imageBtnNext: imageDirUrl + 'lightbox-btn-next.gif',			
				imageBtnClose: imageDirUrl + 'lightbox-btn-close.gif',		
				imageBlank:	imageDirUrl + 'lightbox-blank.gif'			
			};

			$('a[rel*="lightbox"]').lightBox(config);
		});
	}

	return exports;
});