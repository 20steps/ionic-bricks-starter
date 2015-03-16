controllerModule.controller('VideosDetailController', ['$scope', '$state', '$log', '$ionicLoading', '$stateParams', 'youTubeService',

    function ($scope, $state, $log, $ionicLoading, $stateParams, youTubeService) {

        $log.debug('VideosDetailController');

        $scope.load = function() {
            $scope.youTubePlayerVars = {
                modestbranding: 1,
                controls: 0,
                autohide: 1,
                showinfo: 0,
                autoplay: 0,
                allowfullscreen: 1,
                fs: 1
            }

            // load page and update cache
            $ionicLoading.show({
                template: 'Loading...'
            });
            youTubeService.findOneByVideoId($stateParams.id).then(function (result) {
                $scope.video = result;
                $log.debug('video', $scope.video);
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