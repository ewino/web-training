
angular.module('example.autocomplete', [])

    .controller('AutoCompleteCtrl', function() {
        var vm = this;
        
        vm.color = _.sample(['Red', 'Blue', 'Green', 'Yellow', 'Black',
            'Orange', 'Gold', 'Aquamarine', 'Purple', 'Plum']);
    });
