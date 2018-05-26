
//List modules which it uses
var app = angular.module('myApp', [
    'ngRoute',
    'myApp.controllers'
]);

app.config(['$routeProvider', function ($routeProvider) {
    var urlBase='partials/';

    $routeProvider.when('/', {
        templateUrl: urlBase + 'basicView.html',
        controller: 'masterCtrl'
    }).when('/view1', {
        templateUrl: urlBase + 'basicView.html',
        controller: 'masterCtrl'
    }).when('/view2', {
        templateUrl: urlBase + 'dataView.html',
        controller: 'masterCtrl'
    });
}]);

app.run(function ($rootScope) {
    console.log('Uruchamiam app.run');

    $rootScope.M = {};
    //Global properties
    $rootScope.M.URL = 'http://localhost:8888';
});
