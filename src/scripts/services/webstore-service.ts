/// <reference path="../../../typings/master.d.ts" />
/// <reference path="log-service.ts"/>
/// <reference path="../dto/IChromeBuild.ts"/>

import IChromeBuild = Dto.IChromeBuild;

interface IWebstoreService {
    getAppDetails(appId: string): ng.IPromise<any>;
    getActiveApps(): ng.IPromise<IChromeBuild[]>;
    getBuildPackages(appId: string): ng.IPromise<IChromeBuild[]>;
    getNonPromotedSpaces(buildId?: string): ng.IPromise<Dto.IChromeSpace[]>;
    getPromotedSpaces(buildId: string): ng.IPromise<Dto.IChromeSpace[]>;
    getBuildTimeline(buildId: string): ng.IPromise<any>;
    getAppTimeline(appId: string): ng.IPromise<any>;
    newChromeApp(app: any): ng.IPromise<any>;
}

class WebstoreService implements IWebstoreService {
    constructor(private $http: ng.IHttpService, private $q: ng.IQService, private $log: HttpLogger, private API_ROUTES) { }

    newChromeApp(app) {
        var deferred = this.$q.defer();
        this.$log.info('getting build packages from service');
        this.$http.post(this.API_ROUTES.core_api.newChromeApp, app)
            .then((response: ng.IHttpPromiseCallbackArg<IChromeBuild[]>) => {
                deferred.resolve(response.data);
            }, (e: Error) => {
                this.$log.error(e.message, e.name);
                deferred.reject(e);
            });

        return deferred.promise;
    }

    getBuildPackages(appId): ng.IPromise<IChromeBuild[]> {
        var deferred = this.$q.defer();
        this.$log.info('getting build packages from service');
        this.$http.post(this.API_ROUTES.core_api.getBuilds, { appId: appId })
            .then((response: ng.IHttpPromiseCallbackArg<IChromeBuild[]>) => {
                deferred.resolve(response.data);
            }, (e: Error) => {
                this.$log.error(e.message, e.name);
                deferred.reject(e);
            });

        return deferred.promise;
    }

    getActiveApps(): ng.IPromise<any[]> {
        var deferred = this.$q.defer();
        this.$log.info('getting active apps');
        this.$http.get(this.API_ROUTES.core_api.getActiveApps)
            .then((response: ng.IHttpPromiseCallbackArg<any[]>) => {
                deferred.resolve(response.data);
            })
            .catch((e: Error) => {
                console.error(e);
                deferred.reject(e);
            });

        return deferred.promise;
    }

    getAppDetails(req: any): ng.IPromise<any[]> {
        var deferred = this.$q.defer();
        this.$log.info('get app details', req);
        this.$http.post(this.API_ROUTES.core_api.getDetailedApp, { appId: req })
            .then((response: ng.IHttpPromiseCallbackArg<any[]>) => {
                deferred.resolve(response.data);
            })
            .catch((e: Error) => {
                console.error(e);
                deferred.reject(e);
            });

        return deferred.promise;
    }

    getNonPromotedSpaces(buildId?): ng.IPromise<Dto.IChromeSpace[]> {
        var deferred = this.$q.defer();
        this.$log.info('get non promoted spaces');
        this.$http.post(this.API_ROUTES.core_api.getNonPromotedSpaces, { buildId: buildId })
            .then((response: ng.IHttpPromiseCallbackArg<any[]>) => {
                deferred.resolve(response.data);
            })
            .catch((e: Error) => {
                console.error(e);
                deferred.reject(e);
            });

        return deferred.promise;
    }

    getPromotedSpaces(buildId): ng.IPromise<Dto.IChromeSpace[]> {
        var deferred = this.$q.defer();
        this.$log.info('get promoted spaces');
        this.$http.post(this.API_ROUTES.core_api.getPromotedSpaces, { buildId: buildId })
            .then((response: ng.IHttpPromiseCallbackArg<any[]>) => {
                if (response.data)
                    deferred.resolve(response.data.reverse());
                else
                    deferred.resolve();
            })
            .catch((e: Error) => {
                console.error(e);
                deferred.reject(e);
            });

        return deferred.promise;
    }

    getBuildTimeline(buildId): ng.IPromise<any> {
        var deferred = this.$q.defer();
        this.$http.post(this.API_ROUTES.core_api.getBuildTimeline, { buildId: buildId })
            .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                deferred.resolve(response.data);
            })
            .catch((e: Error) => {
                console.error(e);
                deferred.reject(e);
            });

        return deferred.promise;
    }

    getAppTimeline(appId): ng.IPromise<any> {
        var deferred = this.$q.defer();
        this.$http.post(this.API_ROUTES.core_api.getAppTimeline, { appId: appId })
            .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                deferred.resolve(response.data);
            })
            .catch((e: Error) => {
                console.error(e);
                deferred.reject(e);
            });

        return deferred.promise;
    }
}

angular.module('casUiServiceApp').service('webstoreService', WebstoreService);
