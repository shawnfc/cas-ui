'use strict';

angular.module('casUiServiceApp', ['cas.decorators', 'cas.auth', 'cas.modals', 'cas.theme', 'cas.states', 'cas.menu', 'apiRoutes', 'appEvents', 'md.data.table', 'cas.file', 'angularTreeview', 'mgo-angular-wizard', 'angular-timeline', 'md-steppers']);
if (document.location.hostname === "localhost" && (document.location.port === "9000"|| document.location.port === "9050")) {
  angular.module('casUiServiceApp').requires.push('mockData');
  console.log('PUSHED MOCK DATA IN MODULE ARRAY!!!!');
}
