angular.module('cas.decorators', []).config(($provide, $httpProvider) =>{
  $httpProvider.interceptors.push($q => {
    return {
      response: response => {
        return $q.resolve(response);
      },
      responseError: rejection => {
        if(rejection.status <= 0) {
          rejection.data = new Error('Unable to connect to the endpoint');
        }
        return $q.reject(rejection);
      }
    };
  });

  //Required to enable logs.
  $provide.decorator('$log',($delegate, $injector, API_ROUTES) => {
    return new HttpLogger($injector, $delegate, API_ROUTES);
  });
});
