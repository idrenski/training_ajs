/**
 * Created by idrenski on 1/27/2016.
 */
(function () {
    'use strict';

    angular.module('app.services', [])

        .service('globalDataService', globalDataService);

    function globalDataService() {
        var vm = this;
        vm.no = 0;

        vm.getData = function () {
            // console.log('getData');
            return vm.no;
        };

        vm.setData = function (newNo) {
            // console.log('setData');
            vm.no = newNo;
        };

    }

})();