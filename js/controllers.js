/**
 * Created by idrenski on 1/19/2016.
 */
(function () {
    'use strict';

    angular.module('app', [])
        .controller('app.controllers', HelloController);

    HelloController.$inject = ['$scope'];

    function HelloController($scope) {
        var vm = this;
        vm.greeting = {text: 'Hello ...'};
        // use $location for something good here...

        console.log('HelloController', $scope);

    }

})();

