/**
 * Created by idrenski on 1/19/2016.
 */
(function () {
    'use strict';

    angular.module('app.directives', ['app.services'])
        .directive('myHello', myHello)
        .directive('myCurrent', myCurrent);


    function myHello() {

        TempController.$inject = ["$scope", "modifyDataFactory", "globalDataProvider", "translateDataFilterFilter"];

        function TempController($scope, modifyDataFactory, globalDataProvider, translateDataFilter) {
            var vm = this;

            console.log('globalDataProvider.data: ', globalDataProvider.data);
            vm.modifyDataFactory = modifyDataFactory;
            vm.greeting = {text: 'Template ...' + globalDataProvider.data};

            $scope.$watch(
                "template.greeting",
                function (newValue, oldValue) {
                    vm.greeting = {text: vm.modifyDataFactory.maskDigit(translateDataFilter(newValue.text))};

                    console.log('newValue, oldValue', newValue, oldValue);
                },
                true
            );

            console.log('TempController', vm);
        }

        /* The longer short answer: Ask yourself “when do I want my code to run?”
         * Before compilation – Controller
         * After compilation – Link
         *
         * As result the link overwrite the initial value set in Controller
         * Disable the link to see the initial value set in Controller
         */
        function link(scope, element, attr, controller) {

            controller.greeting = {text: 'Third ...'};

            console.log('link to', scope);
        }

        return {
            restrict: 'EA',
            scope: {
                greeting: '='
            },
            templateUrl: 'view/template.html',
            controllerAs: "template",
            bindToController: true,
            controller: TempController,
            link: link
        };

    }

    function myCurrent() {

        ServiceController.$inject = ["$scope", "globalDataService"];

        function ServiceController($scope, globalDataService) {
            var vm = this;
            vm.globalDataService = globalDataService;
            vm.theMonitoringValue = vm.globalDataService.getData();

            $scope.$watch(
                function () {
                    return vm.globalDataService.getData();
                },
                function (newValue, oldValue) {
                    vm.theMonitoringValue = vm.globalDataService.getData();

                    vm.greeting = {text: 'current service #' + ' ...' + vm.theMonitoringValue};

                    console.log('newValue, oldValue', newValue, oldValue);
                },
                true
            );

            console.log('ServiceController', vm);
        }


        return {
            restrict: 'EA',
            scope: {
                greeting: '='
            },
            templateUrl: 'view/current.html',
            controllerAs: "current",
            bindToController: true,
            controller: ServiceController
        };

    }

})();