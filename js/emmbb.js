jQuery(function($){
	$("#sidebar-button").click(function() {
		emmbb.showSidebar();
	});
	
	$("#shades").click(function() {
		emmbb.hideSidebar();
	});
	
	$("#sidebar").find(".subnav-label").each(function() {
		$(this).click(function() {
			emmbb.toggleSubnav($(this).parent());
		});
	});
});

var emmbb = {};

emmbb.showSidebar = function() {
	$("#sidebar").show("slide");
	$("#shades").show("fade");
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
