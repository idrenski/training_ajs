/**
 * Created by idrenski on 1/19/2016.
 */
(function() {
    'use strict';

    angular.module('app.directives', [])
        .directive('myHello', myHello);

    function myHello() {
        function TempController() {
            var vm = this;
            vm.greeting = {text: 'Template ...'};
            // use $location for something good here...

            console.log('TempController', vm);

        }
        return {
            restrict: 'EA',
            scope: {
                greeting: '='
            },
            templateUrl: 'view/template.html',
            controllerAs: "template",
            bindToController: true,
            controller: TempController
        };
    }

})();