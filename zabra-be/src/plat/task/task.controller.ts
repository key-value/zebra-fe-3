import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CreateTaskDto } from './task.dto';
import Task from './task.model';

@ApiUseTags('task')
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
  ) { }

  @Get(`:id`)
  async getOne(@Param('id') id: number): Promise<Task> {
    return await this.taskService.get(id)
  }
  @Get()
  async getAll(): Promise<Task[]> {
    return await this.taskService.getAll()
  }

  @Post()
  async add(@Body() body: CreateTaskDto) {
    await this.taskService.add(body.taskTitle, body.planId, body.description)
  }

  @Put(':id/planId/:planId/sort/:num')
  async updateSort(@Param('id') id: number, @Param('planId') planId: number, @Param('num') num: number) {
    await this.taskService.updateSort(id, +num, planId)
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: CreateTaskDto) {
    await this.taskService.update(id, body.taskTitle, body.planId, body.description)
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.taskService.delete(id)
  }
}
