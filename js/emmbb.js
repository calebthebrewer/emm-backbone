require(["jquery.min"], function() {
	require(["//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"]);
	require(["//code.jquery.com/ui/1.10.4/jquery-ui.min.js"], function() {
		jqueryReady();
	});
});
require(["//underscorejs.org/underscore-min.js"], function() {
	require(["backbone.min"], function() {
		backboneReady();
	});
});

function backboneReady() {
	var navigationTemplate = _.template($("#navigation-template").html());
	$("#navigation").html(navigationTemplate({
		apps: emmbb.apps,
		prefix: '#/',
		template: navigationTemplate
	}));
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
		routes: emmbb.generateRoutes(emmbb.apps, {
			"": "home"
		}),
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
	router.on('route:buildCampaigns', function() {
		campaignBuilder.render();
	});
	router.on('route:designBlueprints', function() {
		blueprintDesigner.render();
	});
	window.router = router;
	Backbone.history.start();
}

function jqueryReady() {
	//document ready things
	$("#sidebar-button").click(function() {
		emmbb.toggleSidebar();
	});
	$("#shades").click(function() {
		emmbb.toggleSidebar();
	});
	$("#sidebar").on("click", ".subnav-label", function(e) {
		e.preventDefault();
		emmbb.toggleSubnav($(this).parent());
	});
}
var emmbb = {};
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
emmbb.generateRoutes = function(apps, routes, prefix) {
	if (!prefix) prefix = "";
	_.each(apps, function(app) {
		if (app.apps) {
			emmbb.generateRoutes(app.apps, routes, app.href(prefix) + "/");
		} else {
			routes[app.href([prefix])] = app.slug;
		}
	});
	return routes;
};
emmbb.App = function(options) {
	//TODO this will only camel case a name "Like This" and not one like-this
	function camelCase(input) {
		return input.toLowerCase().replace(/\s(.)/g, function(match, group1) {
			return group1.toUpperCase();
		});
	}
	return {
		name: options.name,
		slug: camelCase(options.name),
		href: function(prefix) {
			return prefix + options.name.toLowerCase().replace(/\s/g, "+");
		},
		apps: options.apps ? options.apps : null
	};
};

emmbb.apps = [
	new emmbb.App({
		name: "Learn", 
		apps: [
			new emmbb.App({name: "Hothweels Report"}),
			new emmbb.App({name: "Barbie Report"}),
			new emmbb.App({name: "All Reports"})
		]
	}),
	new emmbb.App({
		name: "Plan", 
		apps: [
			new emmbb.App({
				name: "Projects", 
				apps: [
					new emmbb.App({name: "Hothweels Project"}),
					new emmbb.App({name: "Barbie Project"}),
					new emmbb.App({name: "All Projects"})
				]
			}),
			new emmbb.App({name: "Tasks"}),
			new emmbb.App({name: "Budgets"})
		]
	}),
	new emmbb.App({
		name: "Design", 
		apps: [
			new emmbb.App({name: "Communications"}),
			new emmbb.App({name: "Blueprints"})
		]
	}),
	new emmbb.App({
		name: "Build", 
		apps: [
			new emmbb.App({name: "Campaigns"}),
			new emmbb.App({name: "Reports"}),
			new emmbb.App({name: "Segments"}),
			new emmbb.App({name: "Offers"}),
			new emmbb.App({name: "Assets"})
		]
	})
];