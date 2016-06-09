/// <reference path="../../typings/master.d.ts" />

angular.module('mockData', ['ngMockE2E', 'apiRoutes']);

angular.module('mockData').run(($httpBackend, API_ROUTES) => {

    //THIS will happen serverside.
    //function BuildChildren(orgUnits:any[],parent?:any){
    //
    //  var parentObj = parent || _.reduce(orgUnits,(memo,ou)=>{
    //    var isParent= !_.any(orgUnits,(o)=>{
    //      return o.orgUnitId === ou.parentOrgUnitId;
    //    });
    //
    //    if(isParent){
    //      return {
    //        "collapsed": false,
    //        "name": ou.parentOrgUnitPath,
    //        "orgUnitPath": ou.parentOrgUnitPath,
    //        "orgUnitId": ou.parentOrgUnitId
    //      };
    //    }
    //    return memo;
    //  },null);
    //
    //  parentObj.children = _.filter(orgUnits,(ou)=>{
    //    return ou.parentOrgUnitId == parentObj.orgUnitId;
    //  });
    //
    //  _.each(parentObj.children, (child: any)=>{
    //    child = BuildChildren(orgUnits,child);
    //    child.collapsed = true;
    //  })
    //
    //  return parentObj;
    //}

    //Setup endpoint listeners the resolve mock data in case of debug.

    //Authentication api mock
    $httpBackend.whenPOST(API_ROUTES.auth_api.authenticate).respond((method, url, data) => {
        data = JSON.parse(data);
        var request = new XMLHttpRequest();

        request.open('GET', '/mock-data/users.json', false);
        request.send(null);

        var result = _.find(JSON.parse(request.response), (app: any) => {
            return app.username === data.username;
        });

        return [request.status, {}, { "iw_app_user_data": JSON.stringify(result) }];
    });

    $httpBackend.whenPOST(API_ROUTES.users_api.findUsers).respond((method, url, data) => {
        data = JSON.parse(data);
        var request = new XMLHttpRequest();

        request.open('GET', '/mock-data/users.json', false);
        request.send(null);

        var result = _.find(JSON.parse(request.response), (app: any) => {
            return app.username.startsWith(data.username);
        });

        return [request.status, result, {}];
    });

    $httpBackend.whenPOST(API_ROUTES.users_api.getUserRoles).respond((method, url, data) => {
        data = JSON.parse(data);
        var request = new XMLHttpRequest();

        request.open('GET', '/mock-data/users.json', false);
        request.send(null);

        var result = _.find(JSON.parse(request.response), (app: any) => {
            return app.username.startsWith(data.username);
        });

        return [request.status, result, {}];
    });

    $httpBackend.whenPOST(API_ROUTES.users_api.saveUserRole).respond((method, url, data) => {
        data = JSON.parse(data);
        return [200, {}, {}];
    });

    //Core api mock
    $httpBackend.whenPOST(API_ROUTES.core_api.log).respond({ message: "logged" });
    $httpBackend.whenPOST(API_ROUTES.core_api.getDetailedApp).respond((method, url, data) => {
        var request = new XMLHttpRequest();

        request.open('GET', '/mock-data/detailed-apps.json', false);
        request.send(null);

        var result = _.find(JSON.parse(request.response), (app: any) => {
            return app.appId === JSON.parse(data).appId;
        });

        return [request.status, result, {}];
    });
    $httpBackend.whenPOST(API_ROUTES.core_api.getBuilds).respond((method, url, data) => {
        var request = new XMLHttpRequest();

        request.open('GET', '/mock-data/builds.json', false);
        request.send(null);

        var result = _.filter(angular.fromJson(request.response), (build: IChromeBuild) => {
            return build.appId == JSON.parse(data).appId;
        });

        return [request.status, result, {}];
    });
    $httpBackend.whenGET(API_ROUTES.core_api.getActiveApps).respond((method, url, data) => {
        var request = new XMLHttpRequest();

        request.open('GET', '/mock-data/apps.json', false);
        request.send(null);

        return [request.status, request.response, {}];
    });

    //Get non promoted spaces
    $httpBackend.whenPOST(API_ROUTES.core_api.getNonPromotedSpaces).respond((method, url, data) => {
        var request = new XMLHttpRequest();

        request.open('GET', '/mock-data/spaces.json', false);
        request.send(null);

        return [request.status, request.response, {}];
    });

    //Get promoted spaces
    $httpBackend.whenPOST(API_ROUTES.core_api.getPromotedSpaces).respond((method, url, data) => {
        var request = new XMLHttpRequest();

        request.open('GET', '/mock-data/spaces.json', false);
        request.send(null);

        return [request.status, request.response, {}];
    });

    $httpBackend.whenPOST(API_ROUTES.core_api.getBuildTimeline).respond((method, url, data) => {
        var request = new XMLHttpRequest();

        request.open('GET', '/mock-data/build-timeline.json', false);
        request.send(null);

        return [request.status, request.response, {}];
    });

    //Promotion api mock
    $httpBackend.whenPOST(API_ROUTES.promotion_api.promoteBuild).respond((method, url, data) => {
        var parsedData = JSON.parse(data);
        var promoteBuild = {
            buildId: parsedData.buildId,
            toSpaceId: parsedData.toSpaceId
        };

        return [200, [promoteBuild], {}];
    });

    //Schedule api mock
    $httpBackend.whenPOST(API_ROUTES.schedule_api.newScheduleEvent).respond((method, url, data) => {
        var parsedData = JSON.parse(data);
        var scheduleEvent = {
            scheduledDate: parsedData.scheduledDate,
            schedulerId: parsedData.schedulerId,
            buildId: parsedData.buildId,
            scheduleEventId: Date.now().toString(),
            orgUnit: parsedData.orgUnit
        };

        return [200, scheduleEvent, {}];
    });
    $httpBackend.whenPOST(API_ROUTES.schedule_api.updateScheduleEvent).respond((method, url, data) => {
        data.buildId = 1;
        return [200, data, {}];
    });

    //Google api mock
    $httpBackend.whenPOST(API_ROUTES.google_api.setGoogleAuthKey).respond(() => {
        return [200, {}, null];
    });
    $httpBackend.whenPOST(API_ROUTES.google_api.getDirectoryTree).respond((method, url, data) => {
        var request = new XMLHttpRequest();

        request.open('GET', '/mock-data/organization.json', false);
        request.send(null);

        return [request.status, request.response, {}];
    });

    //PASS this routes, this are the local mock files
    $httpBackend.whenGET('/mock-data/detailed-apps.json').passThrough();
    $httpBackend.whenGET('/mock-data/organization.json').passThrough();
    $httpBackend.whenGET('/mock-data/builds.json').passThrough();
    $httpBackend.whenGET('/mock-data/apps.json').passThrough();
    $httpBackend.whenGET('/mock-data/spaces.json').passThrough();
    $httpBackend.whenGET('/mock-data/users.json').passThrough();
    $httpBackend.whenGET('/mock-data/build-timeline.json').passThrough();

    //PASS this routes, they are local
    $httpBackend.whenGET(/views/).passThrough();
    $httpBackend.whenGET(/directive/).passThrough();
});
