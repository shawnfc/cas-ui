//TODO: convert to typescript class format.
angular.module('cas.auth').factory('Authentication', ($http, $q, API_ROUTES) => {
    var service = this;
    service.authenticate = (email, password) => {
        var defer = $q.defer();

        // for the sake of the demo this is hard code
        // however this would always be a call to the server.
        email = email.toLowerCase();

        $http.post(API_ROUTES.auth_api.authenticate, {
            username: email,
            password: password
        }, { skipAuthorization: true }).then((data) => {
            if (data.status !== 200)
                defer.reject(data.data);
            else
                defer.resolve(JSON.parse(data.headers().iw_app_user_data));
        }, (data) => {
            defer.reject(data.data);
        });

        return defer.promise;
    };

    return service;
});
angular.module('cas.auth').service('UserService', ($rootScope, store, APP_EVENTS) => {
    var service = this, currentUser = undefined;
    service.setCurrentUser = (newUser?: any) => {

        if (currentUser !== newUser) {
            currentUser = newUser;

            if (currentUser === undefined || currentUser === null)
                store.remove('currentUser');
            else
                store.set('currentUser', currentUser);

            $rootScope.$emit(APP_EVENTS.auth_events.currentUserChanged);
        }
        return currentUser;
    };
    service.getCurrentUser = () => {
        if (!currentUser) {
            currentUser = store.get('currentUser');
        }
        return currentUser;
    };

    service.subscribe = (scope, callback) => {
        var handler = $rootScope.$on(APP_EVENTS.auth_events.currentUserChanged, callback);
        scope.$on('$destroy', handler);
    };

    return service;
});
