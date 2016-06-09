angular.module('cas.modals', ['ngMaterial']).service('loginModal', function ($mdDialog, $rootScope, $q) {
  var show = function(title, content) {
    var defer = $q.defer();
    $mdDialog.show(
      $mdDialog.alert({
        title: content,
        ok: 'Ok'
      })
    ).then(()=>{
      defer.resolve();
    });

    return defer.promise;
  };

  return {show: show};
});
