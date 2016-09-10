
angular.module('example.autocomplete', ['example.autocomplete.directives'])

    .controller('AutoCompleteCtrl', function() {
        var vm = this;
        
        vm.colorName = _.sample(['red', 'blue', 'green', 'yellow', 'black',
            'orange', 'gold', 'aquamarine', 'purple', 'plum']);
        vm.colorHex = vm.colorName.toLowerCase();

        vm.changeColor = function(colorName, colorHex) {
            vm.colorName = colorName;
            vm.colorHex = colorHex;
        };
    });
