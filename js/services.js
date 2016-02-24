/**
 * Created by idrenski on 1/27/2016.
 */
(function () {
    'use strict';

    angular.module('app.services', [])

        .service('globalDataService', globalDataService)
        .factory('modifyDataFactory', modifyDataFactory)
        .factory('apiFactory', apiFactory)
        .provider("globalDataProvider", globalDataProvider)
        .filter("translateDataFilter", translateDataFilter)
        .filter("translateLangFilter", translateLangFilter);

    apiFactory.$inject = ['$http', '$resource'];

    function globalDataService() {
        var vm = this;
        vm.no = 0;

        vm.getData = function () {
            return vm.no;
        };

        vm.setData = function (newNo) {
            vm.no = newNo;
        };
    }

    function apiFactory($http, $resource) {
        var sResult = {};

        /* The site api.openweathermap.org provides free API
         *
         * This API can be called 1 time per 10 minutes from one device/one API key (APPID). Normally the weather is not changing so frequently.
         * The APPID for account i.drenski@gmail.com is APPID = d11713326126ee20e35950eff36698d7
         *
         * Example for parameters: city = 'Sofia', country = 'bg'
         */

        sResult.getWeather = function (city, country) {

            return $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&APPID=d11713326126ee20e35950eff36698d7');
        };

        sResult.getWeatherResource = function (city, country) {

            return $resource('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&APPID=d11713326126ee20e35950eff36698d7');
        };

        return sResult;
    }

    function modifyDataFactory() {
        var sResult = {};

        sResult.maskDigit = function (inStr) {
            return inStr.replace(new RegExp('[0-9]', 'g'), '*');
        };

        return sResult;
    }

    function globalDataProvider() {
        var no = -1;

        return {
            setData: setData,
            $get: getData
        };

        function getData() {
            return {data: no};
        }

        function setData(newNo) {
            no = newNo;
        }
    }

    function translateDataFilter() {
        return function (input) {
            var out = input || '';
            out = out.replace(/world|universe|cosmos|land/gi, "Country");

            return out;
        }
    }

    function translateLangFilter() {
        return function (input, land) {
            var out = land + ' ' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

            return out;
        }
    }

})();