var appEvents = {
  auth_events: {
    currentUserChanged: 'CURRENT_USER_CHANGED'
  },
  state_events:{
    stateChangeStart: '$stateChangeStart',
    stateChangeSuccess: '$stateChangeSuccess'
  }
};

angular.module('appEvents', []).constant('APP_EVENTS', appEvents);
