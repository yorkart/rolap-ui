
function ProductCtrl($scope) {
	$scope.products = [
		{name:'black', shade:'dark'},
		{name:'white', shade:'light'},
		{name:'red', shade:'dark'},
		{name:'blue', shade:'dark'},
		{name:'yellow', shade:'light'}
	];
	$scope.product = $scope.products[2]; // red
}

function ProductControler(){
	$.ajax({
        url: "http://tc11059:8765/products.json?=dt" + new Date().getTime(),
        type: "GET",
        dataType: 'json',
        timeout: 0,
        error: globalErrorHandle,
        success: function (data) {
            if (data != null && data.status == 'error') {
                alert(data.message);
                return;
            }
			alert('dd');
        }
    });
}