controllerModule.controller('VideosController', ['$scope', '$state', '$log', '$ionicLoading', 'bricksKernel', 'youTubeService',

    function ($scope, $state, $log, $ionicLoading, bricksKernel, youTubeService) {

        $log.debug('VideosController');

        $scope.load = function() {

            var playlistId = bricksKernel.getProperty('bricks.custom.lc.youtube.playlist.id');

            // load page and update cache
            $ionicLoading.show({
                template: 'Loading...'
            });
            youTubeService.findByPlaylistId(playlistId).then(function (result) {
                $scope.videos = result;
                $log.debug('videos', $scope.videos);
            }, function (error) {
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