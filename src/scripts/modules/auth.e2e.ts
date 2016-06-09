/// <reference path="../../../typings/master.e2e.d.ts" />

describe('auth-e2e', function() {
  it('should auto redirect to sign in page', function() {
    browser.get('http://localhost:9000/');
    var url = browser.getCurrentUrl();
    expect(url).toContain('http://localhost:9000/#/login');
  });
  it('should fail authentication with wrong user/pwd', function() {
    element(by.model('vm.email')).sendKeys('admi');
    element(by.model('vm.password')).sendKeys('wrong');
    element(by.id('signIn')).click();
    expect(element(by.css('.has-error')).isDisplayed());
  });
  it('should authenticate with right user/pwd', function() {
    element(by.model('vm.email')).clear();
    element(by.model('vm.password')).clear();
    element(by.model('vm.email')).sendKeys('admin');
    element(by.model('vm.password')).sendKeys('pwd');
    element(by.id('signIn')).click();
    expect(browser.getCurrentUrl()).toContain('http://localhost:9000/#/webstore/apps');
  });
  afterAll(function () {
    browser.get('http://localhost:9000/#/logout');
  })
});
