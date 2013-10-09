
var ProductView = Backbone.View.extend({
	el :  $('#product'),
	template : _.template($('#template-products').html()),
	//collection : new productCollection(),
	initialize: function () {
		_.bindAll(this, 'render','change_product');
		//this.render();
		this.collection = new ProductCollection();
		var that = this;
		this.collection.fetch({
			success : function(_collection){
				that.render();
			}
		});
    },
    events: {
        "change":  "change_product"   //事件绑定，绑定Dom中id为check的元素
    },
	change_product : function(){
		var sel = this.$el.val();
		var metadataView = new MetadataView();
		metadataView.load(sel);
	},
	render : function(){
		$(this.$el).html( 
				this.template({datas : this.collection.toJSON()})
			);
		
		return this;
	}
	
});