var mod = angular.module('cas.file', []);
mod.directive('onReadFile', ($parse) => {
  return {
    restrict: 'A',
    link: function (scope, element, attrs:any) {
      var fn = $parse(attrs.onReadFile);

      element.on('change', function (onChangeEvent) {
        var reader = new FileReader();

        reader.onload = function (onLoadEvent:any) {
          scope.$apply(function () {
            fn(scope, {$fileContent: onLoadEvent.target.result});
          });
        };

        var file = (onChangeEvent.srcElement || onChangeEvent.target).files[0];
        if (file.type.indexOf("json") !== -1)
          reader.readAsText(file);
        else
          reader.readAsArrayBuffer(file);
      });
    }
  };
});

mod.controller('credEditorCtrl', ($scope, googleAuthService, $mdToast, $document) => {

  $scope.showContent = function ($fileContent) {
    $scope.content = JSON.parse($fileContent);
  };

  //Toast functionality
  var last = {
    bottom: false,
    top: '78px',
    left: false,
    right: true
  };
  $scope.toastPosition = angular.extend({}, last);
  $scope.getToastPosition = function () {
    sanitizePosition();
    return Object.keys($scope.toastPosition)
      .filter(function (pos) {
        return $scope.toastPosition[pos];
      })
      .join(' ');
  };
  function sanitizePosition() {
    var current = $scope.toastPosition;
    if (current.bottom && last.top) current.top = false;
    if (current.top && last.bottom) current.bottom = false;
    if (current.right && last.left) current.left = false;
    if (current.left && last.right) current.right = false;
    last = angular.extend({}, current);
  }

  $scope.showCustomToast = function () {
    $mdToast.show({
      controller: 'ToastCtrl',
      templateUrl: '../../views/toast.html',
      parent: $document[0].querySelector('#toastBounds'),
      //hideDelay: 6000,
      position: $scope.getToastPosition()
    });
  };

  $scope.uploadFile = () => {

    googleAuthService.setAuthKey($scope.content, $scope.domain).then((res) => {
      $mdToast.show(
        {
          templateUrl: '../../views/toast.html',
          controllerAs: 'vm',
          controller: function(locals){
            this.message = 'The selected key has been established for the domain: ' + locals.domain;
          },
          locals:{
            domain: $scope.domain
          },
          position: $scope.getToastPosition(),
          hideDelay: 10000
        }
      );

      $scope.content = null;
    }).catch((e) => {
      $scope.error = '<md-toolbar>ERROR! There seems to be a problem with your file upload. Please try again. ' + e.message + '</md-toolbar>';
    });
  };

  $scope.closeError = ()=> {
    $scope.msg = null;
  };

  $scope.cancelUpload = function () {
    $scope.content = null;
  };
});

