import { Injectable } from '@nestjs/common';
import Task from './task.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class TaskService {
    constructor(
      @InjectRepository(Task)
      private readonly taskRepository: Repository<Task>,
    ) {}

    async get(id: number): Promise<Task> {
      return await this.taskRepository.findOne(id)
    }

    async getAll(): Promise<Task[]> {
      return await this.taskRepository.find()
    }

    async getAllByPlanId(planId: number): Promise<Task[]> {
      return await this.taskRepository.find({planId})
    }

    async getOne(id: number): Promise<Task> {
      return await this.taskRepository.findOne(id)
    }

    async getOneMaxSortNum(): Promise<number> {
      const query = this.taskRepository.createQueryBuilder("task");
      query.select("MAX(task.sort)", "max");
      // query.addSelect("MAX(quotation.quotationVersion)", "max");
      return await query.getRawOne();
    }

    async add(name: string, planId: number, description: string) {
      const task = new Task()
      task.taskTitle = name
      task.planId = planId
      task.description = description
      task.sort = await this.getOneMaxSortNum()
      await this.taskRepository.insert(task)
    }


    async updateSort(id: number, sort: number, planId:number) {
      const task = await this.taskRepository.findOne(id)
      if (task == null) {
        throw new Error('Method not implemented.')
      }
      task.sort = sort
      task.planId = planId
      await this.taskRepository.save(task)
    }

    async update(id: number, name: string, planId: number, description: string) {
      const target = await this.taskRepository.findOne(id)
      if (target == null) {
        throw new Error('Method not implemented.')
      }
      target.taskTitle = name
      target.planId = planId
      target.description = description
      await this.taskRepository.save(target)
    }

    async delete(id: any) {
      const target = await this.taskRepository.findOne(id)
      if (target == null) {
        return
      }
      await this.taskRepository.remove(target)
    }
  }
