
function DimensionCtrl($scope,$http) {

	$scope.$watch('product',function(newVal,oldVal,$scope){
		console.log(newVal + '替换' + oldVal);
	});
	$http.get('products.json').success(function(data) {
		$scope.products = data;
		$scope.product = $scope.products[2]; // red
	});

}