

var MetadataView = Backbone.View.extend({
	
	initialize: function () {
		_.bindAll(this, 'render','load','tree_node');
		this.model = new MetadataModel();
	},
	load : function(product_id){
		var that = this;
		this.model.set({"productid" : product_id});
		this.model.fetch({
			success : function(_model){
				that.render();
			}
		});
	},
	render : function(){
		var data = this.model.toJSON();
		var html = this.tree_node(data[0][0].Child,true)
		$('#tree_dimension').html(html);
		$("#tree_dimension").treeview();
		
		html = this.tree_node(data[0][1].Child,false)
		$('#tree_measure').html(html);
		$("#tree_measure").treeview();
		
		drag_block.init();
		drag_block.setFilterEvent(function(e,source){
			console.log('setFilterEvent');
			var id = $(source).id;
			$('#myModalLabel').text( $(source).text());
			$('#dimensionModal').modal('toggle');
		});
	},
	tree_node : function(data,isDim){
		if(data == null || data.length == 0){
			return '';
		}
		var html = '';
		var node_type = isDim == true ? 'dimension' : 'measure';
		for(var i = 0; i< data.length;i++){
			var item = data[i];
			if(item.Child != null){
				html += '<li class="closed"><span class="folder">'+ item.Name +'</span><ul>';
				html += this.tree_node(item.Child,isDim);
				html += '</ul></li>'
			} else {
				html += '<li><span class="file ' + node_type + '" id="'+ item.Id +'">'+ item.Name +'</span></li>'
			}
		}
		return html;
	}
	
});