(function () {
    'use strict';

    var pluginName = 'vdb-bench.dataservice';
    var pluginDirName = 'vdb-bench-dataservice';
    var templatesDirName =  'templates';
    var exportDirName = 'export';
    var wizard = 'wizard';

    angular
        .module(pluginName)
        .controller('DSImportExportController', DSImportExportController);

    DSImportExportController.$inject = ['CONFIG', 'SYNTAX', 'RepoRestService', '$scope'];

    function DSImportExportController(config, syntax, RepoRestService, $scope) {
        var vm = this;

        vm.storageTypes = {};
        vm.storageType = {};
        vm.fileWizard = false;
        vm.gitWizard = false;

        vm.storageTypeSet = function() {
            if (angular.isUndefined(vm.storageType))
                vm.storageType = {};

            vm.fileWizard = vm.storageType.name === 'file' ? true : false;
            vm.gitWizard = vm.storageType.name === 'git' ? true : false;
        };

        $scope.$watch('vm.storageType', function(value) {
            vm.storageTypeSet();
        });

        function init() {
            try {
                 RepoRestService.availableStorageTypes().then(
                function (storageTypes) {
                    vm.storageTypes = storageTypes;
                },
                function (response) {
                    alert(response.data.error);
                });
            } finally {
            }
        }

        init();
    }

})();