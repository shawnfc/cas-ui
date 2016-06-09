namespace Dto {
  export interface IOrgUnit {
    name: string,
    orgUnitPath: string,
    orgUnitId: string,
    parentOrgUnitPath?: string,
    parentOrgUnitId?:string,
    children?: IOrgUnit[]
  }
}
