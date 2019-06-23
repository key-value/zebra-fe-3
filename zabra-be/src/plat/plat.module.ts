import { Module } from '@nestjs/common';
import { PlanController } from './plan/plan.controller';
import { TaskController } from './task/task.controller';
import { TargetController } from './target/target.controller';
import { StepController } from './step/step.controller';
import { PlanService } from './plan/plan.service';
import { TaskService } from './task/task.service';
import { TargetService } from './target/target.service';
import { StepService } from './step/step.service';

@Module({
  controllers: [PlanController, TaskController, TargetController, StepController],
  providers: [PlanService, TaskService, TargetService, StepService]
})
export class PlatModule {}
