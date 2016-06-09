namespace cas.module {
    export abstract class BaseController{
        ClickElement(id: string){
            document.getElementById(id).click();
        }
    }
}