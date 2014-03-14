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
	emmbb.generateBackbone();	//could take router as param to avoid exposing router globally
	//build the nav, hopefully its not too late
	var navigationTemplate = _.template($("#navigation-template").html());
	$("#navigation").html(navigationTemplate({
		apps: emmbb.apps(),
		prefix: '#/',
		template: navigationTemplate
	}));
	//start the backbone router
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

/**
 * The wonderful EMM Backbone Singleton..because everyone loves a singleton
 */
var emmbb = (function() {
	//private stuff
	var apps = [];
	var routes = {"": "home"};

	function generateBackbone(apps) {
		_.each(apps, function(app) {
			if (app.type == "group") {
				generateBackbone(app.apps());
			}
			else {
				//add route controller
				router.on("route:" + app.uniqueName, function() {
					switch (app.type) {
					default:
						console.log(app.name + ": " + app.type);
						break;
					}
				});		
			}
		});
	}

	//public stuff
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
	emmbb.generateBackbone = function() {
		generateBackbone(emmbb.apps());
	};
	emmbb.App = function(options) {
		//private things
		function camelCase(input) {
			//TODO this will only camel case a name "Like This" and not one like-this
			return input.toLowerCase().replace(/\s(.)/g, function(match, group1) {
				return group1.toUpperCase();
			});
		}

		function urlEncode(input) {
			return (input.toLowerCase().replace(/\s/g, "+"))
		}

		var apps = [];

		//this will one day be an app
		var app = {};
		//public things
		app.name = options.name;
		app.slug = camelCase(options.name);
		app.uniqueName = options.parent ? options.parent.slug + "_" + app.slug : app.slug;
		app.type = options.type ? options.type : "group";
		app.href = function(prefix) {
			//make sure we have a valid prefix
			prefix = prefix ? prefix : "";
			//concatonate with parent href, if there is a parent
			prefix = options.parent ? options.parent.href(prefix) + "/" : prefix;
			//make sure string is url safe
			return prefix + urlEncode(options.name);
		};
		app.createApp = function(options) {
			if (this.type != "group") throw "App '" + this.name + "'' is not of type 'group' and therefore cannot create child apps.";
			//pass current app as reference
			options.parent = this;
			//construct via prototype
			var app = new emmbb.App(options);
			//add route for app
			emmbb.addRoute(app.href(), app.uniqueName);
			//add sub level app and return it for maipulation
			apps.push(app);
			return app;
		};
		app.createAppOnly = function(options) {
			this.createApp(options);
			return this;
		};
		app.apps = function() {
			return apps.length > 0 ? apps : null;
		};

		return app;
	};
	//this function exposed for convenience
	createApp = emmbb.createApp = function(options) {
		//construct via prototype
		var app = new emmbb.App(options);

		//add top level app and return it for manipulation
		apps.push(app);
		return app;
	};
	emmbb.apps = function() {
		return apps;
	};
	emmbb.addRoute = function(path, controller) {
		if (routes[path]) throw "The following path is being declared too many times: " + path;
		routes[path] = controller;
	};
	emmbb.routes = function() {
		return routes;
	};

	return emmbb;
})();

//top leve app learn, chained with sub level apps
var learn = createApp({
		name: "Learn"
	})
	.createAppOnly({
		name: "Product Reports",
		type: "list"
	})
	.createAppOnly({
		name: "Inventory Reports",
		type: "table"
	})
	.createAppOnly({
		name: "All Reports",
		type: "table"
	});

//top level app plan
var plan = createApp({
		name: "Plan"
	});
//sub level app projects, chained with sub sub level apps
var projectsPlan = plan.createApp({
		name: "Project"
	})
	.createAppOnly({
		name: "Product Project"
	})
	.createAppOnly({
		name: "Inventory Project"
	})
	.createAppOnly({
		name: "All Projects",
		type: "list"
	});
//the rest of plan's sub apps, chained
plan.createAppOnly({
		name: "Tasks"
	})
	.createAppOnly({
		name: "Budgets"
	});

var design = createApp({
		name: "Design"
	})
	.createAppOnly({
		name: "Communications"
	})
	.createAppOnly({
		name: "Blueprints"
	});

var build = createApp({
		name: "Build"
	})
	.createAppOnly({
		name: "Campaigns",
		type: "table",
		data: "http://data.table.json..."
	})
	.createAppOnly({
		name: "Reports"
	})
	.createAppOnly({
		name: "Segments"
	})
	.createAppOnly({
		name: "Offers"
	})
	.createAppOnly({
		name: "Assets"
	});
