angular.module('ngCollapseBox', [])
    .directive('collapse', function() {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            template: '<div class="collapse-container" ng-transclude></div>',
            link: function (scope, element, attrs) {
                element.bind('click', function () {
                    var answer = element[0].querySelector('.collapse-body');
                    if (answer.style.display == 'block') {
                        answer.style.display = 'none';
                    }
                    else {
                        answer.style.display = 'block';
                    }
                });
            }
        };
    });