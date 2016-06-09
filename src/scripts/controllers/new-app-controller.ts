namespace cas.module {
    'use strict';
    interface INewAppController {
        NewChromeApp(): void;
        ShowContent(fileContent): void;
        ResetForm(): void;
        Cancel(): void;
    }

    class NewAppController extends BaseController implements INewAppController {
        fileLoaded: boolean;
        app: IChromeApp;
        base64Image: string;
        error: string;

        constructor(private spaces: Dto.IChromeSpace[], private JSZipUtil, private $mdDialog, private webstoreService: IWebstoreService) {
            super();
            this.fileLoaded = false;
        }

        public NewChromeApp() {
            var chromeApp = {
                appName: this.app.appName,
                defaultSpaceId: this.app.defaultSpaceId,
                image: this.base64Image,
                description: this.app.description
            };
            this.webstoreService.newChromeApp(chromeApp).then((res) => {
                console.log(res);
                this.$mdDialog.hide(res);
            }).catch(e => {
                console.error(e);
                this.$mdDialog.cancel();
            });
        }

        private LoadImg(buffer){
            var view = new Uint8Array(buffer);
            var blob = new Blob([view], { type: "image/png" });
            this.app.image = URL.createObjectURL(blob);
            this.base64Image = btoa(String.fromCharCode.apply(null, view));
        };

        public ResetForm() {
            this.fileLoaded = false;
            this.app = {
                appId: null,
                appName: "Untitled App",
                description: null,
                defaultSpaceId: null,
                image: null
            };
        };

        public ShowContent = (fileContent) => {
            var manifest = this.JSZipUtil.extractAndParseZip(fileContent, 'manifest.json');
            if (manifest == null)
                this.error = "Unable to locate a valid manifest.json";
            else {
                var buffer = this.JSZipUtil.extractAndParseZip(fileContent, manifest.icons['128']);
                this.LoadImg(buffer)
                this.app.appName = manifest.name;
                this.app.description = manifest.description;
                this.fileLoaded = true;
            }
        };

        public Cancel() {
            this.$mdDialog.cancel();
        }
    }

    angular.module('casUiServiceApp').controller('NewAppController', NewAppController);
}