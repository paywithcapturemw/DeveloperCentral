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
  'ui.bootstrap',
  'ui.router',
  'ngStorage',
  'angular-jwt'
  // 'angularFileUpload'
]);
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('/', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'MainCtrl'
    })
    .state('services', {
      url: '/services',
      templateUrl: 'views/services-list.html',
      controller: 'MainCtrl'
    })
    .state('airtime-purchases', {
      url: '/airtime-purchases',
      templateUrl: 'views/airtime-purchase.html',
      controller: 'MainCtrl'
    })
    .state('transfers', {
      url: '/transfers',
      templateUrl: 'views/transfer.html',
      controller: 'MainCtrl'
    })
    .state('payments', {
      url: '/payments',
      templateUrl: 'views/payments.html',
      controller: 'MainCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/partials/register-modal.html',
      controller: 'AuthenticationCtrl'
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'views/partials/signin-modal.html',
      controller: 'AuthenticationCtrl'
    })
    .state('forgotPassword', {
      url: '/forgotPassword',
      templateUrl: 'views/forgotpassword.html',
      controller: 'AuthenticationCtrl'
    })
    .state('emailSuccess', {
      url: '/verify/email/success',
      templateUrl: 'views/email-success.html',
      controller: 'AuthenticationCtrl'
    })
    .state('invalidResetToken', {
      url: '/password/reset/invalidToken',
      templateUrl: 'views/invalid-reset-password.html',
      controller: 'AuthenticationCtrl'
    })
    .state('ResetPassword', {
      url: '/password/reset/:token',
      templateUrl: 'views/reset-password.html',
      controller: 'AuthenticationCtrl'
    })
    .state('invalidToken', {
      url: '/verify/email/invalid',
      templateUrl: 'views/invalid-email.html'
    })
    .state('auth', {
      url: '/auth/:id',
      templateUrl: 'views/register-success.html',
      controller: 'DashboardCtrl'
    })
    .state('userProfile', {
      url: '/user/:id/profile',
      templateUrl: 'views/user-profile.html',
      controller: 'DashboardCtrl'
    })
    .state('userDashboard', {
      url: '/user/:id/dashboard',
      templateUrl: 'views/developer-dashboard.html',
      controller: 'DashboardCtrl'
    })
    .state('createApp', {
      url: '/user/:id/dashboard/create-app',
      templateUrl: 'views/partials/addApp-modal.html',
      controller: 'DashboardCtrl'
    })
    .state('singleApp', {
      url: '/user/:id/dashboard/app/:appId',
      templateUrl: 'views/single-app.html',
      controller: 'DashboardCtrl'
    });

  // /user/{{user._id}}/dashboard/app/{{app._id}}
  // .state('userDashboard', {
  //     url: '/user/:id',
  //     templateUrl: 'views/developer-dashboard.html',
  //     controller: 'DashboardCtrl'
  // });
  $urlRouterProvider.otherwise('/');

}]);
