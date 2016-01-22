/**
 * Created by idrenski on 1/19/2016.
 */
(function () {
    'use strict';

    angular.module('app.controllers', [])
        .controller('Hello1Controller', Hello1Controller)
        .controller('Hello2Controller', Hello2Controller);


    function Hello1Controller() {
        var vm = this;
        vm.greeting = {text: 'Hello 1 ...'};
        // use $location for something good here...

        console.log('Hello1Controller', vm);

    }

    function Hello2Controller() {
        var vm = this;
        vm.greeting = {text: 'Hello 2 ...'};
        // use $location for something good here...

        console.log('Hello2Controller', vm);

    }



})();

