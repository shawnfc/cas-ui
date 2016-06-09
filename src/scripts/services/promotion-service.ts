/// <reference path="../../../typings/master.d.ts" />
/// <reference path="log-service.ts"/>
/// <reference path="../dto/IOrgUnit.ts"/>

interface IPromotionService {
  promoteBuild(req: any):ng.IPromise<any>;
}

class PromotionService  implements IPromotionService {
  constructor(private $http:ng.IHttpService, private $q:ng.IQService, private $log: HttpLogger, private API_ROUTES) {}

  promoteBuild(req):ng.IPromise<any>{
    var deferred = this.$q.defer();
    this.$http.post(this.API_ROUTES.promotion_api.promoteBuild, req)
      .then((response: ng.IHttpPromiseCallbackArg<any>)=> {
        deferred.resolve(response.data);
      }, (e:Error)=> {
        this.$log.error(e.message, e.name);
        deferred.reject(e);
      });

    return deferred.promise;
  }
}


angular.module('casUiServiceApp').service('promotionService', PromotionService);

