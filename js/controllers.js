/**
 * Created by idrenski on 1/19/2016.
 */
(function () {
    'use strict';

    angular.module('app.controllers', [])
        .controller('Hello1Controller', Hello1Controller)
        .controller('Hello2Controller', Hello2Controller);

    Hello1Controller.$inject = ['globalDataService'];
    Hello2Controller.$inject = ['globalDataService'];

    function Hello1Controller(globalDataService) {
        var vm = this;

        /*
        * vm.globalDataService = globalDataService;
        *
        * It makes the service accessible in the scope of the controller
        * See how can be called in hello1.html
        * */
        vm.globalDataService = globalDataService;

        /*
        * For data manipulation purposes only it can be called just as serviceName.method
        * */
        globalDataService.setData(1);

        vm.greeting = {text: 'Hello ' + ' ...' + globalDataService.getData()};
        // use $location for something good here...

        console.log('Hello1Controller', vm);

    }

    function Hello2Controller(globalDataService) {
        var vm = this;
        vm.globalDataService = globalDataService;
        globalDataService.setData(2);

        vm.greeting = {text: 'Hello ' + ' ...' + globalDataService.getData()};
        // use $location for something good here...

        console.log('Hello2Controller', vm);

    }


})();

