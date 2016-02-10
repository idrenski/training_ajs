/**
 * Created by idrenski on 1/27/2016.
 */
(function () {
    'use strict';

    angular.module('app.services', [])

        .service('globalDataService', globalDataService)
        .factory('modifyDataFactory', modifyDataFactory)
        .provider("globalDataProvider", globalDataProvider)
        .filter("translateDataFilter", translateDataFilter)
        .filter("translateLangFilter", translateLangFilter);

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