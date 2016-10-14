define([], function () {
	return {
		makeCSSLinks: function (paths) {
			var docHead = document.getElementsByTagName('head')[0],
				docFragment = document.createDocumentFragment();
	
			for (var i = 0, len = paths.length; i < len; i++) {
				var el = document.createElement('link');
				el.setAttribute('rel', 'stylesheet');
				el.setAttribute('type', 'text/css');
				el.setAttribute('href', paths[i]);
				docFragment.appendChild(el);
			}
			
			docHead.appendChild(docFragment);
		}
	};
});
