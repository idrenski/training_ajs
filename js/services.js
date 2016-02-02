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
            // console.log('getData');
            return vm.no;
        };

        vm.setData = function (newNo) {
            // console.log('setData');
            vm.no = newNo;
        };

    }

    function modifyDataFactory() {
        var sResult = {};

        /* Internally accessible only*/
        function invertCamel(inStr) {
            return inStr.replace(/([a-zA-Z]+)/g, function (str) {
                console.log(str);
                return str.toUpperCase();
            });
        }

        /* The function can be accessed via the Factory in the scope outside */

        sResult.lowCapCapLow = function (inStr) {
            return invertCamel(inStr);
        };

        sResult.maskDigit = function (inStr) {
            return inStr.replace(new RegExp('[0-9]', 'g'), '*');
        };

        return sResult;
    }

    /* Will be inherited by all String types*/

    /*    String.prototype.replaceAt = function (index, character) {
     return this.substr(0, index) + character + this.substr(index + character.length);
     };*/


})();