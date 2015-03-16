controllerModule.controller('NewsController', ['$scope', '$state', '$log', '$ionicLoading', 'bricksContentService',

    function ($scope, $state, $log, $ionicLoading, bricksContentService) {

        $log.debug('NewsController');

        $scope.load = function() {
            $log.debug('Loading posts');
            // load page and update cache
            $ionicLoading.show({
                template: 'Loading...'
            });
            bricksContentService.findNodesByType('post',true).then(function(result) {
                $scope.nodes = result.nodes;
                $log.debug($scope.nodes);
            }, function(error) {
                $log.error(error);
            }).finally(function() {
                // Stop the ion-refresher from spinning
                $log.debug('sending scroll.refreshComplete');
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
            });
        };

        $scope.load();

    }

]);