servicesModule

.factory('youTubeServiceHelper', ['$log', '$q', '$window', 'bricksKernel', function($log, $q, $window, bricksKernel) {

    function searchList(options) {
        $log.debug('searchList',options);

        var deferred = $q.defer();

        $window.gapi.client.load('youtube', 'v3', function() {

            request = $window.gapi.client.youtube.search.list(options);

            $log.debug(request);

            request.execute(function(response) {
                $log.debug(response);
                deferred.resolve(response);
            },function(error) {
                deferred.reject(error);
            });

        });

        return deferred.promise;
    }

    function playlistItems(options) {
        $log.debug('playListItems',options);

        var deferred = $q.defer();

        $window.gapi.client.load('youtube', 'v3', function() {

            request = $window.gapi.client.youtube.playlistItems.list(options);

            $log.debug(request);

            request.execute(function(response) {
                $log.debug(response);
                deferred.resolve(response);
            },function(error) {
                deferred.reject(error);
            });

        });

        return deferred.promise;
    }

    function videosList(options) {

        $log.debug('videosList',options);

        var deferred = $q.defer();

        $window.gapi.client.load('youtube', 'v3', function() {

            request = $window.gapi.client.youtube.videos.list(options);

            $log.debug(request);

            request.execute(function(response) {
                $log.debug(response);
                deferred.resolve(response);
            },function(error) {
                deferred.reject(error);
            });

        });

        return deferred.promise;
    }


    return {
        searchList: searchList,
        videosList: videosList,
        playlistItems: playlistItems
    };

}]);
