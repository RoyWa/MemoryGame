var EntityEditorApp = angular.module('EntityEditorApp', [ 'ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/api/Projects');

        $stateProvider
            .state('/', {
                url: '/api/Projects',
                templateUrl: 'projectlist.html',
                controller: 'ListCtrl'
            });

    });

EntityEditorApp.factory('Project', function ($resource) {
    alert(1); // This does not run
    return $resource('/api/Project/:id', { id: '@id' }, { update: { method: 'PUT' } });
});

var ListCtrl = function ($scope) {
    alert(1); // This does not run
    $scope.projects = [];
    $scope.search = function () {
        Project.query(function (data) {
            $scope.projects = $scope.projects.concat(data);
        });
    };

    $scope.search();
};