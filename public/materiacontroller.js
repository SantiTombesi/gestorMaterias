var app = angular.module('MateriasApp', []);
app.controller('materiasController', function($scope, $http) {
		$scope.materias= [];
		$scope.formData = {};


$http.get('/api/materias')
	 .success(function(data) {
			 $scope.materias = data;
	 })
	 .error(function(data) {
			 console.log('Error: ' + data);
 	 });


$scope.crearMateria = function() {
	console.log("estoy aca");
	 console.log($scope.formData);
 		 $http.post('/api/materias', $scope.formData)
 				 .success(function(data) {
 						 $scope.formData = {};
 						 $scope.materias = data;

 				 })
 				 .error(function(data) {
 						 console.log('Error: ' + data);
 				 });
};



});
