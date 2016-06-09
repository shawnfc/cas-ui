angular.module('cas.states', ['ngMaterial', 'ui.router']).config(($urlRouterProvider, $stateProvider) => {
  $urlRouterProvider.otherwise(function () {
    return '/webstore/apps';
  });

  $stateProvider.state({
    name: 'common',
    abstract: true,
    templateUrl: 'views/_common.html',
    controller: 'CommonCtrl'
  });

  //Common state that contains the header and footer.
  $stateProvider.state('common.webstore', {
    abstract: true,
    url: '/webstore',
    template: '<div ui-view ></div>',
    controller: function ($scope, webstoreService, $log, $mdDialog) {
      $scope.showNewAppDialog = () => {
        $mdDialog.show({
            templateUrl: 'views/app-creation/new-app.html',
            controller: 'NewAppController',
            controllerAs: 'vm',
            resolve: {
              spaces: (webstoreService:IWebstoreService) => {
                return webstoreService.getNonPromotedSpaces('');
              }
            },
            data: {
              access: {
                loginRequired: true,
                permissions: ['admin'],
                permissionCheckType: 0
              }
            },
            parent: angular.element(document.body),
            clickOutsideToClose: true
          })
          .then(function (answer) {
            GetActiveApps();
          });
      };

      function GetActiveApps() {
        webstoreService.getActiveApps().then((data) => {
          $scope.buildPackages = data;
          console.log(data);
        }, (error) => {
          $log.error(error);
        });
      }

      GetActiveApps();
    }
  });

  //Common state that only admins can see.
  $stateProvider.state('common.admin', {
    url: '/admin',
    abstract: true,
    template: '<div ui-view ></div>',
    controller: function ($scope, $log) {
      $scope.title = "Administration";
    }
  });

  $stateProvider.state('common.admin.credentials', {
    url: '/creds',
    templateUrl: 'views/googlecreds.html',
    controller: 'credEditorCtrl',
    data: {
      pageTitle: "Credential Editor",
      access: {
        loginRequired: true,
        permissions: ['admin'],
        permissionCheckType: 0
      }
    }
  });

  $stateProvider.state('common.admin.create-app', {
    url: '/apps/create',
    templateUrl: 'views/app-creation/new-app.html',
    controller: 'NewAppController',
    controllerAs: 'vm',
    resolve: {
      spaces: (webstoreService:IWebstoreService) => {
        return webstoreService.getNonPromotedSpaces('');
      }
    },
    data: {
      access: {
        loginRequired: true,
        permissions: ['admin'],
        permissionCheckType: 0
      }
    }
  });

  $stateProvider.state('common.admin.user-roles', {
    url: '/user-roles',
    templateUrl: 'views/members.html',
    controller: 'UserRolesController',
    controllerAs: 'vm',
    resolve: {
      roles: () => {
        return ['Admin', 'Promoter', 'Scheduler', 'Viewer'];
      },
      apps: (webstoreService:IWebstoreService) => {
        return webstoreService.getActiveApps();
      },
      spaces: (webstoreService:IWebstoreService) => {
        return webstoreService.getNonPromotedSpaces('');
      }
    },
    data: {
      access: {
        loginRequired: true,
        permissions: ['admin'],
        permissionCheckType: 0
      }
    }
  });

  //This route resolves the apps to be listed.
  $stateProvider.state('common.webstore.apps', {
    url: '/apps',
    templateUrl: "views/webstore-view.html",
    data: {
      pageTitle: "Chrome Test",
      access: {
        loginRequired: true,
        permissionCheckType: '0'
      }
    },
    controller: ($scope) => {
      $scope.$parent.title = "Home Depot Store Apps";
    }
  });

  //This route renders the application list.
  $stateProvider.state('common.webstore.builds', {
    url: '/apps/:appId',
    templateUrl: 'views/build-view.html',
    controller: "BuildController",
    controllerAs: 'vm',
    resolve: {
      appId: ($stateParams:ng.ui.IStateParamsService) => {
        return $stateParams["appId"];
      }
    },
    data: {
      access: {
        loginRequired: true,
        permissions: ['viewer', 'promoter', 'scheduler', 'admin'],
        permissionCheckType: 0
      }
    },
  });

  $stateProvider.state('login', {
    controller: 'LoginController',
    url: '/login',
    controllerAs: 'vm',
    templateUrl: 'views/login.html'
  });

  $stateProvider.state('logout', {
    controller: function (UserService, $state) {
      UserService.setCurrentUser();
      $state.go('common.webstore.apps');
    },
    url: '/logout',
  });

  $stateProvider.state({
    name: 'unauthorized',
    url: "/unauthorized",
    onEnter: ($stateParams, $state, $mdDialog) => {
      var alert = $mdDialog.alert({
        title: 'Unauthorized',
        textContent: 'You are not authorized to execute this!',
        ok: 'Close'
      });
      $mdDialog
        .show(alert)
        .finally(function () {
          alert = undefined;
        });
    }
  });
});
