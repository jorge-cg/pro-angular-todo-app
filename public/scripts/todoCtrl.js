(function (){
	angular.module("TodoApp").controller("todoCtrl", ["$scope", "$http", todoController]);

	function todoController($scope, $http){
		$scope.list= [];
		$http.get("/resources/list.json").then(function(response){
			$scope.list= response.data;
		}, 
		function(response){
			console.log(response);
		});

		$scope.incompleteCount = function () {
			// console.log("count executed");
			var count = 0;
			angular.forEach($scope.list, function (item) {
				if (!item.done) { count++ }
			});
			return count;
		}
	}


})();