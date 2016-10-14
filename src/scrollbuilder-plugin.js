define(function (require) {
	var ScrollBuilder = require('scrollbuilder-logic');
	var $ = require('jquery');

	$.fn.scrollbuilder = function (option, value) {
		var methodReturn;
		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data('scrollbuilder');
			var options = typeof option === 'object' && option;

			if (!data) {
				data = new ScrollBuilder(options, this);
				$this.data('scrollbuilder', data);
			}

			if (typeof option === 'string') {
				methodReturn = data[option](value);
			}
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.scrollbuilder.Constructor = ScrollBuilder;

	return ScrollBuilder;
});
