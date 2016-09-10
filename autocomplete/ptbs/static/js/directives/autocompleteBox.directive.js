(function() {
    'use strict';

    angular.module('example.autocomplete.directives')
        .directive('autoCompleteSearchBox', function($http, $timeout) {
            return {
                restrict: 'A',
                scope: {
                    maxAmount: '=?',
                    onAbort: '&?',
                    onEnter: '&',
                    onSelect: '&',
                    queryUrl: '@'
                },
                link: function(scope) {
                    function clearItems() {
                        scope.state.items.splice(0);
                        scope.state.selectedId = -1;
                    }

                    function isQueryValid() {
                        var query = scope.state.query;
                        return !!query && !!query.trim();
                    }

                    scope.clear = function() {
                        $timeout(function() {
                            scope.state.query = '';
                        }, 0);
                    };

                    scope.onAbort = scope.onAbort || scope.clear;

                    scope.$watch('state.query', function(query) {
                        if (!isQueryValid()) {
                            clearItems();
                            scope.state.status = 'closed';
                            return;
                        }
                        scope.state.status = 'loading';
                        $http.get(scope.queryUrl.replace('{}', query))
                            .success(function (data) {
                                clearItems();
                                if (!isQueryValid()) return;
                                _.forEach(_.orderBy(data.results, ['score', 'name'], ['desc', 'asc']), function(item) {
                                    if (!scope.maxAmount || scope.state.items.length < scope.maxAmount) {
                                        scope.state.items.push(item);
                                    }
                                });
                                scope.state.status = scope.state.items.length ? 'done' : 'closed';
                            })
                            .error(function (text, code) {
                                if (code === 500) {
                                    clearItems();
                                    scope.state.status = 'error';
                                }
                            });
                    });
                },
                controller: function($scope) {
                    if ($scope.maxAmount === undefined) {
                        $scope.maxAmount = null;
                    }

                    this.state = $scope.state = {
                        query: '',
                        status: '',
                        items: [],
                        selectedId: 0
                    };

                    function selectId(id) {
                        $scope.state.selectedId = id;
                    }

                    this.selectId = selectId;

                    this.moveUp = function() {
                        if ($scope.state.selectedId === -1) {
                            selectId($scope.state.items.length - 1);
                        } else {
                            selectId(Math.max(-1, $scope.state.selectedId - 1));
                        }
                    };

                    this.moveDown = function() {
                        if ($scope.state.selectedId >= $scope.state.items.length - 1) {
                            selectId(-1);
                        } else {
                            selectId($scope.state.selectedId + 1);
                        }
                    };

                    this.escape = function() {
                        $scope.onAbort();
                    };

                    this.select = function() {
                        if ($scope.state.selectedId === -1) {
                            try {
                                $scope.onEnter({query: $scope.state.query});
                            } catch (e) {}
                        } else {
                            var item = $scope.state.items[$scope.state.selectedId];
                            try {
                                $scope.onSelect({item: item});
                            } catch (e) {}
                        }
                        $scope.state.query = '';
                    };
                }
            };
        });
})();
