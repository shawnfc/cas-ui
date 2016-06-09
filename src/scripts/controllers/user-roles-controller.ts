//namespace cas.module {
'use strict';
interface IUserRolesController {
    findUsers(searchTerm: string): void;
    getUserRoles(user: string): void;
    getAppName(appId: string): void;
    getSpaceName(spaceId: string): void;
    saveUserRole(): void;
    removeUserRole(userRoleId: string): void;
}

class UserRolesController implements IUserRolesController {
    userRoles: any;
    user: any;
    newUserRole: any;
    last: any;
    toastPosition: any;
    readOnly: boolean;

    constructor(private roles, private apps, private spaces, private $q: ng.IQService, private UserService, private userRolesService: IUserRolesService, private $mdToast) {
        this.userRoles = [];
        this.user = null;
        this.newUserRole = null;
        this.readOnly = true;

        this.last = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };
    }

    findUsers = (searchTerm: string) => {
        var deferred = this.$q.defer();
        this.userRolesService.getUsers(searchTerm).then((res) => {
            var currentUser = this.UserService.getCurrentUser();
            var result = _.filter(res, (user: IUser) => {
                return user.username !== currentUser.username;
            });
            deferred.resolve(result);
        });
        return deferred.promise;
    };

    getUserRoles = (user) => {
        this.userRolesService.getUserRoles(user).then((res) => {

            var groupedUserRoles = _.groupBy(res, 'name');

            var data = _.map(groupedUserRoles, function(group: any) {
                return {
                    name: group[0].name,
                    elements: group
                }
            });

            this.userRoles = data;
        });
    };

    getAppName = (appId) => {
        var result = _.find(this.apps, (app: any) => {
            return app.appId === appId;
        })
        if (result !== undefined)
            return result.appName;
        return "All Apps";
    }

    getSpaceName = (spaceId) => {
        var result = _.find(this.spaces, (space: any) => {
            return space.spaceId === spaceId;
        });
        if (result !== undefined)
            return result.name;
        return "All Spaces";
    }

    saveUserRole = () => {
        var userRole = {
            username: this.user.username,
            role: this.newUserRole.role.toLowerCase(),
            appId: this.newUserRole.appId,
            spaceId: this.newUserRole.spaceId
        };

        this.userRolesService.saveUserRole(userRole).then((res) => {
            console.log("userRole Saved");
            this.showToast("Your new role has been saved!");    
            this.newUserRole = null;
            this.getUserRoles(this.user.username);
        });
    }

    removeUserRole = (userRoleId) => {
        this.userRolesService.deleteUserRole(userRoleId).then((res) => {
            this.showToast("Your role has been removed!");
            this.getUserRoles(this.user.username);
        });
    };
    
    private showToast(message: string){
        this.$mdToast.show(
                this.$mdToast.simple()
                    .content(message)
                    .position(this.getToastPosition())
                    .hideDelay(3000)
            );
    }

    private getToastPosition() {
        this.toastPosition = angular.extend({}, this.last);
        var toastPos = this.toastPosition;
        return Object.keys(this.toastPosition)
            .filter(function(pos) { return toastPos[pos]; })
            .join(' ');
    };
}

angular.module('casUiServiceApp').controller('UserRolesController', UserRolesController);