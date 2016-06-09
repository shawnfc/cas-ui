//namespace cas.module {
'use strict';
interface IScheduleModalController {
  Schedule(): void;
  NextStep(): void;
  Close(): void;
}

class ScheduleModalController implements IScheduleModalController {
  formData:any;
  minDate:any;
  failMessage:boolean;
  focusedTime:boolean;
  schedulerModal:boolean;
  errorMsg:string;
  stepData:any;
  selectedStep:number;
  stepProgress:number;

  constructor(private $scope, private $q, private locals, private spaces, private $mdDialog, private webstoreService:IWebstoreService, private directoryService:IDirectoryService, private scheduleService:IScheduleService) {
    this.schedulerModal = true;
    this.formData = locals.formData;
    this.formData.scheduleType = "now";
    this.formData.scheduleEventDate = null;
    this.locals.directoryTree = [];
    this.locals.spaces = spaces;


    this.selectedStep = 0;
    this.stepProgress = 1;
    this.stepData = [{step: 1, completed: false, optional: false, data: {}},
      {step: 2, completed: false, optional: false, data: {}},
      {step: 3, completed: false, optional: false, data: {}}];

    // this.webstoreService.getPromotedSpaces(this.locals.buildId).then((spaces)=>{
    //     this.locals.spaces = spaces;
    // });
  }

  enableNextStep = function nextStep() {
    //do not exceed into max step
    if (this.selectedStep >= this.stepData.length) {
      return;
    }
    //do not increment vm.stepProgress when submitting from previously completed step
    if (this.selectedStep === this.stepProgress - 1) {
      this.stepProgress = this.stepProgress + 1;
    }
    this.selectedStep = this.selectedStep + 1;
  }

  moveToPreviousStep() {
    if (this.selectedStep > 0) {
      this.selectedStep = this.selectedStep - 1;
    }
  }



  submitCurrentStep(stepData, isSkip) {
    var deferred = this.$q.defer();
    //vm.showBusyText = true;
    console.log('On before submit');

    if(!stepData.completed && !isSkip) {
      if (stepData.step == 1) {
        this.directoryService.getOuTree(this.formData.selectedSpaceId).then((directoryTree) => {
          this.locals.directoryTree = [directoryTree];
        });
        stepData.completed = true;
        this.enableNextStep();
      }
      if (stepData.step == 2) {
        this.formData.targetOrgUnit = this.$scope.tv1.currentNode.orgUnitPath;
        if (this.formData.targetOrgUnit == undefined)
          return;
        //choose a date of today or in the future
        this.minDate = new Date(Date.now());

        //focus time field when time icon is clicked
        this.focusedTime = false;
        // vm.timeFocused = () => {
        //     vm.focusedTime = true;
        // };
        this.failMessage = false;
        //this.displayProgress = false;
        //this.successMessage = false;
        this.enableNextStep();
      }
    }
    else {
      this.enableNextStep();
    }

    //if (!stepData.completed && !isSkip) {
    //  //simulate $http
    //  //$timeout(function () {
    //  //vm.showBusyText = false;
    //  //  console.log('On submit success');
    //  deferred.resolve({status: 200, statusText: 'success', data: {}});
    //  //move to next step when success
    //  stepData.completed = true;
    //  this.enableNextStep();
    //  //}, 1000)
    //} else {
    //  //vm.showBusyText = false;
    //  this.enableNextStep();
    //}
  }


  public Schedule() {
    //this.displayProgress = true;
    //this.failMessage = false;
    //this.schedulerModal = false;
    this.formData.scheduleEventDate = new Date(this.formData.scheduleType == 'now' ? new Date(Date.now() + 6000).toString() : this.formData.scheduleEventDate);

    var newScheduleEventCommand = <IAddNewScheduleEvent>{
      buildId: this.formData.buildId,
      schedulerId: this.formData.userId,
      scheduledDate: this.formData.scheduleEventDate.getTime(),
      orgUnit: this.formData.targetOrgUnit,
      spaceId: this.formData.selectedSpaceId,
      appId: this.formData.appId
    };

    //$timeout(() => {
    this.scheduleService.addSchedule(newScheduleEventCommand)
      .then((res) => {
        this.Close();
        //this.displayProgress = false;
        //this.successMessage = true;
        console.info('You scheduled a new event: ', res);
      })
      .catch((e) => {
        if (e.status === 403)
          this.errorMsg = 'You are not authorized to schedule deployments';
        else
          this.errorMsg = e.data.message;

        //$log.error(e);
      });
    //}, 1000);
  }

  public NextStep() {
    //var wizard = this.WizardHandler.wizard();
    //if (wizard.currentStepNumber() == 1) {
    //  this.directoryService.getOuTree(this.formData.selectedSpaceId).then((directoryTree) => {
    //    this.locals.directoryTree = [directoryTree];
    //  });
    //  wizard.next();
    //}
    //else if (wizard.currentStepNumber() == 2) {
    //  this.formData.targetOrgUnit = wizard.currentStep().$$childHead.tv1.currentNode.orgUnitPath;
    //  if (this.formData.targetOrgUnit == undefined)
    //    return;
    //  //choose a date of today or in the future
    //  this.minDate = new Date(Date.now() - 86400000);
    //
    //  //focus time field when time icon is clicked
    //  this.focusedTime = false;
    //  // vm.timeFocused = () => {
    //  //     vm.focusedTime = true;
    //  // };
    //  this.failMessage = false;
    //  this.displayProgress = false;
    //  this.successMessage = false;
    //}
  }

  public Close() {
    if (!this.failMessage)
      this.$mdDialog.hide();
    else
      this.$mdDialog.cancel();
  }
}

angular.module('casUiServiceApp').controller('ScheduleModalController', ScheduleModalController);
