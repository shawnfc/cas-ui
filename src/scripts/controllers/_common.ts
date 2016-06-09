'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:CommonCtrl
 * @description
 * # CommonCtrl
 * Controller of the demoApp
 */
angular.module('casUiServiceApp')
  .controller('CommonCtrl', ($scope, $mdSidenav, ssSideNav, UserService) => {

    $scope.onClickMenu = function () {
      $mdSidenav('left').toggle();
    };

    $scope.menu = ssSideNav;

    var user = UserService.getCurrentUser();
    refreshRoles(user);

    UserService.subscribe($scope, () => {
      var user = UserService.getCurrentUser();
      refreshRoles(user);
    });

    function refreshRoles(user) {
      if (user != undefined && user !== null)
        $scope.userRoles = _.uniq(_.pluck(user.authorization.user.roles, 'name'));
    }
  });
