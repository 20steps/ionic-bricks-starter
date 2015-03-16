controllerModule.controller('TriviaDetailController',
    ['$scope', '$state', '$log', '$ionicLoading', '$stateParams', 'triviaService', '$cordovaVibration', '$ionicPopup',

    function ($scope, $state, $log, $ionicLoading, $stateParams, triviaService, $cordovaVibration, $ionicPopup) {

        $log.debug('TriviaDetailController');

        $scope.answeredIndex = null;
        $scope.nextTrivia = null;

        $scope.load = function() {
            // load page and update cache
            $ionicLoading.show({
                template: 'Loading...'
            });
            $scope.answeredIndex = null;
            triviaService.findTriviaBySlug($stateParams.slug).then(function(result) {
                result.trivia.answers = _.map(result.trivia.answers,function(text,index) {
                    return {
                        index: index,
                        text: text
                    }
                });
                $scope.trivia=result;
                $log.debug($scope.trivia);
            }, function(error) {
                $log.error(error);
            }).finally(function() {
                // Stop the ion-refresher from spinning
                $log.debug('sending scroll.refreshComplete');
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
            });
        };

        $scope.answer = function(answeredIndex) {
            var correct=triviaService.answer($scope.trivia,answeredIndex);
            $scope.trivia.solved=correct;
            triviaService.findRandomUnsolvedTrivia($scope.trivia).then(function (randomUnsolvedTrivia) {
                // randomly select next trivia
                // todo: exclude current trivia
                $scope.nextTrivia=randomUnsolvedTrivia;
                if (correct) {
                    if ($scope.nextTrivia) {
                        // todo: save correctness in sqlite
                        var correctPopup = $ionicPopup.show({
                            title: 'Correct answer',
                            subTitle: 'Super',
                            template: 'Next Question: <strong>{{ nextTrivia.trivia.question }}</strong>',
                            scope: $scope,
                            buttons: [
                                {
                                    text: 'Next Question',
                                    type: 'button-positive',
                                    onTap: function(e) {
                                        $state.go('tab.trivia-detail',{slug:$scope.nextTrivia.slug});
                                        return;
                                    }
                                }
                            ]
                        });
                    } else {
                        var allSolvedPopup = $ionicPopup.show({
                            title: 'All trivia solved',
                            subTitle: 'Alles super',
                            buttons: [
                                {
                                    text: 'Close',
                                    type: 'button-positive',
                                    onTap: function(e) {
                                        return;
                                    }
                                }
                            ]
                        });
                    }

                } else {
                    if (window.cordova) {
                        // vibrate in case of error
                        $cordovaVibration.vibrate(1000);
                    }
                    if ($scope.nextTrivia) {
                        var wrongPopup = $ionicPopup.show({
                            title: 'Wrong answer',
                            subTitle: 'Depp',
                            template: 'Next Question: <strong>{{ nextTrivia.trivia.question }}</strong>',
                            scope: $scope,
                            buttons: [
                                {
                                    text: 'Retry',
                                    type: 'button-positive',
                                    onTap: function(e) {
                                        // do nothing to close popup and retry
                                        return;
                                    }
                                },
                                {
                                    text: 'Next Question',
                                    type: 'button-negative',
                                    onTap: function(e) {
                                        $state.go('tab.trivia-detail',{slug:$scope.nextTrivia.slug});
                                        return;
                                    }
                                }
                            ]
                        });
                    } else {
                        var lastWrongPopup = $ionicPopup.show({
                            title: 'Wrong answer',
                            subTitle: 'Almost there, only this trivia to solve',
                            buttons: [
                                {
                                    text: 'Retry',
                                    type: 'button-positive',
                                    onTap: function(e) {
                                        // do nothing to close popup and retry
                                        return;
                                    }
                                }
                            ]
                        });
                    }

                }
            });

        };

        $scope.load();

    }

]);