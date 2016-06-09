/// <reference path="../../../typings/master.d.ts" />
/// <reference path="log-service.ts"/>
/// <reference path="../dto/IAuthKey.ts"/>

import IAuthKey = Dto.IAuthKey;

interface IGoogleAuthService {
  setAuthKey(authKey:string, domain:string):ng.IPromise<IAuthKey>;
  getAuthKey():ng.IPromise<IAuthKey>;
}

class GoogleAuthService implements IGoogleAuthService {
  constructor(private $http:ng.IHttpService, private $q:ng.IQService, private $log: HttpLogger, private API_ROUTES) { }

  getAuthKey():ng.IPromise<IAuthKey> {
    var deferred = this.$q.defer();
    this.$http.get(this.API_ROUTES.google_api.getGoogleAuthKey)
      .then((response:ng.IHttpPromiseCallbackArg<IAuthKey>) => {
        deferred.resolve(response.data);
      })
      .catch((e:Error)=> {
        console.error(e);
        deferred.reject(e);
      });

    return deferred.promise;
  }

  setAuthKey(key: string, domain: string):ng.IPromise<IAuthKey> {
    var deferred = this.$q.defer();
    this.$http.post(this.API_ROUTES.google_api.setGoogleAuthKey, {key: key, domain: domain})
      .then((response:ng.IHttpPromiseCallbackArg<IAuthKey>) => {
        deferred.resolve(response.data);
      })
      .catch((e:Error)=> {
        console.error(e);
        deferred.reject(e);
      });

    return deferred.promise;
  }
}

angular.module('casUiServiceApp').service('googleAuthService', GoogleAuthService);
