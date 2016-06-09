var roleTree = {
  name: 'admin'//,
  //children: [{
  //  name: 'scheduler'
  //}, {
  //  name: 'promoter'
  //}, {
  //  name: 'viewer'
  //}]
};

angular.module('cas.auth').factory('Authorization', (UserService) => {
  var authorize = function (loginRequired, requiredPermissions, permissionCheckType, toParams) {
    var result = 0,
      user = UserService.getCurrentUser(),
      hasPermission = false,
      permission, i;

    permissionCheckType = permissionCheckType || 0;
    if (loginRequired === true && (user === undefined || user === null)) {
      result = 1;
    } else if ((loginRequired === true && user !== undefined) &&
      (requiredPermissions === undefined || requiredPermissions.length === 0)) {
      // Login is required but no specific permissions are specified.
      result = 0;
    } else if (requiredPermissions) {
      //TODO: check permissionsCheckType
      _.each(requiredPermissions, (reqPerm:string) => {
        if (hasPermission) {
          return;
        }

        var isAdminRole = _.find(user.authorization.user.roles, (checkAdminRole:any) => {
          return checkAdminRole.name === roleTree.name;
        });

        if (isAdminRole)
          hasPermission = true;

        else {
          var role = _.find(user.authorization.user.roles, (checkUserRole:any) => {
            return checkUserRole.name === reqPerm.toLowerCase();
          });

          if (!_.isUndefined(role)) {
            if (!_.isUndefined(role.emittedObject) && !_.isUndefined(role.emittedObject.required) && permissionCheckType == 3) {
              if (_.isArray(role.emittedObject.required.properties)) {
                hasPermission = _.every(role.emittedObject.required.properties, (prop:any) => {
                  return toParams[prop.name] === prop.value;
                });
              }
            }
            else {
              hasPermission = true;
            }
          }
          else {
            hasPermission = false;
          }
        }
      });
      result = hasPermission ? 0 : 2;
    }

    return result;
  };

  return {
    authorize: authorize
  };
});

