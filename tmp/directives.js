/**
 * Created by idrenski on 1/19/2016.
 */
(function() {
    'use strict';

    angular.module('app', [])

        .directive('app.directives', HelloDirective)

    function HelloDirective() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                greeting: '='
            }
        };
    }

})();