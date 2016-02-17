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

            /* http://www.bennadel.com/blog/2807-using-rootscope-emit-as-a-performance-optimization-in-angularjs.htm
             *
             * Memorable explanation of Theory for $emit and $broadcast
             *
             * $rootScope.$emit only lets other $rootScope listeners catch it. This is good when you don't want every $scope to get it. Mostly a high level communication. Think of it as adults talking to each other in a room so the kids can't hear them.
             * $rootScope.$broadcast is a method that lets pretty much everything hear it. This would be the equivalent of parents yelling that dinner is ready so everyone in the house hears it.
             * $scope.$emit is when you want that $scope and all its parents and $rootScope to hear the event. This is a child whining to their parents at home (but not at a grocery store where other kids can hear).
             * $scope.$broadcast is for the $scope itself and its children. This is a child whispering to its stuffed animals so their parents can't hear.
             */

            /* Register a listener for an event named CurrentService
             * This directive here receive a new value via parameter serviceNo
             */
            $scope.$on('CurrentService',
                function (event, serviceNo) {
                    vm.greeting = {text: 'got $rootScope.$broadcast on subscriber TempController from publisher CurrentService ... and service #' + serviceNo};

                    console.log('got $rootScope.$broadcast on subscriber TempController from publisher CurrentService', serviceNo);
                });

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
                greeting: '=?'
            },
            templateUrl: 'view/template.html',
            controllerAs: "template",
            bindToController: true,
            controller: TempController,
            link: link
        };

    }

    function myCurrent() {

        ServiceController.$inject = ["$scope", "$rootScope", "globalDataService"];

        function ServiceController($scope, $rootScope, globalDataService) {
            var vm = this;
            vm.globalDataService = globalDataService;
            vm.theMonitoringValue = vm.globalDataService.getData();

            $scope.$watch(
                function () {
                    return vm.globalDataService.getData();
                },
                function (newValue, oldValue) {
                    vm.theMonitoringValue = vm.globalDataService.getData();

                    /* Broadcast a message (that event named CurrentService happened) through $rootScope.$broadcast
                     * One directive notifies other directive that the value of vm.theMonitoringValue is changed
                     */
                    $rootScope.$broadcast('CurrentService', vm.theMonitoringValue);

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
                greeting: '=?'
            },
            templateUrl: 'view/current.html',
            controllerAs: "current",
            bindToController: true,
            controller: ServiceController
        };

    }

})();