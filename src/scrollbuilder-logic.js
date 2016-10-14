define(function (require) {

	var template = require('text!templates/scrollbuilder.html');
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
