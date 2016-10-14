
define('text-templates/scrollbuilder.html',[],function () { return '<div class="scrollbuilder">\n\t<% _.each(certificates, function (cert) { %>\n\t<div class="certificate">\n\n\t\t<div class="ampersand"></div>\n\t\t<div class="name"><%= cert.name %></div>\n\t\t<div class="adventure"><%= cert.adventure %></div>\n\n\t\t<div class="redbar"></div>\n\n\t\t<div class="rarity">\n\t\t\t<%= cert.rarity %>\n\t\t\t<% if (cert.attunement === true) { %> (requires attunement) <% } %>\n\t\t\t<% if (_.isString(cert.attunement)) { %> (requires attunement by <%= cert.attunement %>) <% } %>\n\t\t</div>\n\t\t<div class="description"><%= cert.description %></div>\n\n\t\t<div class="tableblock">\n\t\t\t<div class="notrade">This item is not eligable for trading</div>\n\t\t\t<table>\n\t\t\t\t<tr class="input"><td></td><td></td><td></td></tr>\n\t\t\t\t<tr class="label"><td>CHARACTER</td><td>PLAYER</td><td>PLAYER DCI #</td></tr>\n\t\t\t\t<tr class="input"><td><%= cert.dmname %></td><td><%= cert.dmdci %></td><td></td></tr>\n\t\t\t\t<tr class="label"><td>DUNGEON MASTER</td><td>DUNGEON MASTER DCI #</td><td>DM SIGNATURE</td></tr>\n\t\t\t</table>\n\t\t</div>\n\t</div>\n\t<% }); %>\n</div>\n';});

define('scrollbuilder-logic',['require','text-templates/scrollbuilder.html','underscore','jquery'],function (require) {

	var template = require('text-templates/scrollbuilder.html');
	var _ = require('underscore');
	var $ = require('jquery');


	// scrollbuilder CONSTRUCTOR AND PROTOTYPE

	var CertGen = function (options, element) {
		this.$element = element ? $(element) : $('<div/>');
		this.options = _.extend({}, options);
		this.elements = {
			wrapper: this.$element
		};
		this.certificates = this.options.certificates || [];

		//_.bindAll(this, '_onClose', '_onCancel', '_onConfirm', '_onSecondary');

		this.render();
	};

	CertGen.prototype = {

		constructor: CertGen,

		render: function () {
			var self = this;
			var data = {
				certificates: self.certificates
			};
			var html = _.template(template, data);

			self.$element.html(html);
		}
	};

	return CertGen;
});

define('scrollbuilder',['require','scrollbuilder-logic','jquery'],function (require) {
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

