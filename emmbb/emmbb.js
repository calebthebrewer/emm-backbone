define(["jquery", "underscore", "backbone", "i18next", "jquery-cookie"], function($, _, backbone) {
	
/**
 * The wonderful EMM Backbone Singleton..because everyone loves a singleton
 */
var emmbb = (function() {
	//private stuff
	var	apps = [],
		routes = {
			"": "home"
		},
		specialTypes = {
			form: function(app) {
				var submit = app.uniqueName + "_" + (app.data.submit.name ? app.data.submit.name : "submit");
				var route = getAppRoute(app.data.submit.after, app.parent);
				//bind a function to this form
				$(document).on("submit", "#" + submit, function(e) {
					e.preventDefault();
					//some amount of validation should be done here
					//do something with app.data.submit.action
					console.log("I can also do something with the data.", this);
					//we might want to use replace:true to disallow people from 
					//going back to the form in progress, if thats a thing
					router.navigate(route, {trigger: true});
				});
				//replace the submit attribute with something we like
				app.data.submit = submit;
				
				return app;
			}
		},
		formTemplates = {},
		applicationTemplates = {},
		globalTemplates = {};

	function generateBackbone(apps) {
		_.each(apps, function(app) {
			if (app.type == "group") {
				//don't generate a template for groups
				generateBackbone(app.apps());
			} else {
				router.on("route:" + app.uniqueName, function() {
				if (app.type == null) {
					//type undefined
					var underscoreTemplate = _.template($("#error-template").html(), {
						message: "The type for '" + app.name + "' is not defined."
					});
				} else if (!$("#" + app.type + "-template").length) {
					//template missing
					var underscoreTemplate = _.template($("#error-template").html(), {
						message: "The '" + app.type + "' template is not defined."
					});
				} else if (!app.data) {
					//data missing
					var underscoreTemplate = _.template($("#error-template").html(), {
						message: "There is no 'data' defined for " + app.name + "."
					});
				} else {
					//the normal template
					var underscoreTemplate = _.template($("#" + app.type + "-template").html(), app.data);
				}
				var Template = Backbone.View.extend({
					el: "#main-container",
					render: function() {
						var template = underscoreTemplate;
						this.$el.html(template);
					}
				});	
				var template = new Template();
					template.render();
				});
			}
		});
		
		//generate partial templates
		$(".form-template").each(function() {
			var id = this.id.split("-")[0];
			
			formTemplates[id] = _.template($(this).html());
		});
		$(".application-template").each(function() {
			var id = this.id.split("-")[0];
			
			applicationTemplates[id] = _.template($(this).html());
		});
	}
	
	function getAppRoute(appName, parentApp) {
		var route = null;
		
		if (appName.indexOf("#") > -1) {
			//find the app from the root emm app
			_.each(appName.split("#"), function(appName) {
				parentApp = _.findWhere(parentApp ? parentApp.apps() : emmbb.apps(), {name: appName});
			});
		} else {
			parentApp = _.findWhere(parentApp.apps(), {name: appName});
		}
		
		_.each(routes, function(value, key) {
			if (parentApp.uniqueName === value) {
				route = key;
			}
		});
		return "#/" + route;
	}

	function partials(type, partial, data) {
		var exists = false;
		//make sure template exists
		if (type[partial]) exists = true;
		//if no data present, return status of template
		if (!data) return exists;
		//return rendered template
		return type[partial](data);
	}
	
	//public stuff
	var emmbb = {};
	
	emmbb.formPartials = function(partial, data) {
		return partials(formTemplates, partial, data);
	};
	
	emmbb.applicationPartials = function(partial, data) {
		return partials(applicationTemplates, partial, data);		
	};
	
	emmbb.accessibility = {
		toggleDir: function() {
			$("body").toggleClass('rtl');
		},
		setLang: function(lang) {
			$.cookie('emm-lang', lang);
			window.location.reload();
		},
		rtl: function() {
			return $.cookie('emm-lang') == 'he';
		}
	};
	
	emmbb.getAppRoute = getAppRoute;
	var direction = $.cookie('emm-lang') == "he" ? "right" : "left";
	emmbb.toggleSidebar = function() {
		$("#sidebar").toggle("slide", {direction: direction}, "fast");
		$("#shades").toggle("fade", "fast");
	};
	emmbb.hideSidebar = function() {
		$("#sidebar").hide("slide", {direction: direction}, "fast");
		$("#shades").hide("fade", "fast");
	};
	
	function accordionSubNavs(container) {
		$(container).siblings().find("ul").hide("slide");
		$(container).find("ul").first().toggle("slide");
	}
	
	function resetSubNavs(container) {
		_.each(container.find("li"), function(li) {
			$(li).show("blinds");
			$(li).find("ul").hide("blinds");
		});
	}
	
	function fancySubNavs(container) {
		$(container).siblings().toggle("blinds");
		$(container).find("ul").first().toggle("blinds");
		resetSubNavs(container);
	}
	
	var fancyMenu = true;
	emmbb.setFancyMenu = function(value) {
		if (typeof value !== 'boolean') throw "Must give a boolean value.";
		fancyMenu = value;
		
		if (!value) return "Boring menus it is...";
		return "Couldn't stand them, could you?";
	};
	emmbb.resetMenu = function() {
		resetSubNavs($("#navigation").first("ul"));
	};
	emmbb.toggleSubnav = function(container) {
		if (fancyMenu) {
			fancySubNavs(container);
		} else {
			accordionSubNavs(container);
		}
	};
	
	emmbb.hideOtherSubnavs = function(container) {
		$(container).siblings().find("ul").hide("blinds");
	};
	emmbb.generateBackbone = function() {
		generateBackbone(emmbb.apps());
	};
	emmbb.App = function(options) {
		if (typeof options != "object")
			throw "The method 'createApp' must take an object but is given a " + typeof options + ".";
		//extend options with defaults
		var app = {
			data: null,
			type: null,
			name: null
		};
		$.extend(app, options);
		
		//private things
		function camelCase(input) {
			//TODO this will only camel case a name "Like This" and not one like-this
			return input.toLowerCase().replace(/\s(.)/g, function(match, group1) {
				return group1.toUpperCase();
			});
		}

		function urlEncode(input) {
			return (input.toLowerCase().replace(/\s/g, "+"));
		}

		var apps = [];

		//public things
		app.slug = camelCase(options.name);
		app.uniqueName = options.parent ? options.parent.slug + "_" + app.slug : app.slug;
		app.href = function(prefix) {
			//make sure we have a valid prefix
			prefix = prefix ? prefix : "";
			//concatonate with parent href, if there is a parent
			prefix = options.parent ? options.parent.href(prefix) + "/" : prefix;
			//make sure string is url safe
			return prefix + urlEncode(options.name);
		};
		app.createApp = function(options) {
			//make sure the parent is correct
			options['parent'] = this;
			var app = new emmbb.App(options);
			//add route for app
			emmbb.addRoute(app.href(), app.uniqueName);
			//add sub level app
			apps.push(app);
			
			return app;
		};
		app.createAppGroup = function(name) {
			if (this.type != "group")
				throw "App '" + this.name + "' is not of type 'group' and therefore cannot create child apps.";
			//build the options and create as normal
			return appGroup = this.createApp({
				name: name,
				type: "group"
			});
		};
		app.createHiddenApp = function(options) {
			options['hidden'] = true;
			return this.createApp(options);
		};
		app.apps = function() {
			return apps.length > 0 ? apps : null;
		};
		
		//run special things on app if they exist
		if (specialTypes[app.type]) app = specialTypes[app.type](app);
		
		return app;
	};
	//this function exposed for convenience
	createApp = emmbb.createApp = function(options) {
		var app = new emmbb.App(options);
		//add top level app and return
		apps.push(app);
		
		return app;
	};
	createAppGroup = emmbb.createAppGroup = function(name) {
		return emmbb.createApp({
			name: name,
			type: "group"
		});
	};
	createHiddenApp = emmbb.createHiddenApp = function(options) {
		options['hidden'] = true;
		return createApp(options);
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

window.emmbb = emmbb;

});

