angular.module('ngAsyncRenderPages', [])
    .directive('asyncPagesRenderer', function($compile) {
        return {
            restrict: 'A',
            scope: {
                content: "="
            },
            link: function(scope, element, attrs) {
                scope.$watch("content", function() {
                    var el = angular.element(scope.content);
                    element.append( $compile(el)(scope) );
                }, true);


            }
        };
    });