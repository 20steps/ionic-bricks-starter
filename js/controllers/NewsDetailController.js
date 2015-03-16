controllerModule.controller('NewsDetailController', ['$scope', '$state', '$log', '$ionicLoading', '$stateParams', 'bricksContentService',

    function ($scope, $state, $log, $ionicLoading, $stateParams, bricksContentService) {

        $log.debug('NewsDetailController');

        $scope.load = function() {
            // load page and update cache
            $ionicLoading.show({
                template: 'Loading...'
            });
            bricksContentService.findNodeByTypeAndSlug('post',$stateParams.slug).then(function(result) {
                $scope.news = result.node;
                $log.debug($scope.news);
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