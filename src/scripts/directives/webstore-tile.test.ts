///// <reference path="../../../typings/master.test.d.ts" />
///// <reference path="webstore-tile.ts"/>
//
//'use strict';
//
//describe('Directive: webstoreTile', function () {
//  var element, scope, state;
//  var tileController;
//  // load the directive's module
//  beforeEach(angular.mock.module('casUiServiceApp'));
//
//  beforeEach(inject(function ($rootScope, _$state_) {
//    scope = $rootScope.$new();
//    state = _$state_;
//    scope.tile = {
//      appId: "jkashdkjh2jk34hkj234",
//      appName: "App1",
//      version: "1.0",
//      committerId: "alex",
//      commitId: "2132",
//      buildTs: 198989898,
//      buildDuration: 19898989,
//      updateUrl: "http://google.com"
//    };
//    tileController = new WebstoreTileController(state, scope);
//  }));
//
//  it('directive should render the scope.tile properly almost each property should be displayed in the html', function(done){
//    inject(function ($compile) {
//      element = angular.element('<webstore-tile tile="tile"></webstore-tile>');
//      element = $compile(element)(scope);
//
//      scope.$digest();
//      expect(element.html()).toContain('App1');
//
//      done();
//    });
//  });
//
//});
