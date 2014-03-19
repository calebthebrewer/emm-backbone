define(["emmbb"], function(emmbb) {

var learn = createAppGroup("Learn");
learn.createApp({
	name: "Product Reports",
	type: "text",
	data: {
		title: "What you Need to Know About Product Reports",
		content: "This could be a whole bunch of good looking content."
	}
});
learn.createApp({
	name: "Inventory Reports",
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
	name: "All Reports",
	type: "form",
	data: {
		title: "Reports Form",
		fields: [
			{
				label: "Text Input",
				name: "textInput",
				type: "text",
				helper: "This text area can give you some help, because you obviously need it."
				//something here for validation
			},
			{
				label: "Password",
				name: "password",
				type: "password"
			},
			{
				label: "Text Area",
				name: "textArea",
				type: "textarea"
			},
			{
				label: "Select Input",
				name: "select",
				type: "select",
				options: [
					{
						label: "Option 1",
						value: "option1"
					},
					{
						label: "Option 2",
						value: "option2"
					}
				]
			},
			{
				label: "Multi-Select Input",
				name: "multiSelect",
				type: "multi",
				options: [
					{
						label: "Option 1",
						value: "option1"
					},
					{
						label: "Option 2",
						value: "option2"
					}
				]
			},
			{
				label: "Checkbox",
				name: "checkbox",
				type: "checkbox",
				options: [
					{
						label: "Option 1",
						name: "option1"
					},
					{
						label: "Option 2",
						name: "option2"
					}
				],
			},
			{
				label: "Radio Input",
				name: "radio",
				type: "radio",
				options: [
					{
						label: "Option 1",
						value: "option1"
					},
					{
						label: "Option 2",
						value: "option2"
					}
				],
				helper: "A bunch of fun radios!"
			},
			{
				label: "Date Picker",
				name: "date",
				type: "date"
			}
		],
		submit: {
			action: "api.explore.coremetrics.com/v2/campaign/create",
			after: "Form Submitted"
		}
	}
});

var plan = createAppGroup("Plan");

var projectsPlan = plan.createAppGroup("Project");
var productProjectPlan = projectsPlan.createAppGroup("Product Project");
var productOneProductProjectPlan = productProjectPlan.createAppGroup("Product One");
productOneProductProjectPlan.createAppGroup("How Long");
productOneProductProjectPlan.createAppGroup("Will This");
productOneProductProjectPlan.createAppGroup("Go On?");
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

var design = createAppGroup("Design");
design.createApp({
	name: "Communications"
});
design.createApp({
	name: "Blueprints"
});

var build = createAppGroup("Build");
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