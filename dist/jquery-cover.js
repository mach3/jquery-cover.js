/*!
 * jquery-cover.js
 * ---------------
 * @version 0.1.0
 * @author mach3 <http://github.com/mach3>
 * @license MIT
 * @require jQuery
 * @url https://github.com/mach3/jquery-cover.js
 */
(function($){

	$.extend($.support, {
		cssTransform: ("transform" in document.createElement("i").style)
			|| ("-webkit-transform" in document.createElement("i").style)
			|| ("-ms-transform" in document.createElement("i").style)
	});

	$._format = function(){
		var args = Array.prototype.slice.call(arguments);
		return args.shift().replace(/%s/g, function(){
			return args.length ? args.shift() : "";
		});
	};

	/**
	 * Cover the content
	 * @param {jQuery|HTML*Element} content
	 * @param {Object} options
	 */
	$.fn.cover = function(content, options){
		var cover = ({

			options: $.extend({
				transform: true,
				listen: false
			}, options),

			container: this,
			content: $(content),
			origin: {
				width: parseInt(content.attr("width"), 10) || content.width(),
				height: parseInt(content.attr("height"), 10) || content.height()
			},
			current: null,

			init: function(){
				this.update();
				this.container.append(this.content);
				if(this.options.listen){
					this.listen = $.proxy(this.listen, this);
					$(window).on("resize", this.listen);
				}
			},

			update: function(){
				var origin, dest, scale, translate;

				origin = this.origin;
				dest = this.getSize();
				scale = Math.max(
					dest.width / origin.width,
					dest.height / origin.height
				);
				translate = {
					x: (dest.width - (scale * origin.width)) / 2,
					y: (dest.height - (scale * origin.height)) / 2
				};

				if($.support.cssTransform && this.options.transform){
					this.content.css({
						transformOrigin: "0 0",
						transform: $._format(
							"translate(%spx,%spx) scale(%s)",
							translate.x, translate.y, scale
						)
					});
				} else {
					this.content.css({
						width: scale * origin.width,
						height: scale * origin.height,
						marginLeft: translate.x,
						marginTop: translate.y
					});
				}
				this.current = dest;
			},

			getSize: function(){
				return {
					width: this.container.width(),
					height: this.container.height()
				};
			},

			listen: function(){
				var size = this.getSize();
				if(size.width !== this.current.width || size.height !== this.current.height){
					this.update();
				}
			}

		}).init();

		return this;
	};

	/**
	 * Let container cover self
	 * @param {jQuery|HTML*Element} container
	 * @param {Object} options
	 */
	$.fn.coverTo = function(container, options){
		$(container).cover(this, options);
		return this;
	};

}(jQuery));