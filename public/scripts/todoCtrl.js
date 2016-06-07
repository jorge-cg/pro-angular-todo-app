(function (){
	angular.module("TodoApp").controller("todoCtrl", ["$scope", "$http", todoController]);

	function todoController($scope, $http){
		$scope.list= [];
		$scope.editing= null;
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
		};
		$scope.warningLevel = function () {
			return $scope.incompleteCount() < 3 ? "label-success" : "label-warning";
		}

		$scope.addNewItem = function (actionText) {
			if(actionText){	
				$scope.list.push({ task: actionText, done: false });
				$scope.clearTask();
			}
		};

		$scope.clearTask= function(){
			$scope.newTask= "";
		};
		$scope.deleteTask= function(){
			$scope.list.splice(this.$index,1);
		};

		$scope.EditTask= function(task){
			$scope.editing= this.$index;
			$scope.editTask= task;
		};

		$scope.saveTask= function(task){
			if(task){	
				console.log($scope.list[$scope.editing]);
				$scope.list[$scope.editing].task= task;
				$scope.endEdit();
			}
		};
		$scope.endEdit= function(){
			$scope.editing= null;
			$scope.editTask= "";
		};
	}


})();