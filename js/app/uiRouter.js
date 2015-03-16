window.app_ui_router = {

    init: function ($stateProvider, $urlRouterProvider) {

        // define states
        $stateProvider

            // abstract state for tab

            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // go there first (cp. otherwise)

            .state('tab.start', {
                url: "/start",
                cache: false,
                views: {
                    'tab-start': {
                        controller: "AppStartController"
                    }
                }
            })

            // Each tab has its own nav history stack:

            // News list and detail page

            .state('tab.news', {
                url: '/news',
                cache: false,
                views: {
                    'tab-news': {
                        templateUrl: 'templates/tab-news.html',
                        controller: 'NewsController'
                    }
                }
            })

            .state('tab.news-detail', {
                url: '/news/:slug',
                cache: false,
                views: {
                    'tab-news': {
                        templateUrl: 'templates/tab-news-detail.html',
                        controller: 'NewsDetailController'
                    }
                }
            })

            // Schools list and detail page

            .state('tab.schools', {
                url: '/schools',
                cache: true,
                views: {
                    'tab-schools': {
                        templateUrl: 'templates/tab-schools.html',
                        controller: 'SchoolsController'
                    }
                }
            })

            .state('tab.schools-detail', {
                url: '/schools/:slug',
                cache: false,
                views: {
                    'tab-schools': {
                        templateUrl: 'templates/tab-schools-detail.html',
                        controller: 'SchoolsDetailController'
                    }
                }
            })

            // Videos list and detail page

            .state('tab.videos', {
                url: '/videos',
                cache: false,
                views: {
                    'tab-videos': {
                        templateUrl: 'templates/tab-videos.html',
                        controller: 'VideosController'
                    }
                }
            })

            .state('tab.videos-detail', {
                url: '/videos/:id',
                cache: false,
                views: {
                    'tab-videos': {
                        templateUrl: 'templates/tab-videos-detail.html',
                        controller: 'VideosDetailController'
                    }
                }
            })

            // Trivia list and detail page

            .state('tab.trivia', {
                url: '/trivia',
                cache: false,
                views: {
                    'tab-trivia': {
                        templateUrl: 'templates/tab-trivia.html',
                        controller: 'TriviaController'
                    }
                }
            })

            .state('tab.trivia-detail', {
                url: '/trivia/:slug',
                cache: false,
                views: {
                    'tab-trivia': {
                        templateUrl: 'templates/tab-trivia-detail.html',
                        controller: 'TriviaDetailController'
                    }
                }
            })


        ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/start');

    }
};
