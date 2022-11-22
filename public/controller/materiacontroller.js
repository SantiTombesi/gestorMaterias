
var app = angular.module('MateriasApp', []);
app.controller('materiasController', function($scope, $http) {
$scope.ideas= [];

$http.get('/api/materias')
			 .success(function(data) {
					 $scope.ideas = data;
			 })
			 .error(function(data) {
					 console.log('Error: ' + data);
			 });
