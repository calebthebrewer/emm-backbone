define(["emmbb"], function(emmbb) {

var learn = createAppGroup("learn");
learn.createApp({
	name: "Text Page",
	type: "text",
	data: {
		title: "What you Need to Know About Product Reports",
		content: "This could be a whole bunch of good looking content."
	}
});
learn.createApp({
	name: "Data Table",
	type: "complex",
	data: {
		applications: [
		{
			type: "text",
			data: {
				title: "City Inventory",
				content: "We counted up all the people and where they live. It took us quite a while, so hopefully the numbers don't change."
			}
		},
		{
			type: "table",
			data: {
				headers: ["City", "State", "Population"],
				rows: [
					["New York", "New York", "8,336,697"],
					["Los Angeles", "California", "3,857,799"],
					["Chicago", "Illinois", "2,714,856"],
					["Houston", "Texas", "2,160,821"],
					["Philadelphia", "Pennsylvania", "1,547,607"],
					["Phoenix", "Arizona", "1,488,750"],
					["San Antonio", "Texas", "1,382,951"],
					["San Diego", "California", "1,338,348"],
					["Dallas", "Texas", "1,241,162"],
					["San Jose", "California", "982,765"],
					["Austin", "Texas", "842,592"]
				]		
			}
		}
		]
		
	}
});
//I'd like to be able to create this later
learn.createHiddenApp({
	name: "Form Submitted",
	type: "text",
	data: {
		title: "Form Submitted!",
		content: "Congratulations, you just submitted a form."
	}
});
learn.createApp({
	name: "Form Fun",
	type: "form",
	data: {
		title: "Reports Form",
		fields: [
			{
				label: "Report Name",
				name: "reportName",
				type: "text",
				helper: "Enter a name for this report."
				//something here for validation
			},
			{
				label: "Hello Word",
				name: "asdfasdf",
				type: "text",
				helper: "Enter a name for this report."
				//something here for validation
			},
			{
				label: "Report Description",
				name: "reportDescription",
				type: "textarea"
			},
			{
				label: "Report Type",
				name: "reportType",
				type: "select",
				options: [
					{
						label: "Recurring",
						value: "recurring"
					},
					{
						label: "Campaign",
						value: "campaign"
					},
					{
						label: "Just for Fun",
						value: "justForFun"
					}
				]
			},
			{
				label: "Segments",
				name: "segments",
				type: "multi",
				options: [
					{
						label: "Age",
						value: "age"
					},
					{
						label: "Salary",
						value: "salary"
					},
					{
						label: "Location",
						value: "location"
					}
				]
			},
			{
				type: 'group',
				layout: 'col-md-6',
				fields: [
					{
						label: "Start Date",
						name: "stateDate",
						type: "date"
					},
					{
						label: "End Date",
						name: "endDate",
						type: "date"
					}
				]
			}
		],
		submit: {
			action: "api.explore.coremetrics.com/v2/campaign/create",
			after: "Form Submitted"
		}
	}
});

var plan = createAppGroup("plan");

var projectsPlan = plan.createAppGroup("Project");
var productProjectPlan = projectsPlan.createAppGroup("Product Project");
var productOneProductProjectPlan = productProjectPlan.createAppGroup("Product One");
productOneProductProjectPlan.createAppGroup("Lots Of");
productOneProductProjectPlan.createAppGroup("Sub Navs");
productProjectPlan.createAppGroup("Product Two");
productProjectPlan.createAppGroup("Product Three");
productProjectPlan.createAppGroup("Product Four");
projectsPlan.createApp({
	name: "Inventory Project"
});
projectsPlan.createApp({
	name: "All Projects"
});

plan.createApp({
	name: "Tasks"
});
plan.createApp({
	name: "Budgets"
});

var design = createAppGroup("design");
design.createApp({
	name: "Tree",
	type: "tree",
	data: {
		nodes: [
		
		]
	}
});
design.createApp({
	name: "Accordion",
	type: "accordion",
	data: {
		panels: [
			{
				title: "Collapsible Group Item #1",
				slug: "group1",
				content: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
			},
			{
				title: "Collapsible Group Item #2",
				slug: "group2",
				content: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
			},
			{
				title: "Collapsible Group Item #3",
				slug: "group3",
				content: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
			}
		]
	}
});

var build = createAppGroup("build");
build.createApp({
	name: "Campaigns",
	type: "complex"
});
build.createApp({
	name: "Reports",
	type: "list"
});
build.createApp({
	name: "Segments"
});
build.createApp({
	name: "Offers"
});
build.createApp({
	name: "Assets"
});

});