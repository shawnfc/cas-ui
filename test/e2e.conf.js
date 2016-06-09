var glob = require("glob");
var path = require("path");
var _ = require('lodash');
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var files = glob.sync("**/*.e2e.js", {cwd:path.join(process.cwd(),'src/') });

files = _.map(files,function(file){
  return '../src/'+file;
});

// An example configuration file.
exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine 2 is recommended.
  framework: 'jasmine2',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: files,

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },
  onPrepare: function() {
    jasmine.getEnv().addReporter(
      new HtmlScreenshotReporter({
        dest: 'build/e2e-reports',
        filename: 'e2e-report.html'
      })
    );
  }
};
