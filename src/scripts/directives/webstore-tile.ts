/// <reference path="../../../typings/master.d.ts" />
'use strict';

interface IChromeApp {
  appId: string;
  appName: string;
  description: string;
  defaultSpaceId: string;
  image: any;
}

interface IWebstoreTileScope {
  Tile: IChromeApp
}

class WebstoreTileController implements IWebstoreTileScope {
  Tile:any;
  stateService:ng.ui.IStateService;
  img:string;

  // static $inject = ['$state', '$scope'];
  constructor($state:ng.ui.IStateService, public $scope:any) {
    $scope.vm = this;
    this.stateService = $state;
    this.Tile = $scope.tile;
    this.img = '../images/thdManagement-220x140.png';
    this.loadImg();
  }

  private loadImg = () => {
    var data = null;
    if (this.Tile.image) {
      if (!this.Tile.image.data) {
        this.img = this.Tile.image;
        return;
      }
      var blob = new Blob([new Uint8Array(this.Tile.image.data)], {type: 'image/png'});
      this.img = URL.createObjectURL(blob);
    }
  }
}

/**
 * @ngdoc directive
 * @name casUiServiceApp.directive:webstoreTile
 * @description
 * # webstoreTile
 */
angular.module('casUiServiceApp').directive('webstoreTile', function ():ng.IDirective {
  return {
    templateUrl: 'views/webstore-tile-small.html',
    restrict: 'E',
    scope: {
      tile: '='
    },
    controller: WebstoreTileController,
    controllerAs: "vm"
  };
});
