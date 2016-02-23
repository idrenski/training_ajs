/**
 * Created by idrenski on 1/19/2016.
 */
(function () {
    'use strict';

    angular.module('app.controllers', [])
        .controller('Hello1Controller', Hello1Controller)
        .controller('Hello2Controller', Hello2Controller)
        .controller('WeatherController', WeatherController);

    Hello1Controller.$inject = ['globalDataService'];
    Hello2Controller.$inject = ['globalDataService'];
    WeatherController.$inject = ['$scope', 'apiFactory'];

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
        vm.globalDataService.setData(1);

        vm.greeting = {text: 'Hello ' + ' ...' + vm.globalDataService.getData()};
        // use $location for something good here...

        console.log('Hello1Controller', vm);

    }

    function Hello2Controller(globalDataService) {
        var vm = this;
        vm.globalDataService = globalDataService;
        vm.globalDataService.setData(2);

        vm.greeting = {text: 'Hello ' + ' ...' + vm.globalDataService.getData()};
        // use $location for something good here...

        console.log('Hello2Controller', vm);

    }

    function WeatherController($scope, apiFactory) {
        var vm = this;
        // define a promise called weather
        var weather = apiFactory.getWeather('Sofia', 'bg');

        weather.then(
            function (payload) {
                // payload properties: data, status, headers, config
                vm.weatherData = payload.data;

                // added to the $scope for debug purposes only
                $scope.weatherData = payload.data;
            },
            function (errorPayload) {
                console.log('failure loading weather', errorPayload);
            });

        console.log('WeatherController', vm.weatherData, $scope);
    }


})();

