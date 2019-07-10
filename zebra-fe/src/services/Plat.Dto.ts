
    export class PlanDto {
        id: number = 0
        beginTime: Date = new Date()
        planName: string = ''
        description: string = ''
    }
    export class TargetDto {
        id: number = 0;
        targetName: string = "";
        description: string = "";
    }

    export class TaskDto {
        id: number = 0;
        taskTitle: string = "";
        description: string = "";
      }