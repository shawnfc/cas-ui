/// <reference path="../../../typings/master.d.ts" />
/// <reference path="log-service.ts"/>

interface IRole {
    emittedObject: any,
    name: string,
    userRoleId: string
}

interface IUsableRole {
    userRoleId: string,
    name?: string,
    appId?: string,
    spaceId?: string
}

interface IAddNewUserRole {
    username: string;
    role: string;
    appId?: string;
    spaceId?: string;
}

interface IUser {
    username: string,
}


interface IUserRolesService {
    getUserRoles(userId: string): ng.IPromise<IUsableRole[]>;
    getUsers(username: string): ng.IPromise<IUser[]>
    saveUserRole(newUserRole: IAddNewUserRole): ng.IPromise<any>;
    deleteUserRole(userRoleId: string): ng.IPromise<any>;
}

class UserRolesService implements IUserRolesService {
    constructor(private $http: ng.IHttpService, private $q: ng.IQService, private $log: HttpLogger, private API_ROUTES) { }

    getUserRoles(username: string): angular.IPromise<IUsableRole[]> {
        var deferred = this.$q.defer();
        //this.$log.info('ScheduleService > addSchedule: ', schedule);
        this.$http.post(this.API_ROUTES.users_api.getUserRoles, { username: username })
            .then((response: ng.IHttpPromiseCallbackArg<IRole[]>) => {
                deferred.resolve(this.ConvertUserRoles(response.data));
            })
            .catch((e: Error) => {
                this.$log.error(e.message, e.name);
                deferred.reject(e);
            });

        return deferred.promise;
    }

    private ConvertUserRoles(userRoles: IRole[]): IUsableRole[] {
        var result = _.map(userRoles, (role: IRole) => {
            var appId = undefined;
            var spaceId = undefined;

            if (role.emittedObject) {
                appId = _.find(role.emittedObject.required.properties, (prop: any) => {
                    return prop.name === "appId";

                });

                spaceId = _.find(role.emittedObject.required.properties, (prop: any) => {
                    return prop.name === "spaceId";
                });
            }


            var temp = <IUsableRole>{
                userRoleId: role.userRoleId,
                name: role.name,
                appId: appId ? appId.value : undefined,
                spaceId: spaceId ? spaceId.value : undefined
            }

            return temp;
        })
        return result;
    }

    getUsers(username: string): angular.IPromise<IUser[]> {
        var deferred = this.$q.defer();

        this.$http.post(this.API_ROUTES.users_api.findUsers, { username: username })
            .then((response: ng.IHttpPromiseCallbackArg<IUser[]>) => {
                deferred.resolve(response.data);
            })
            .catch((e: Error) => {
                this.$log.error(e.message, e.name);
                deferred.reject(e);
            });

        return deferred.promise;
    }

    saveUserRole(newUserRole: IAddNewUserRole): angular.IPromise<any> {
        var deferred = this.$q.defer();

        this.$http.post(this.API_ROUTES.users_api.saveUserRole, newUserRole)
            .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                deferred.resolve(response.data);
            })
            .catch((e: Error) => {
                this.$log.error(e.message, e.name);
                deferred.reject(e);
            });

        return deferred.promise;
    }

    deleteUserRole(userRoleId: string): angular.IPromise<any> {
        var deferred = this.$q.defer();

        this.$http.post(this.API_ROUTES.users_api.deleteUserRole, { userRoleId: userRoleId })
            .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                deferred.resolve(response.data);
            })
            .catch((e: Error) => {
                this.$log.error(e.message, e.name);
                deferred.reject(e);
            });

        return deferred.promise;
    }
}

angular.module('casUiServiceApp').service('userRolesService', UserRolesService);
