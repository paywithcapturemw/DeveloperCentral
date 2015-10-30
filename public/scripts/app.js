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
  'angular-jwt',
  // 'underscore'
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
    // /#/transfers-APIdocumentation
    .state('airtimePurchasesDocumentation', {
      url: '/airtime-purchases-APIdocumentation',
      templateUrl: 'views/airtime-purchase-documentation.html',
      controller: 'MainCtrl'
    })
    .state('transfersDocumentation', {
      url: '/transfers-APIdocumentation',
      templateUrl: 'views/transfers-documentation.html',
      controller: 'MainCtrl'
    })
    .state('paymentsDocumentation', {
      url: '/payments-APIdocumentation',
      templateUrl: 'views/payments-documentation.html',
      controller: 'MainCtrl'
    })
      .state('documentation', {
      url: '/APIdocumentation',
      templateUrl: 'views/documentation.html',
      controller: 'MainCtrl'
    })
    // 
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
    .state('userProfileEdit', {
      url: '/user/:id/profile/edit',
      templateUrl: 'views/user-profile-edit.html',
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
    }).state('editApp', {
      url: '/user/:id/dashboard/app/:appId/edit',
      templateUrl: 'views/edit-app.html',
      controller: 'DashboardCtrl'
    })
    .state('verifyAdmin', {
      url: '/admin-user/verifyAdmin',
      templateUrl: 'views/admin/verifyAdmin.html',
      controller: 'AdminCtrl'
    })
    .state('changeFirstPassword', {
      url: '/admin-user/:id/changeFirstPassword',
      templateUrl: 'views/admin/changeFirstPassword.html',
      controller: 'AdminCtrl'
    })
    .state('adminDashboard', {
      url: '/admin-user/:id/dashboard',
      templateUrl: 'views/admin/adminDashboard.html',
      controller: 'AdminCtrl'
    })
    .state('adminUserProfile', {
      url: '/admin-user/:id/profile',
      templateUrl: 'views/admin/admin-user-profile.html',
      controller: 'DashboardCtrl'
    })
    .state('adminUserProfileEdit', {
      url: '/admin-user/:id/profile/edit',
      templateUrl: 'views/admin/admin-user-profile-Edit.html',
      controller: 'DashboardCtrl'
    });

  $urlRouterProvider.otherwise('/');

}]);
