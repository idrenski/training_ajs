/**
 * Created by idrenski on 1/27/2016.
 */
(function () {
    'use strict';

    angular.module('app.services', [])

        .service('globalDataService', globalDataService)
        .factory('modifyDataFactory', modifyDataFactory);

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

})();