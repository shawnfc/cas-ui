namespace cas.module {
    'use strict';
    interface IPromotionModalController {
        Promote(): void;
        Cancel(): void;
    }

    class PromotionModalController implements IPromotionModalController {
        selectedSpaceId: string;

        constructor(private locals, private promotedSpaces, private spaces: Dto.IChromeSpace[], private $mdDialog, private promotionService: IPromotionService) {
        }

        public Promote() {
            this.promotionService.promoteBuild({ buildId: this.locals.build.buildId, toSpaceId: this.selectedSpaceId }).then((res) => {
                this.$mdDialog.cancel();
            }).catch((e) => {
                console.log(e);
            });
        }

        public Cancel() {
            this.$mdDialog.cancel();
        }
    }

    angular.module('casUiServiceApp').controller('PromotionModalController', PromotionModalController);
}