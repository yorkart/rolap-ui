myApp.controller("MetadataCtrl", function ($scope,$http) {
	$http.get('products.json').success(function(data) {
		$scope.products = data;
		$scope.product = null;//$scope.products[0]; // red
	});
	$scope.change = function(){
		console.log($scope.product.nodename);
		$http.get('product.json?id=' + $scope.product.nodeid).success(function(data) {
			var html = tree_node(data[0][0].Child,true)
			$('#tree_dimension').html(html);
			$("#tree_dimension").treeview();
			
			html = tree_node(data[0][1].Child,false)
			$('#tree_measure').html(html);
			$("#tree_measure").treeview();
			
			drag_block.init();
			drag_block.setFilterEvent(function(e,source){
				console.log('setFilterEvent');
				var id = $(source).id;
				$('#myModalLabel').text( $(source).text());
				$('#dimensionModal').modal('toggle');
			});
		});
	}
	
	function tree_node(data,isDim){
		if(data == null || data.length == 0){
			return '';
		}
		var html = '';
		var node_type = isDim == true ? 'dimension' : 'measure';
		for(var i = 0; i< data.length;i++){
			var item = data[i];
			if(item.Child != null){
				html += '<li class="closed"><span class="folder">'+ item.Name +'</span><ul>';
				html += tree_node(item.Child,isDim);
				html += '</ul></li>'
			} else {
				html += '<li><span class="file ' + node_type + '" id="'+ item.Id +'">'+ item.Name +'</span></li>'
			}
		}
		return html;
	}
});