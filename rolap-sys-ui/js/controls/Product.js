
function ProductCtrl($scope,$http) {
	/*$.ajax({
		url:'products.json',
		type: "GET",
		dataType: 'json',
		success: function (data) {
			$scope.products = data;
			$scope.product = $scope.products[2]; // red
		}
	});*/
	$http.get('products.json').success(function(data) {
		$scope.products = data;
		$scope.product = $scope.products[2]; // red
	});
	/*
	$scope.products = [
		{name:'black', id:'123'},
		{name:'white', id:'456'},
		{name:'red', id:'789'},
		{name:'blue', id:'159'},
		{name:'yellow', id:'268'}
	];*/
	//$scope.product = $scope.products[2]; // red
	
	$scope.change = function(){
		console.log($scope.product.nodename);
		/*$.ajax({
			url: "http://tc11059:8765/products.json?=dt" + new Date().getTime(),
			type: "GET",
			dataType: 'json',
			timeout: 0,
			error: function(){},
			success: function (data) {
				alert('dd');
			}
		});*/
	}
}