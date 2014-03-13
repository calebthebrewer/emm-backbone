require(["//underscorejs.org/underscore-min.js", "jquery.min"], function() {
	require(["backbone.min", "//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js", "//code.jquery.com/ui/1.10.4/jquery-ui.min.js"], function() {
		var Home = Backbone.View.extend({
			el: '#main-container',
			render: function() {
				var template = _.template($("#home-template").html(), {somevar: "someval"});
				this.$el.html(template);
			}
		});
		var home = new Home();
		
		var CampaignBuilder = Backbone.View.extend({
			el: "#main-container",
			render: function() {
				var template = _.template($("#campaignBuilder-template").html());
				this.$el.html(template);
			}
		});
		var campaignBuilder = new CampaignBuilder();
		
		var BlueprintDesigner = Backbone.View.extend({
			el: "#main-container",
			render: function() {
				var template = _.template($("#blueprintDesigner-template").html());
				this.$el.html(template);
			}
		});
		var blueprintDesigner = new BlueprintDesigner();
		
		var Router = Backbone.Router.extend({
			routes: {
				'': 'home',
				'design/blueprint': 'blueprintDesigner',
				'build/campaign': 'campaignBuilder'
			},
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
		router.on('route:campaignBuilder', function() {
			campaignBuilder.render();
		});
		router.on('route:blueprintDesigner', function() {
			blueprintDesigner.render();
		});
		window.router = router;
		Backbone.history.start();
	});
	jQuery(function($) {
		$("#sidebar-button").click(function() {
			emmbb.toggleSidebar();
		});

		$("#shades").click(function() { 
			emmbb.toggleSidebar();
		});

		$("#sidebar").find(".subnav-label").each(function() {
			$(this).click(function(e) {
				e.preventDefault();
				emmbb.toggleSubnav($(this).parent());
			});
		});
	});
	
	emmbb.toggleSidebar = function() {
		$("#sidebar").toggle("slide", "fast");
		$("#shades").toggle("fade", "fast");
	};
	
	emmbb.hideSidebar = function() {
		$("#sidebar").hide("slide", "fast");
		$("#shades").hide("fade", "fast");
	};

	emmbb.toggleSubnav = function(container) {
		emmbb.hideOtherSubnavs(container);
		//I don't know if we want to do this or not - also it's not perfet yet
	//	$(container).siblings().toggle("fade");
		$(container).find("ul").first().toggle("blinds");
	};

	emmbb.hideOtherSubnavs = function(container) {
		$(container).siblings().find("ul").hide("blinds");
	};
});

var emmbb = {};

