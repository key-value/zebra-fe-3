
    export class PlanDto {
        id: number = 0
        beginTime: Date = new Date()
        planName: string = ''
        description: string = ''
        targetId:number = 0
        taskList: Array<TaskDto> = new Array();
        addTask = false;
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
        planId: number = 0;
        sort: number=0;
      }

         export class StepDto {
        id: number = 0;
        taskTitle: string = "";
        description: string = "";
      }