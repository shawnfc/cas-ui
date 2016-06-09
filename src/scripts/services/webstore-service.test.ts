/// <reference path="../../../typings/master.test.d.ts" />

'use strict';

describe('Service: webstoreService', () => {

  var activeApps = JSON.parse('[{"appId":"adkojgdlfbilpolmlofejdgididfklfk","appName":"Slack","defaultSpaceId":"1","createdAt":"2015-12-11T18:36:17.000Z","updatedAt":"2015-12-11T18:36:17.000Z"},{"appId":"bblomeobogbokobhchdlciajfaifmdng","appName":"StorePCMenu","defaultSpaceId":"1","createdAt":"2015-12-08T19:36:32.000Z","updatedAt":"2015-12-08T19:36:32.000Z"},{"appId":"cfflgggnefmchloliajppkfnmnagehlc","appName":"crom","defaultSpaceId":"1","createdAt":"2015-12-08T19:35:57.000Z","updatedAt":"2015-12-08T19:35:57.000Z"},{"appId":"idemlaebhfjijadoahclfjcfchgmendd","appName":"Fusion Demo","defaultSpaceId":"1","createdAt":"2015-12-08T19:35:35.000Z","updatedAt":"2015-12-08T19:35:35.000Z"},{"appId":"llgifiikhhgbpbcglcljmaajhaonlmok","appName":"THD Management","defaultSpaceId":"1","createdAt":"2015-12-08T19:35:35.000Z","updatedAt":"2015-12-08T19:35:35.000Z"}]');
  var spcmBuilds = JSON.parse('[{"buildId":"e815ce16-0775-4224-afcf-f6762f562c10","appId":"bblomeobogbokobhchdlciajfaifmdng","version":"0.0.37","spaceId":"1","committerId":"alexdobarganes","commitId":"54583f2","commitUrl":"oses.homedepot.com/thdsal/cr-spcm/commit/54583f2","buildTs":1450298448,"buildDuration":4000,"updateUrl":"http://iws-cas-app-delivery.apps.homedepot.com/api/comm/iws-cas-app-delivery/request/iw-cas-app-delivery/xml?spaceId=1&x=id=bblomeobogbokobhchdlciajfaifmdng","createdAt":"2015-12-16T20:40:51.000Z","updatedAt":"2015-12-16T20:40:51.000Z"},{"buildId":"e6de5b06-557a-466e-8346-1cfe7ac1e257","appId":"bblomeobogbokobhchdlciajfaifmdng","version":"0.0.36","spaceId":"1","committerId":"alexdobarganes","commitId":"1098427","commitUrl":"oses.homedepot.com/thdsal/cr-spcm/commit/1098427","buildTs":1450205554,"buildDuration":4000,"updateUrl":"http://iws-cas-app-delivery.apps.homedepot.com/api/comm/iws-cas-app-delivery/request/iw-cas-app-delivery/xml?spaceId=1&x=id=bblomeobogbokobhchdlciajfaifmdng","createdAt":"2015-12-15T18:52:38.000Z","updatedAt":"2015-12-15T18:52:38.000Z"},{"buildId":"2494b4d7-a9a5-463c-9248-a07e965ed79d","appId":"bblomeobogbokobhchdlciajfaifmdng","version":"0.0.35","spaceId":"1","committerId":"alexdobarganes","commitId":"f6df3ae","commitUrl":"oses.homedepot.com/thdsal/cr-spcm/commit/f6df3ae","buildTs":1449762740,"buildDuration":4000,"updateUrl":"http://iws-cas-app-delivery.apps.homedepot.com/api/comm/iws-cas-app-delivery/request/iw-cas-app-delivery/xml?spaceId=1&x=id=bblomeobogbokobhchdlciajfaifmdng","createdAt":"2015-12-10T15:52:24.000Z","updatedAt":"2015-12-10T15:52:24.000Z"},{"buildId":"61f6e4b3-604f-44ff-b9ae-19690883d862","appId":"bblomeobogbokobhchdlciajfaifmdng","version":"0.0.34","spaceId":"1","committerId":"alexdobarganes","commitId":"f6df3ae","commitUrl":"oses.homedepot.com/thdsal/cr-spcm/commit/f6df3ae","buildTs":1449679049,"buildDuration":4000,"updateUrl":"http://iws-cas-app-delivery.apps.homedepot.com/api/comm/iws-cas-app-delivery/request/iw-cas-app-delivery/xml?spaceId=1&id=bblomeobogbokobhchdlciajfaifmdng","createdAt":"2015-12-09T16:37:28.000Z","updatedAt":"2015-12-09T16:37:28.000Z"},{"buildId":"ff1b70a4-543c-4877-b6f9-85c2fceb3bee","appId":"bblomeobogbokobhchdlciajfaifmdng","version":"0.0.28","spaceId":"1","committerId":"alexdobarganes","commitId":"72e8a2e","commitUrl":"oses.homedepot.com/thdsal/cr-spcm/commit/72e8a2e","buildTs":1449613140,"buildDuration":4000,"updateUrl":"http://iws-cas-app-delivery.apps.homedepot.com/api/comm/iws-cas-app-delivery/request/iw-cas-app-delivery/xml?spaceId=1&id=bblomeobogbokobhchdlciajfaifmdng","createdAt":"2015-12-08T22:19:03.000Z","updatedAt":"2015-12-08T22:19:03.000Z"},{"buildId":"ec13bc5e-653f-439e-9435-2e967ae94f7f","appId":"bblomeobogbokobhchdlciajfaifmdng","version":"0.0.27","spaceId":"1","committerId":"alexdobarganes","commitId":"72e8a2e","commitUrl":"oses.homedepot.com/thdsal/cr-spcm/commit/72e8a2e","buildTs":1449613088,"buildDuration":4000,"updateUrl":"http://iws-cas-app-delivery.apps.homedepot.com/api/comm/iws-cas-app-delivery/request/iw-cas-app-delivery/xml?spaceId=1&id=bblomeobogbokobhchdlciajfaifmdng","createdAt":"2015-12-08T22:18:11.000Z","updatedAt":"2015-12-08T22:18:11.000Z"},{"buildId":"888bcf55-bc0d-4a95-bf7d-2439c16ae680","appId":"bblomeobogbokobhchdlciajfaifmdng","version":"0.0.26","spaceId":"1","committerId":"alexdobarganes","commitId":"72e8a2e","commitUrl":"oses.homedepot.com/thdsal/cr-spcm/commit/72e8a2e","buildTs":1449612713,"buildDuration":4000,"updateUrl":"http://iws-cas-app-delivery.apps.homedepot.com/api/comm/iws-cas-app-delivery/request/iw-cas-app-delivery/xml?spaceId=1&id=bblomeobogbokobhchdlciajfaifmdng","createdAt":"2015-12-08T22:11:57.000Z","updatedAt":"2015-12-08T22:11:57.000Z"},{"buildId":"861aed70-14c0-44ae-897c-d5152a05da73","appId":"bblomeobogbokobhchdlciajfaifmdng","version":"0.0.25","spaceId":"1","committerId":"alexdobarganes","commitId":"72e8a2e","commitUrl":"oses.homedepot.com/thdsal/cr-spcm/commit/72e8a2e","buildTs":1449612237,"buildDuration":4000,"updateUrl":"http://iws-cas-app-delivery-postsigmoid-solfeggio.apps-np.homedepot.com/api/comm/iws-cas-app-delivery/request/iw-cas-app-delivery/xml?spaceId=1&id=bblomeobogbokobhchdlciajfaifmdng","createdAt":"2015-12-08T22:04:00.000Z","updatedAt":"2015-12-08T22:04:00.000Z"},{"buildId":"217d13a0-7351-4c99-9152-e19e5addbd27","appId":"bblomeobogbokobhchdlciajfaifmdng","version":"0.0.24","spaceId":"1","committerId":"alexdobarganes","commitId":"72e8a2e","commitUrl":"oses.homedepot.com/thdsal/cr-spcm/commit/72e8a2e","buildTs":1449603390,"buildDuration":4000,"updateUrl":"http://iws-cas-app-delivery-postsigmoid-solfeggio.apps-np.homedepot.com/api/comm/iws-cas-app-delivery/request/iw-cas-app-delivery/xml?spaceId=1&id=bblomeobogbokobhchdlciajfaifmdng","createdAt":"2015-12-08T19:36:33.000Z","updatedAt":"2015-12-08T19:36:33.000Z"}]');
  var cromBuilds = JSON.parse('[{"buildId":"e9883480-8ae0-4f87-b1b4-b5e8c079e176","appId":"cfflgggnefmchloliajppkfnmnagehlc","version":"0.0.78","spaceId":"1","committerId":"alexdobarganes","commitId":"c29f4d4","commitUrl":"oses.homedepot.com/thdsal/cr-crom/commit/c29f4d4","buildTs":1449612763,"buildDuration":1220,"updateUrl":"http://iws-cas-app-delivery.apps.homedepot.com/api/comm/iws-cas-app-delivery/request/iw-cas-app-delivery/xml?spaceId=1&x=id%3Dcfflgggnefmchloliajppkfnmnagehlc","createdAt":"2015-12-08T22:12:44.000Z","updatedAt":"2015-12-08T22:12:44.000Z"},{"buildId":"caf4676c-5401-4ff6-b548-d8e64ea3cd8b","appId":"cfflgggnefmchloliajppkfnmnagehlc","version":"0.0.77","spaceId":"1","committerId":"alexdobarganes","commitId":"c29f4d4","commitUrl":"oses.homedepot.com/thdsal/cr-crom/commit/c29f4d4","buildTs":1449603357,"buildDuration":995,"updateUrl":"http://iws-cas-app-delivery-postsigmoid-solfeggio.apps-np.homedepot.com/api/comm/iws-cas-app-delivery/request/iw-cas-app-delivery/xml?spaceId=1&x=id%3Dcfflgggnefmchloliajppkfnmnagehlc","createdAt":"2015-12-08T19:35:57.000Z","updatedAt":"2015-12-08T19:35:57.000Z"}]');

  var webstoreService;
  var apiRoutes;
  var $httpBackend;

  beforeEach(angular.mock.module('casUiServiceApp'));

  beforeEach(inject((_$httpBackend_, _webstoreService_, _API_ROUTES_) => {
    webstoreService = _webstoreService_;
    $httpBackend = _$httpBackend_;
    apiRoutes = _API_ROUTES_;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;

    $httpBackend.whenPOST(apiRoutes.core_api.log).respond({info:'logged'});
  }));

  it('getActiveApps should return data', function(done) {
    $httpBackend.expectGET(apiRoutes.core_api.getActiveApps).respond(activeApps);
    webstoreService.getActiveApps().then((data)=> {
      expect(data).toBeDefined();
      done();
    }, (error)=> {
      console.log(error);
      done(error);
    });
    $httpBackend.flush();
  });

  it('getBuildPackages by appId bblomeobogbokobhchdlciajfaifmdng should be defined', function (done) {
    $httpBackend.expectPOST(apiRoutes.core_api.getBuilds, {appId: 'bblomeobogbokobhchdlciajfaifmdng'}).respond(spcmBuilds);

    webstoreService.getBuildPackages('bblomeobogbokobhchdlciajfaifmdng').then((data)=> {
      expect(data).toBeDefined();
      done();
    }, (error)=> {
      console.error(error);
      done(error);
    });
    $httpBackend.flush();
  });

  it('getBuildPackages by appId 1234 should be null', function (done) {
    $httpBackend.expectPOST(apiRoutes.core_api.getBuilds, {appId: '1234'}).respond(null);

    webstoreService.getBuildPackages('1234').then((data)=> {
      expect(data).toBeNull();
      done();
    }, (error)=> {
      console.error(error);
      done(error);
    });
    $httpBackend.flush();
  });
});
