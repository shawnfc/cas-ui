angular.module('cas.auth', ['angular-storage']).config(($httpProvider) =>{
  $httpProvider.interceptors.push('APIInterceptor');
})
  .run(($rootScope, $state, $location, Authorization, loginModal, APP_EVENTS) => {
  var routeChangeRequiredAfterLogin = false, loginRedirect;
  $rootScope.$on(APP_EVENTS.state_events.stateChangeStart, (event, toState, toParams, fromState, fromParams) => {
    var authorised;
    var stateData = toState.data;

    if (stateData !== undefined && stateData.access !== undefined) {
      authorised = Authorization.authorize(stateData.access.loginRequired, stateData.access.permissions, stateData.access.permissionCheckType, toParams);
      if (authorised === 1) {
        event.preventDefault();
        routeChangeRequiredAfterLogin = true;
        loginRedirect = {state: toState, params: toParams};
        $state.go('login').then(()=>{
          $rootScope.$broadcast(APP_EVENTS.state_events.stateChangeSuccess, toState, toParams, fromState, fromParams);
        });
      } else if (authorised === 2) {
        event.preventDefault();
        loginModal.show('Attention', 'You are not authorized to get here')
          .then(function () {
            $state.go('login');
          });
      }
      else
      if (routeChangeRequiredAfterLogin && toState.url !== '/login') {
        routeChangeRequiredAfterLogin = false;
        $state.transitionTo(loginRedirect.state, loginRedirect.params).then(function() {
          // line 907 state.js
          $rootScope.$broadcast(APP_EVENTS.state_events.stateChangeSuccess, toState, toParams, fromState, fromParams);
        });
      }}
  });

  $rootScope.$on('token-expired', () => {
    $state.go('logout');
  });
});

angular.module('cas.auth').service('APIInterceptor', function($rootScope, UserService) {
  var service = this;

  service.response = (response) => {
    var headers = response.headers();
    if(headers.iw_app_user_data !== void 0)
      UserService.setCurrentUser(JSON.parse(headers.iw_app_user_data));
    return response;
  };

  service.responseError = function(response) {
    if (response.status === 400 && response.data === "invalid token") {
      $rootScope.$broadcast('token-expired');
    }
    if (response.status === 403) {
      var headers = response.headers();
      if(headers.iw_app_user_data !== void 0){
        UserService.setCurrentUser(JSON.parse(headers.iw_app_user_data));
      }
    }
    return response;
  };
});
