var app = angular.module('app',['ngRoute']);

var count = 0;

app.config(function ($routeProvider){
	$routeProvider
	.when('/list',{
		controller:'control',
		templateUrl:'list.html'
	})
	.when('/add',{
		controller:'control',
		templateUrl:'add.html'	
	})
	.when('/edit/:id',{
		controller:'editdata',
		templateUrl:'edit.html'
	})
	.otherwise({redirectTo : '/list'});
});


app.controller("main",function ($scope,$http){
	
	
});
app.controller("control",function ($scope,$http,$location){
	var flag = 0;

	$http.get('/list').success(function(data){
		//$scope.nothing = "ayaaa";
		if(data[0]==null){
				$scope.errM = "Book list is currently empty";
			}
		$scope.user=data;
	}) ;


	$scope.addbook=function(){
		var add = {
			"Title" : $scope.title,
			"Author": $scope.author,
			"status": "non - issued"
		};
		if($scope.title&&$scope.author){
		$http.post("/add",add).success(function(data){

			$scope.user = data;
		});
		$location.path('/list');
		}
		else
			$scope.err = "please provide full data";
	};

	$scope.deletebook = function(id){
		$http.delete('/list/'+id).success(function(data){
			$scope.user = data;
			if(data[0]==null){
				$scope.errM = "Book list is currently empty";
			}
			$scope.err = "";
		});
	};
	

	$scope.issuebook = function(id){
		if($scope.user[id].status=="issued"){
			$scope.err = "cannot issue" +$scope.user[id].Title+" book right now";
		}
		else{
		$http.post('/list/'+id).success(function(data){
			$scope.user = data;
			$scope.err = "";
		});
	}
	};



});


app.controller('editdata',function($scope,$routeParams,$http,$location){
	var id = $routeParams.id;

	

	$scope.editbook =function(){
		var nuser = {
			"id" : id,
		"Title" : $scope.newName,
		"Author": $scope.newAuthor,
		"status":"non - issued"
	}
		if($scope.newName&&$scope.newAuthor){
		$http.put('/edit',nuser).success(function(data){
			$scope.user = data;
		});
		$location.path('/list');
		}
		else
			$scope.err = "please provide full data";
	};


});

