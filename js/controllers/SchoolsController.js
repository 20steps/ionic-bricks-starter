controllerModule.controller('SchoolsController', ['$scope', '$state', '$log', '$timeout','$ionicLoading', '$ionicScrollDelegate', 'bricksKernel', 'bricksSearchService',

    function ($scope, $state, $log, $timeout, $ionicLoading, $ionicScrollDelegate, bricksKernel, bricksSearchService) {

        $log.debug('SchoolsController');

        $scope.search = {
            query: '',
            pageIndex: 0,
            canInfiniteScroll: false,
            loading: true,
        }

        $scope.showDestinations = function() {
            $scope.search.query='';
            $scope.pageIndex=0;
            $scope.load();
        }

        $scope.load = function() {
            // load page and update cache
            $ionicLoading.show({
                template: 'Loading...'
            });
            var searchOptions = {};


            if ($scope.search.query=='') {
                searchOptions = {
                    foundlets: [
                        {
                            brickAlias: 'lc_lcwebsite',
                            alias: 'poi'
                        }
                    ],
                    query: $scope.search.query,
                    limit: 999,
                    groupBy: 'city_group',
                    groupLimit: 999,
                    locale: bricksKernel.getLocale(),
                    pageIndex: $scope.search.pageIndex,
                    sort: null,
                    filterQueries: null
                };
            } else {
                searchOptions = {
                    foundlets: [
                        {
                            brickAlias: 'lc_lcwebsite',
                            alias: 'poi'
                        }
                    ],
                    query: $scope.search.query,
                    limit: 999,
                    groupBy: null,
                    groupLimit: 999,
                    locale: bricksKernel.getLocale(),
                    pageIndex: $scope.search.pageIndex,
                    sort: null,
                    filterQueries: null
                };
            }

            $log.debug('searchOptions',searchOptions);
            var defaultProjectCode=bricksKernel.getProperty('bricks.project.code');
            bricksKernel.setProperty('bricks.project.code', bricksKernel.getProperty('bricks.custom.lc.schools.project.code'));
            $scope.search.canInfiniteScroll=false;
            //$scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.search.loading=true;
            bricksSearchService.search(searchOptions).then(function (result) {
                if ($scope.search.query=='') {
                    result.groupings.city_group.groups= _.map(result.groupings.city_group.groups,function(city,name) {
                        city.name=name;
                        return city;
                    });
                    result.groupings.city_group.groups= _.shuffle(result.groupings.city_group.groups);
                }
                $scope.found = result;
                $log.debug($scope.found);
            }, function (error) {
                $log.error(error);
            }).finally(function() {
                $scope.search.loading=false;
                $ionicLoading.hide();
                bricksKernel.setProperty('bricks.project.code',defaultProjectCode);
                // Stop the ion-refresher from spinning
                $log.debug('sending scroll.refreshComplete');
                $scope.$broadcast('scroll.refreshComplete');
                /*$timeout(function () {
                    $ionicScrollDelegate.$getByHandle('myScrollDelegateHandle').scrollBy(0, 0);
                    $log.debug('setting canInfiniteScroll to true');
                    $scope.search.canInfiniteScroll = true;
                }, 500);*/
            });
        };

        $scope.queryChanged = function() {
            $log.debug('Query changed',$scope.search.query);
            $scope.search.pageIndex = 0;
            $scope.found = null;
        }
        $scope.moreToLoad = function() {
            return false;
            $log.debug('more to load');
            if ($scope.search.canInfiniteScroll==false) {
                $log.debug('canInfiniteScroll',false)
                return false;
            } else {
                $log.debug('canInfiniteScroll',true);
                if ($scope.found && $scope.found.statistics && $scope.found.statistics.pageCount) {
                    $log.debug('pageCount vs pageIndex',$scope.found.statistics.pageCount,$scope.search.pageIndex);
                    if ($scope.search.pageIndex < ($scope.found.statistics.pageCount-1)) {
                        $log.debug('more to load',true);
                        return true;
                    }
                }
            }

            $log.debug('more to load',false);
            return false;
        }

        $scope.loadMore = function() {
            $log.debug('load more');
            $scope.search.pageIndex++;
            $log.debug('pageIndex',$scope.search.pageIndex);
            $scope.load();
        }

        $scope.showDestinations();

    }

]);