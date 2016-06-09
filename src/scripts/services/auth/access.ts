 angular.module('cas.auth').directive('access', (Authorization) =>{
      return {
        restrict: 'A',
        link: function (scope, element, attrs: any) {
          var makeVisible = function () {
              element.removeClass('hidden');
              element.removeAttr('hidden');
              element.removeClass('disabled');
              element.removeAttr('disabled');
            },
            makeDisabled = function () {
              element.addClass('disabled');
              element.attr('disabled','disabled');
            },
            makeHidden = function () {
              element.addClass('hidden');
              element.attr('hidden','');
            },
            determineVisibility = function (resetFirst) {
              var result;
              if (resetFirst) {
                makeVisible();
              }
              console.log(attrs.permission);
              result = Authorization.authorize(true, roles, attrs.accessPermissionType, attrs.permission ? JSON.parse(attrs.permission) : {});

              if (result === 0)
                makeVisible();
              else if (element[0].localName == "button")
                makeDisabled();
              else
                makeHidden();
            },
            roles = attrs.access.replace(' ','').split(',');

          if (roles.length > 0) {
            determineVisibility(true);
          }
        }
      };
    });
 angular.module('cas.auth').directive('user', (UserService) =>{
   return {
     restrict: 'EA',
     scope: {
       greetings: '@'
     },
     link: function (scope: any, element) {
       var user = UserService.getCurrentUser();
       if(user !== undefined && user !== null)
        element.html(scope.greetings + ' ' + (user.fullname != undefined ? user.fullname : user.username));
     }
   };
 });

 //angular.module('cas.auth').directive('userRoles', (Authentication) =>{
 //  return {
 //    restrict: 'A',
 //    link: function (scope: any, element, attrs) {
 //      var user = Authentication.getCurrentLoginUser();
 //      if(user!== undefined)
 //        element.html();
 //    }
 //  };
 //});
