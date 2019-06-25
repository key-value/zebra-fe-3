import { Module } from '@nestjs/common';
import { PlanController } from './plan/plan.controller';
import { TaskController } from './task/task.controller';
import { TargetController } from './target/target.controller';
import { StepController } from './step/step.controller';
import { PlanService } from './plan/plan.service';
import { TaskService } from './task/task.service';
import { TargetService } from './target/target.service';
import { StepService } from './step/step.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import Plan from './plan/plan.model';
import Target from './target/target.model';
import Task from './task/task.model';
import Step from './step/step.model';

@Module({
  imports: [TypeOrmModule.forFeature([Plan,Target,Task,Step])],
  controllers: [PlanController, TaskController, TargetController, StepController],
  providers: [PlanService, TaskService, TargetService, StepService]
})
export class PlatModule {}
