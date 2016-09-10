(function() {
    'use strict';

    angular.module('example.autocomplete.directives')
        .directive('autoCompleteDropdown', function() {
            return {
                restrict: 'A',
                require: '^autoCompleteSearchBox',
                transclude: true,
                template: '<div>' +
                    '<div class="error" ng-show="state.status == \'error\'"></div>' +
                    '<ul ng-hide="state.items.length == 0 && (!freetextStr || !state.query)">' +
                        '<li ng-class="{selected: $index==state.selectedId}" ng-mouseover="select($index)" ' +
                            'auto-complete-item ng-repeat="item in state.items" data-item="item"></li>' +
                        '<li ng-if="freetextStr && state.query" class="freetext-option" ' +
                            'ng-class="{selected: state.selectedId == -1}" ng-bind="freetextStr" ' +
                            'ng-mouseover="select(-1)" ng-click="enter()"></li>' +
                    '</ul>' +
                '</div>',
                replace: true,
                link: function(scope, el, attrs, searchBox) {
                    scope.state = searchBox.state;
                    scope.select = searchBox.selectId;
                    scope.enter = function() { searchBox.select(); };
                    el.find('.error').html(attrs.errorText);
                    var freetextText = attrs.freetextOption;
    
                    scope.$watch('state.query', function(query) {
                        if (freetextText) {
                            scope.freetextStr = freetextText.replace('%(name)s', query);
                        }
                    });
    
                    scope.$watch('state.status', function(status) {
                        el.toggleClass('ng-hide', (!freetextText && !scope.state.query) &&
                            (status === 'closed' || (status === 'loading' && searchBox.state.items.length === 0)));
                    });
                }
            };
        })
    
        .directive('autoCompleteItem', function() {
            return {
                restrict: 'A',
                require: '^autoCompleteSearchBox',
                link: function(scope, el, attrs, searchBox, $transclude) {
                    el.on('click', function(e) {
                        scope.$apply(function() {
                            searchBox.select();
                            e.preventDefault();
                        });
                    });
    
                    // create a new scope that inherits from the parent of the
                    // search box directive ($parent.$parent.$parent)
                    var newScope = scope.$parent.$parent.$new();
                    // put result from isolate to be available to transcluded content
                    newScope.item = scope.$eval(attrs.item);
                    $transclude(newScope, function (transcludedEl) {
                        el.append(transcludedEl);
                    });
                }
            };
        });
})();
