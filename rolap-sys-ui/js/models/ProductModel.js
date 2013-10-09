
var ProductModel = Backbone.Model.extend({
	defaults : {
		nodeid : 0,
		nodename : ''
	}
});

var ProductCollection = Backbone.Collection.extend({
	url:"products.json",
	model : ProductModel
});