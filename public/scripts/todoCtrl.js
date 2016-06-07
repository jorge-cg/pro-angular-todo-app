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
	}


})();