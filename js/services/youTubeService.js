servicesModule

.factory('youTubeService', ['$log', '$q', '$window', '$interval', 'bricksKernel', 'youTubeServiceHelper', function($log, $q, $window, $interval, bricksKernel, youTubeServiceHelper) {

    $window.gapiInitialized = false;
    $window.gapiInterval = null;

    // will be called by app.js after googleApi called callback as specified in index.html ...
    function init() {
        var apiKey=bricksKernel.getProperty('bricks.custom.lc.youtube.api.key');
        $log.debug('initGapi',apiKey);
        $window.gapi.client.setApiKey(apiKey);
        $window.gapi.auth.init(function() {
            $window.gapiInitialized=true;
        });
    }

    function findByChannelId(channelId) {

        // as we cannot be sure that gapi is already initialized, we have to wait for it ...

        $log.debug('findByChannelId');

        var deferred = $q.defer();

        var options = {
            part: 'snippet',
            channelId: channelId,
            order: 'date',
            type: 'video'
        }

        if ($window.gapiInitialized) {
            youTubeServiceHelper.searchList(options).then(function(result) {
                deferred.resolve(result.items);
            }, function(error) {
                $log.error('error in youTubeServiceHelper.searchList',error);
            });
        } else {
            $window.gapiInterval=$interval(function() {
                if ($window.gapiInitialized) {
                    $interval.cancel($window.gapiInterval);
                    youTubeServiceHelper.searchList(options).then(function(result) {
                        deferred.resolve(result.items);
                    }, function(error) { 
                        $log.error('error in youTubeServiceHelper.searchList',error);
                    });
                } else {
                    $log.debug('gapi not initialized again');
                }
            },500)
        }

        return deferred.promise;

    }

    function findByPlaylistId(playlistId) {

        // as we cannot be sure that gapi is already initialized, we have to wait for it ...

        $log.debug('findByPlaylistId');

        var deferred = $q.defer();

        var options = {
            part: 'snippet',
            playlistId: playlistId
        }

        if ($window.gapiInitialized) {
            youTubeServiceHelper.playlistItems(options).then(function(result) {
                deferred.resolve(result.items);
            }, function(error) {
                $log.error('error in youTubeServiceHelper.playlistItems',error);
                deferred.reject(error);
            });
        } else {
            $window.gapiInterval=$interval(function() {
                if ($window.gapiInitialized) {
                    $interval.cancel($window.gapiInterval);
                    youTubeServiceHelper.playlistItems(options).then(function(result) {
                        deferred.resolve(result.items);
                    }, function(error) {
                        $log.error('error in youTubeServiceHelper.playlistItems',error);
                        deferred.reject(error);
                    });
                } else {
                    $log.debug('gapi not initialized again');
                }
            },500)
        }

        return deferred.promise;

    }

    function findOneByVideoId(id) {

        // as we cannot be sure that gapi is already initialized, we have to wait for it ...

        $log.debug('findOneByVideoId',id);

        var deferred = $q.defer();

        var options = {
            part: 'snippet',
            id: id
        }

        if ($window.gapiInitialized) {
            youTubeServiceHelper.videosList(options).then(function(result) {
                deferred.resolve(result.items[0]);
            }, function(error) {
                $log.error('error in youTubeServiceHelper.videosList',error);
                deferred.reject(error);
            });
        } else {
            $window.gapiInterval=$interval(function() {
                if ($window.gapiInitialized) {
                    $interval.cancel($window.gapiInterval);
                    youTubeServiceHelper.videosList(options).then(function(result) {
                        deferred.resolve(result.items[0]);
                    }, function(error) {
                        $log.error('error in youTubeServiceHelper.videosList',error);
                        deferred.reject(error);
                    });
                } else {
                    $log.debug('gapi not initialized again');
                }
            },500)
        }

        return deferred.promise;

    }

    return {
        init: init,
        findByChannelId: findByChannelId,
        findByPlaylistId: findByPlaylistId,
        findOneByVideoId: findOneByVideoId
    };

}]);
