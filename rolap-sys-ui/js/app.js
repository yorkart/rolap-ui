App = Ember.Application.create();



App.ApplicationController = Ember.Controller.extend({
	selectedProduct: null,
	products: [
		{name: "公共", id: 1},
		{name: "酒店", id: 2},
		{name: "机票", id: 3},
		{name: "国际机票", id: 4},
		{name: "景区", id: 5}
	]
});