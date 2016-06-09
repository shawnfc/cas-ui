namespace Dto {
  export interface IScheduleEvent {
    scheduleEventId?: string;
    buildId: string;
    schedulerId: string;
    scheduledDate: number;
    spaceId: string;
    orgUnit: string;
  }
}
