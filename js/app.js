// Declare app level module which depends on filters, and services

(function () {
    'use strict';

    angular.module('app', [
            'app.controllers',
            'app.directives',
            'app.services',
            'ui.router'
        ])

        /* How UI-Router works
         * For more info https://scotch.io/tutorials/angular-routing-using-ui-router
         */
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('hello1', {
                    url: '/hello1',
                    templateUrl: 'view/hello1.html',
                    controller: 'Hello1Controller',
                    controllerAs: 'hello1'
                })

                .state('hello2', {
                    url: '/hello2',
                    templateUrl: 'view/hello2.html',
                    controller: 'Hello2Controller',
                    controllerAs: 'hello2'
                });
        })

        .config(function (globalDataProviderProvider) {

            console.log(globalDataProviderProvider);
            globalDataProviderProvider.setData(1);
        })

})();