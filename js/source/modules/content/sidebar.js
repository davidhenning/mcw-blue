'use strict';

define(['jquery'], function($) {
	Date.prototype.getMonthName = function() {
		var names = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

		return names[this.getMonth()];
	}

	Date.prototype.getBlogDate = function() {
		return this.getDate() + '. ' + this.getMonthName() + ' ' + this.getFullYear();
	}

	var fillEntries = function(element, data) {
		var list = $('<ul></ul>');
		$(data).find('entry').each(function(index) {
			var item = $('<li></li>');
			var link = $('<a href="' + $(this).find('link').attr('href') + '">' + $(this).find('title').text() + '</a>');

			item.append(link);
			list.append(item);

			if(index == 4) {
				return false;
			}
		});

		$(element).append(list);
	}

	return {
		init: function(element) {
			$.get('/proxy.php', function(data) {
				fillEntries(element, data);
			});
		}
	}
});