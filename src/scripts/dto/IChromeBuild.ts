namespace Dto {
    export interface IChromeBuild {
        appId: string;
        buildId: string;
        version: string;
        space?: string;
        spaceId: string;
        committerId?: string;
        commitId?: string;
        commitUrl?: string;
        buildTs?: number;
        buildDuration?: number;
        updateUrl?: string;
    }
}