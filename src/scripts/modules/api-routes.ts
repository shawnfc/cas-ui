var apiRoutes = {
  schedule_api: {
    getSchedule: '/api/comm/iws-cas-core/request/iw-cas-schedule/get-schedule',
    getBuildSchedules: '/api/comm/iws-cas-core/request/iw-cas-schedule/get-build-schedules',
    newScheduleEvent: '/api/comm/iws-cas-core/request/iw-cas-schedule/add-new',
    updateScheduleEvent: '/api/comm/iws-cas-core/request/iw-cas-schedule/update'
  },
  users_api:{
    getUserRoles: 'api/comm/iws-cas-core/request/iw-cas-user-roles/get-user-roles',
    findUsers: 'api/comm/iws-cas-core/request/iw-cas-user-roles/find-users',
    saveUserRole: 'api/comm/iws-cas-core/request/iw-cas-user-roles/add-new',
    deleteUserRole: 'api/comm/iws-cas-core/check/iw-cas-user-roles/delete'
  },
  promotion_api:{
    promoteBuild: '/api/comm/iws-cas-core/request/iw-cas-promotion/promote-build',
  },
  auth_api: {
    authenticate: '/api/comm/iws-cas-core/request/iw-auth/authenticate'
  },
  google_api:{
    getGoogleAuthKey: '/api/comm/iws-cas-core/ask/iw-google-api-auth/get-auth-key',
    setGoogleAuthKey: '/api/comm/iws-cas-core/check/iw-google-api-auth/set-auth-key',
    getDirectoryTree: '/api/comm/iws-cas-core/request/iw-google-api-admin-dir-org-units/list-org-units'
  },
  core_api: {
    log: '/api/comm/iws-cas-core/inform/iw-log/log',
    newChromeApp: '/api/comm/iws-cas-core/request/iw-cas-data-store/new-chrome-app',
    getNonPromotedSpaces: '/api/comm/iws-cas-core/request/iw-cas-data-store/get-non-promoted-spaces',
    getPromotedSpaces: '/api/comm/iws-cas-core/request/iw-cas-data-store/get-promoted-spaces',
    getActiveApps: '/api/comm/iws-cas-core/ask/iw-cas-data-store/get-active-apps',
    getBuilds: '/api/comm/iws-cas-core/request/iw-cas-data-store/get-app-builds',
    getDetailedApp: '/api/comm/iws-cas-core/request/iw-cas-data-store/get-detailed-app',
    getBuildTimeline: '/api/comm/iws-cas-core/request/iw-cas-data-store/get-build-timeline',
    getAppTimeline: "api/comm/iws-cas-core/request/iw-cas-data-store/get-app-timeline"
  }
};

angular.module('apiRoutes', []).constant('API_ROUTES', apiRoutes);
