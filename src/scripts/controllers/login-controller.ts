/**
 * LoginController
 * @namespace thinkster.authentication.controllers
 */
(function () {
  'use strict';

  angular
    .module('casUiServiceApp')
    .controller('LoginController', LoginController);

 // LoginController.$inject = ['$location', '$scope', 'Authentication', 'store'];

  /**
   * @namespace LoginController
   */



  function LoginController($location, $scope, Authentication, UserService) {
    var vm = this;
    vm.isBusy = false;
    vm.login = login;

    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf thinkster.authentication.controllers.LoginController
     */
    function activate() {
      // If the user is authenticated, they should not be here.
      if (UserService.getCurrentUser() !== null) {
        $location.url('/');
      }
    }

    /**
     * @name login
     * @desc Log the user in
     * @memberOf thinkster.authentication.controllers.LoginController
     */
    function login() {
      vm.isBusy = true;
      Authentication.authenticate(vm.email, vm.password).then((user)=> {
        UserService.setCurrentUser(user);
        $location.path('/');
      }, ()=> {
        vm.invalidLogin = true;
        vm.isBusy = false;
      });
    }
  }
})();


