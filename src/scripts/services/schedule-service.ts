/// <reference path="../../../typings/master.d.ts" />
/// <reference path="log-service.ts"/>
/// <reference path="../dto/IScheduleEvent.ts"/>

import IScheduleEvent = Dto.IScheduleEvent;

interface IAddNewScheduleEvent {
  buildId: string;
  schedulerId: string;
  scheduledDate: number;
  spaceId: string;
  orgUnit: string;
}

interface IUpdateScheduleEvent {
  scheduleEventId: string;
  schedulerId: string;
  scheduledDate: number;
  spaceId: string;
  orgUnit: string;
}

interface IScheduleService {
  addSchedule(schedule: IScheduleEvent):ng.IPromise<IScheduleEvent>;
  getSchedule(scheduleId: string):ng.IPromise<IScheduleEvent>;
  getScheduleEvents(buildId: string): ng.IPromise<IScheduleEvent[]>;
}

class ScheduleService implements IScheduleService {
  constructor(private $http:ng.IHttpService, private $q:ng.IQService, private $log: HttpLogger, private API_ROUTES) { }

  addSchedule(schedule: IAddNewScheduleEvent): angular.IPromise<IScheduleEvent> {
    var deferred = this.$q.defer();
    this.$log.info('ScheduleService > addSchedule: ', schedule);
    this.$http.post(this.API_ROUTES.schedule_api.newScheduleEvent, schedule)
      .then((response:ng.IHttpPromiseCallbackArg<IScheduleEvent>)=> {
        deferred.resolve(response.data);
      })
      .catch ((e:Error)=> {
        this.$log.error(e.message, e.name);
        deferred.reject(e);
      });

    return deferred.promise;
  }

  updateSchedule(scheduleEvent: IUpdateScheduleEvent):angular.IPromise<IScheduleEvent> {
    var deferred = this.$q.defer();
    this.$log.info('ScheduleService > updateScheduleEvent: ', scheduleEvent);
    this.$http.post(this.API_ROUTES.schedule_api.updateScheduleEvent, scheduleEvent)
      .then((response:ng.IHttpPromiseCallbackArg<IScheduleEvent>)=> {
        deferred.resolve(response.data);
      }, (e:Error)=> {
        this.$log.error(e.message, e.name);
        deferred.reject(e);
      });

    return deferred.promise;
  }

  getSchedule(scheduleId:string):angular.IPromise<IScheduleEvent> {
    var deferred = this.$q.defer();
    this.$log.info('ScheduleService > getSchedule: ', scheduleId);
    this.$http.post(this.API_ROUTES.schedule_api.getSchedule, {scheduleId: scheduleId})
      .then((response:ng.IHttpPromiseCallbackArg<IScheduleEvent>)=> {
        deferred.resolve(response.data);
      }, (e:Error)=> {
        this.$log.error(e.message, e.name);
        deferred.reject(e);
      });

    return deferred.promise;
  }

  getScheduleEvents(buildId:string):angular.IPromise<IScheduleEvent[]> {
    var deferred = this.$q.defer();
    this.$log.info('ScheduleService > getBuildSchedules: ', buildId);
    this.$http.post(this.API_ROUTES.schedule_api.getBuildSchedules, {buildId: buildId})
      .then((response:ng.IHttpPromiseCallbackArg<IScheduleEvent[]>)=> {
        deferred.resolve(response.data);
      }, (e:Error)=> {
        this.$log.error(e.message, e.name);
        deferred.reject(e);
      });

    return deferred.promise;
  }

}

angular.module('casUiServiceApp').service('scheduleService', ScheduleService);
