// Declare app level module which depends on filters, and services

(function () {
    'use strict';

    angular.module('app', [
            'app.controllers',
            'app.directives',
            'ngRoute'
        ])

        .config(function ($routeProvider, $locationProvider) {

            $routeProvider
                .when('/hello1', {
                    templateUrl: 'view/hello1.html',
                    controller: 'Hello1Controller',
                    controllerAs: 'hello1'
                })
                .when('/hello2', {
                    templateUrl: 'view/hello2.html',
                    controller: 'Hello2Controller',
                    controllerAs: 'hello2'
                })
                .when('/template', {
                    templateUrl: 'view/template.html',
                    controller: 'TempController',
                    controllerAs: 'template'
                })
                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true);
        });
})();