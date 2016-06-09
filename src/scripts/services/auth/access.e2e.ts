/// <reference path="../../../../typings/master.e2e.d.ts" />

describe('access test rig', function() {
  beforeAll(function() {
    browser.get('http://localhost:9000/');
    expect(browser.getCurrentUrl()).toContain('http://localhost:9000/#/login');
    element(by.model('vm.email')).sendKeys('axd8012');
    element(by.model('vm.password')).sendKeys('pwd');
    element(by.id('signIn')).click();
  });

  it('schedule should be disabled for user axd8012 and app bblomeobogbokobhchdlciajfaifmdng', function() {
    browser.get('http://localhost:9000/#/webstore/apps/bblomeobogbokobhchdlciajfaifmdng');
    expect(element(by.xpath('//td[9]/button')).isEnabled()).toBe(false);
  });

  it('promote should be disabled for user axd8012 and app bblomeobogbokobhchdlciajfaifmdng', function() {
    browser.get('http://localhost:9000/#/webstore/apps/bblomeobogbokobhchdlciajfaifmdng');
    expect(element(by.xpath('//td[10]/button')).isEnabled()).toBe(false);
  });

  afterAll(function () {
    browser.get('http://localhost:9000/#/logout');
  })
});
