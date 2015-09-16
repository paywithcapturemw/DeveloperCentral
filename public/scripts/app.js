/**
 * @ngdoc overview
 * @name andelaNotesApp
 * @description
 * # andelaNotesApp
 *
 * Main module of the application.
 */
var app = angular.module('DeveloperCentral', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
]);
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .when('/services', {
            templateUrl: 'views/services-list.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .when('/airtime-purchases', {
            templateUrl: 'views/airtime-purchase.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .when('/transfers', {
            templateUrl: 'views/transfer.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .when('/payments', {
            templateUrl: 'views/payments.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .otherwise({
            redirectTo: '/'
        });
});
