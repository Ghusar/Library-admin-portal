var app = angular.module('app',['ngRoute']);

app.config(function ($routeProvider){
	$routeProvider
	.when('/',{
		controller:'control',
		templateUrl:'partials/list.html'
	})
	.when('/add',{
		controller:'control',
		templateUrl:'partials/add.html'	
	})
	.when('/edit/:id',{
		controller:'editdata',
		templateUrl:'partials/edit.html'
	})
	.otherwise({redirectTo : '/'});
});


app.controller("main",function ($scope,$http){
	$http.get('Books.json').success(function(data){
		$scope.user=data;
	}) ;

});
app.controller("control",function ($scope){
	$scope.addbook=function(){
		$scope.user.push({
			"Title" : $scope.title,
			"Author": $scope.author,
			"status": "non - issued"
		});
		//$routeProvider.otherwise({redirectTo : '/'});
	};

	$scope.issuebook = function(id){
		$scope.user[id].status = "issued";
	};



});

app.controller('editdata',function($scope,$routeParams){
	var id = $routeParams.id;
	$scope.editbook =function(){
		$scope.user[id].Title = $scope.newName;
		$scope.user[id].Author = $scope.newAuthor;
	}
});



