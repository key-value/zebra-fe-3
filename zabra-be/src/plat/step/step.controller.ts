import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import Step from './step.model';
import { ModelUtility } from '../../common/model.utility';
import { CreateStepDto } from './step.dto';
import { StepService } from './step.service';

@ApiUseTags('step')
@Controller('step')
export class StepController {
    constructor(
      private readonly stepService: StepService,
    ) {}

    @Get(`:id`)
    async getOne(@Param('id')id: number): Promise<Step> {
      return await this.stepService.get(id)
    }

    @Get()
    async getAll(): Promise<Step[]> {
      return await this.stepService.getAll()
    }

    @Post()
    async add(@Body() body: CreateStepDto) {
       const step = ModelUtility.merge(new Step(), body)
       await this.stepService.add(step)
    }
    @Put(':id')
    async update(@Param('id') id: number, @Body() body: CreateStepDto) {
        let step = await this.stepService.getOne(id)
        step = ModelUtility.merge(step, body)
        await this.stepService.update(step)
    }
    @Delete(':id')
    async delete(@Param('id') id: number){
      await this.stepService.delete(id)
    }
  }
