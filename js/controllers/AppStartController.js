controllerModule.controller('AppStartController', ['$scope', '$state', '$log', 'bricksTrackingService',
    function ($scope, $state, $log, bricksTrackingService) {

        $log.debug('AppStartController');

        if (bricksTrackingService.getAppStartCount() == 1) {
            $log.debug('First app start');
        } else {
            $log.debug('Second or more app start');

        }

        $state.go('/tab/dash');

    }]);