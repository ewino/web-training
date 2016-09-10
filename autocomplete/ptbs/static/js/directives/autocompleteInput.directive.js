(function() {
    'use strict';

    angular.module('example.autocomplete.directives')
        .directive('autoCompleteSearchInput', function() {
            return {
                restrict: 'A',
                require: '^autoCompleteSearchBox',
                template: '<input ng-model="state.query" type="search">',
                replace: true,
                link: function(scope, el, attrs, searchBox) {
                    el.keydown(function(e) {
                        scope.$apply(function() {
                            if (e.keyCode === 38) { // up
                                searchBox.moveUp();
                                e.preventDefault();
                            } else if (e.keyCode === 40) { // down
                                searchBox.moveDown();
                                e.preventDefault();
                            } else if (e.keyCode === 27) { // escape
                                searchBox.escape();
                            }
                        });
                    });
                    el.keypress(function(e) {
                        scope.$apply(function() {
                            if (e.keyCode === 13) { // enter
                                searchBox.select();
                                e.preventDefault();
                            }
                        });
                    });
                }
            };
        });
})();
