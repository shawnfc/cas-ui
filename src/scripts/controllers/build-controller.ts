interface IQuery {
  order: string,
  limit: number,
  page: number
}

interface IBuildController {
  OnPaginate(query:IQuery, page:number, limit:number): void;
  OnReorder(query:IQuery, order:string): void;
  ShowScheduleDialog(ev:any, build:IChromeBuild): void;
  ShowTimeline(ev:any, build:IChromeBuild): void;
  ShowPromotionDialog(ev:any, build:IChromeBuild): void;
  IsPast(time): boolean;
}

class BuildController implements IBuildController {
  query:IQuery;
  adQuery:IQuery;
  buildsList:IChromeBuild[];
  appDetails:any;
  appEvents:any;
  timelineData:any;
  img:string = "";

  constructor(private appId:string, private $mdDialog:any, private webstoreService:IWebstoreService) {
    this.query = {order: '', limit: 5, page: 1};
    this.adQuery = {order: '', limit: 5, page: 1};
    this.GetBuilds(this.query);
    this.GetAppDetails();
  };

  private loadImg = () => {
    if (this.appDetails.image) {
      var bytes = this.appDetails.image;
      if (bytes.data != undefined) {
        var blob = new Blob([new Uint8Array(this.appDetails.image.data)], {type: 'image/png'});
        this.img = URL.createObjectURL(blob);
      }
      else
        this.img = bytes;
    }
  };

  public IsPast(time) {
    return Date.now() > time;
  }

  public OnReorder = (query, order) => {
    angular.extend({}, query, {order: order});
  };

  public OnPaginate = (query, page, limit) => {
    angular.extend({}, query, {page: page, limit: limit});
  };

  public GetAppDetails() {
    this.webstoreService.getAppDetails(this.appId).then((data) => {
      this.appDetails = data;
      this.loadImg();
    });
  };

  //Query is only used if the remote pagination is enabled.
  private GetBuilds(query) {
    this.webstoreService.getBuildPackages(this.appId).then((buildsList) => {
      this.Success(buildsList);
    });
  };

  private Success(buildsList:IChromeBuild[]) {
    this.buildsList = buildsList;
  };

  public ShowTimeline(build:IChromeBuild) {
    this.$mdDialog.show({
      controller: function (timeline, $mdDialog) {
        // this.timeline = _.map(timeline, (event) =>{
        //     return angular.extend({}, this.query, {})
        // })
        this.timeline = timeline;
        this.Cancel = function () {
          console.log('cancel');
          $mdDialog.cancel();
        }
      },
      controllerAs: 'vm',
      templateUrl: 'views/timeline-modal.html',
      resolve: {
        timeline: (webstoreService:IWebstoreService) => {
          return webstoreService.getBuildTimeline(build.buildId);
        }
      },
      clickOutsideToClose: true
    })
  }

  public ShowScheduleDialog(ev, build:IChromeBuild) {
    this.$mdDialog.show({
        controller: 'ScheduleModalController',
        controllerAs: 'vm',
        templateUrl: 'views/scheduler-modal.html',
        locals: {
          appName: this.appDetails.appName,
          buildVersion: build.version,
          formData: {buildId: build.buildId, appId: build.appId, userId: 'axd8012'}
        },
        resolve: {
          spaces: (webstoreService:IWebstoreService) => {
            return webstoreService.getPromotedSpaces(build.buildId);
          }
        },
        targetEvent: ev,
        clickOutsideToClose: false
      })
      .then((answer) => {
        this.GetAppDetails();
        this.GetBuilds(this.query);
    });
  };

  public ShowPromotionDialog(ev, build:IChromeBuild) {
    this.$mdDialog.show({
        controller: 'PromotionModalController',
        controllerAs: 'vm',
        templateUrl: 'views/promotion-modal.html',
        locals: {
          build: build
        },
        resolve: {
          spaces: (webstoreService:IWebstoreService) => {
            return webstoreService.getNonPromotedSpaces(build.buildId);
          },
          promotedSpaces: (webstoreService:IWebstoreService) => {
            return webstoreService.getPromotedSpaces(build.buildId);
          }
        },
        targetEvent: event,
        clickOutsideToClose: false
      })
      .then((answer) => {
        console.log(answer);
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

angular.module('casUiServiceApp').controller('BuildController', BuildController);
