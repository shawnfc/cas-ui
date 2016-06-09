/// <reference path="../../../typings/master.test.d.ts" />
///<reference path="log-service.ts"/>

'use strict';

describe('Decorator: HttpLogger', function() {
  var $httpBackend;

  // load the angular.module using angular-mocks
  beforeEach(angular.mock.module('casUiServiceApp'));

  beforeEach(function() {
    angular.mock.module(function ($provide) {
      $provide.decorator('$log', ($delegate, $injector, API_ROUTES) => {
        return new HttpLogger($injector, $delegate, API_ROUTES);
      });
    });
  });

  beforeEach(inject((_$httpBackend_, API_ROUTES) => {
    $httpBackend = _$httpBackend_;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;

    $httpBackend.expectPOST(API_ROUTES.core_api.log).respond({});
  }));

  // the specs will be here
  //TODO improve this test
  it('should witness a post to the logging route', function(done) {
    inject(function ($log, $http) {
      spyOn($http, 'post').and.callThrough();
      $log.log('something');
      $httpBackend.flush();
      expect($http.post).toHaveBeenCalled();
      done();
    });
  });
});

