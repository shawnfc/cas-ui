angular.module('cas.menu', ['ngMaterial', 'ui.router', 'sasrio.angular-material-sidenav']).config((ssSideNavSectionsProvider, $mdThemingProvider) => {
  ssSideNavSectionsProvider.initWithTheme($mdThemingProvider);
  ssSideNavSectionsProvider.initWithSections([
    {
      id: 'cas_link',
      name: 'Chrome App Server',
      type: 'toggle',
      pages: [{
        id: 'webstore_link',
        name: 'Applications',
        state: 'common.webstore.apps',
        type: 'link'
        //icon: 'fa fa-code'
      }]
    },
    {
      id: 'cas_management',
      name: 'Management',
      type: 'toggle',
      //icon: 'fa fa-cogs',
      pages: [
        {
          id: 'cred_editor',
          name: 'Credential Editor',
          type: 'link',
          //icon: 'fa fa-pencil-square-o',
          state: 'common.admin.credentials'
        },
        {
          id: 'roles_management',
          name: 'User Roles Management',
          type: 'link',
          //icon: 'fa fa-users',
          state: 'common.admin.user-roles'
        }
        // ,
        //{
        //  id: 'new_app',
        //  name: 'Setup New Application',
        //  type: 'link',
        //  //icon: 'fa fa-cogs',
        //  state: 'common.admin.create-app',
        //  visible: false
        //}
      ]
    },
    {
      id: 'cas_link',
      name: 'Sign Out',
      type: 'link',
      visible: true,
      icon: 'fa fa-sign-out',
      state: 'logout'
    }
  ]);
});
