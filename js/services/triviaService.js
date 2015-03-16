servicesModule

.factory('triviaService',
        ['$log', '$q', '$window', '$interval', 'localStorageService', 'bricksKernel', 'bricksContentService',
        function($log, $q, $window, $interval, localStorageService, bricksKernel, bricksContentService) {

    function findAllTrivia() {
        var deferred=$q.defer();
        bricksContentService.findNodesByType('trivia', true).then(function (result) {
            result.nodes = _.map(result.nodes,function(node) {
                node.solved=isTriviaSolved(node.slug);
                return node;
            });
            deferred.resolve(result.nodes);
        }, function(error) {
            $log.error('error in youTubeServiceHelper.playlistItems',error);
            deferred.reject(error);
        });
        return deferred.promise;
    }

    function findRandomUnsolvedTrivia(excludeTrivia) {
        var deferred=$q.defer();
        findAllTrivia().then(function(allTrivias) {
            var unsolvedTrivia= _.filter(allTrivias,function(trivia) {
                return (!trivia.solved && trivia.slug!=excludeTrivia.slug);
            });
            if (unsolvedTrivia.length>0) {
                deferred.resolve(_.sample(unsolvedTrivia));
            } else {
                deferred.resolve(null);
            }
        },function(error) {
            $log.error('error in findRamdomUnsolvedTrivia',error);
            deferred.reject(error);
        })
        return deferred.promise;
    }

    function findTriviaBySlug(slug) {
        var deferred=$q.defer();
        bricksContentService.findNodeByTypeAndSlug('trivia',slug).then(function(result) {
            result.node.solved=isTriviaSolved(result.node.slug);
            deferred.resolve(result.node);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    function answer(trivia,answeredIndex) {
        $log.debug('answer',trivia.trivia.correctAnswer,answeredIndex);
        if (trivia.trivia.correctAnswer==answeredIndex) {
            $log.debug('correct answer');
            localStorageService.set('trivia_solved_'+trivia.slug,{
                answeredIndex: answeredIndex,
                updatedAt: new Date().getTime()
            });
            return true;
        } else {
            $log.debug('wrong answer');
            localStorageService.remove('trivia_solved_'+trivia.slug);
            return false;
        }
    }

    function isTriviaSolved(slug) {
        return (localStorageService.get('trivia_solved_'+slug)!=null);
    }

    function clearAllTriviaSolved() {
        // TODO: use regex (does not work, don't know why)
        return localStorageService.clearAll();
    }


    return {
        findAllTrivia: findAllTrivia,
        findRandomUnsolvedTrivia: findRandomUnsolvedTrivia,
        findTriviaBySlug: findTriviaBySlug,
        answer: answer,
        clearAllTriviaSolved: clearAllTriviaSolved
    };

}]);
