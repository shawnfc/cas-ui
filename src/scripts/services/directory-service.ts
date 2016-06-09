/// <reference path="../../../typings/master.d.ts" />
/// <reference path="log-service.ts"/>
/// <reference path="../dto/IOrgUnit.ts"/>

import IOrgUnit = Dto.IOrgUnit;

interface IDirectoryService {
  getOuTree(req: any):ng.IPromise<IOrgUnit>;
}

class DirectoryService  implements IDirectoryService {
  constructor(private $http:ng.IHttpService, private $q:ng.IQService, private $log: HttpLogger, private API_ROUTES) {}

  getOuTree(req):ng.IPromise<IOrgUnit>{
    var deferred = this.$q.defer();
    this.$log.info('getting directory tree');
    this.$http.post(this.API_ROUTES.google_api.getDirectoryTree, req)
      .then((response: ng.IHttpPromiseCallbackArg<IOrgUnit>)=> {
        deferred.resolve(response.data);
      }, (e:Error)=> {
        this.$log.error(e.message, e.name);
        deferred.reject(e);
      });

    return deferred.promise;
  }
}


angular.module('casUiServiceApp').service('directoryService', DirectoryService);
