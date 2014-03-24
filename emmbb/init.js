//TODO we should be able to pass emmbb into define's callback
define(["i18next", "emmbb", "applications"], function(i18n) {
	
	//before we do anything, start up i18next
	var language = $.cookie('emm-lang') ? $.cookie('emm-lang') : 'en';
	if (language == 'he') {
		emmbb.accessibility.toggleDir();
	}
	i18n.init({lng: language}, function(t) {
		window.i18n = function(key, options) {
			var translation = t(key, options);
			
			if (key != translation) return translation;
			return key.split(".")[1];
		};

		var Home = Backbone.View.extend({
			el: '#main-container',
			render: function() {
				var template = _.template($("#home-template").html(), {
					somevar: "someval"
				});
				this.$el.html(template);
			}
		});
		var home = new Home();
		var Router = Backbone.Router.extend({
			routes: emmbb.routes(),
			initialize: function() {
				this.bind("all", function() {
					//whenever a route is run, do this
					emmbb.hideSidebar();
				});
			}
		});
		var router = new Router();
		router.on('route:home', function() {
			home.render();
		});
		//exposed for emmbb purposes
		window.router = router;
	
		//generate backbone objects for emmbb
		emmbb.generateBackbone(); //could take router as param to avoid exposing router globally
		//build the nav and header
		var headerTemplate = _.template($("#header-template").html());
		$("header").html(headerTemplate());
		var navigationTemplate = _.template($("#navigation-template").html());
		$("#navigation").html(navigationTemplate({
			apps: emmbb.apps(),
			prefix: '#/',
			template: navigationTemplate
		}));

		//start the backbone router
		Backbone.history.start();
	
		//document ready things
		$(".navbar-toggle").click(function() {
			
			emmbb.toggleSidebar();
		});
		
		$(window).resize(function() {
			resize();
		});
		
		function resize() {
			$("#sidebar").css("padding-top", $("#top").height() + 5);
			$("#main-container").css("padding-top", $("#top").height() +5);
		}
		resize();
		
		$("#shades").click(function() {
			emmbb.toggleSidebar();
		});
		$("#sidebar").on("click", ".subnav-label", function(e) {
			e.preventDefault();
			emmbb.toggleSubnav($(this).parent());
		});
		$("#sidebar").on("click", ".nav-link", function(e) {
			$("#sidebar").find(".active:first").removeClass('active');
			$(this).addClass("active");
		});
		
		$(document).on("click", ".datepicker", function(e) {
			if (!$(this).datapickerSet) {
				var $date = $(this).find('.date');
				$date.datepicker();
				$date.datepicker('show');
				$(this).datepickerSet = true;
			}
		});
	
	});
});