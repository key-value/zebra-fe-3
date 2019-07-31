
    export class PlanDto {
        id: number = 0
        beginTime: Date = new Date()
        planName: string = ''
        description: string = ''
        targetId:number = 0
    }
    export class TargetDto {
        id: number = 0;
        targetName: string = "";
        description: string = "";
        PlanList: Array<PlanDto> = new Array();
    }

    export class TaskDto {
        id: number = 0;
        taskTitle: string = "";
        description: string = "";
      }