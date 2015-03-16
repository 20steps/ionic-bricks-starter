controllerModule.controller('SchoolsDetailController', ['$scope', '$state', '$log', '$ionicLoading', '$stateParams', 'bricksKernel', 'bricksContentService',

    function ($scope, $state, $log, $ionicLoading, $stateParams, bricksKernel, bricksContentService) {

        $log.debug('SchoolsDetailController');

        $scope.load = function() {
            // load page and update cache
            $ionicLoading.show({
                template: 'Loading...'
            });
            var defaultProjectCode=bricksKernel.getProperty('bricks.project.code');
            bricksKernel.setProperty('bricks.project.code', bricksKernel.getProperty('bricks.custom.lc.schools.project.code'));
            bricksContentService.findNodeByTypeAndSlug('language_school',$stateParams.slug).then(function(result) {
                $scope.school = result.node;
                $log.debug($scope.school);
            }, function(error) {
                $log.error(error);
            }).finally(function() {
                bricksKernel.setProperty('bricks.project.code',defaultProjectCode);
                // Stop the ion-refresher from spinning
                $log.debug('sending scroll.refreshComplete');
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
            });
        };

        $scope.load();

    }

]);