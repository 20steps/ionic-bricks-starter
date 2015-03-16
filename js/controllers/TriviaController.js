controllerModule.controller('TriviaController', ['$scope', '$state', '$log', '$ionicLoading', 'triviaService',

    function ($scope, $state, $log, $ionicLoading, triviaService) {

        $log.debug('TriviaController');

        $scope.load = function() {
            // load page and update cache
            $ionicLoading.show({
                template: 'Loading...'
            });
            triviaService.findAllTrivia().then(function (result) {
                $scope.nodes = result;
                $log.debug($scope.nodes);
            }, function (error) {
                $log.error(error);
            }).finally(function() {
                // Stop the ion-refresher from spinning
                $log.debug('sending scroll.refreshComplete');
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
            });
        };

        $scope.clearAllTriviaSolved = function() {
            triviaService.clearAllTriviaSolved();
            $scope.load();
        }

        $scope.load();

    }

]);