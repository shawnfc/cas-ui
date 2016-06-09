/// <reference path="../../../typings/master.e2e.d.ts" />

describe('_common-e2e', function() {
  beforeAll(function() {
    browser.get('http://localhost:9000/');
    expect(browser.getCurrentUrl()).toContain('http://localhost:9000/#/login');
    element(by.model('vm.email')).sendKeys('admin');
    element(by.model('vm.password')).sendKeys('pwd');
    element(by.id('signIn')).click();
    browser.get('http://localhost:9000/');expect(browser.getCurrentUrl()).toContain('http://localhost:9000/#/webstore/apps');
  });
  it('should have the app repeater', function() {
    expect(element(by.repeater('buildPackage in buildPackages')).isPresent()).toBe(true);
  });

  afterAll(function () {
    browser.get('http://localhost:9000/#/logout');
  })
});
