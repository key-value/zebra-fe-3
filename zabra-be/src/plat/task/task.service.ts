import { Injectable } from '@nestjs/common';
import Task from './task.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder } from 'typeorm';
import { async } from 'rxjs/internal/scheduler/async';


@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) { }

  async get(id: number): Promise<Task> {
    return await this.taskRepository.findOne(id)
  }

  async getAll(): Promise<Task[]> {
    return await this.taskRepository.find({ 
      order: {
          sort: "ASC"
      }
  })
  }

  async getAllByPlanId(planId: number): Promise<Task[]> {
    return await this.taskRepository.find({ planId })
  }

  async getOne(id: number): Promise<Task> {
    return await this.taskRepository.findOne(id)
  }

  async getOneMaxSortNum(id:number): Promise<number> {
    const query = this.taskRepository.createQueryBuilder("task");
    query.select("MAX(task.sort)", "sort");
  query.where("task.planId=:planId",{planId:id});
    // query.addSelect("MAX(quotation.quotationVersion)", "max");
    let task:Task = await query.getRawOne();
    return task.sort;
  }

  async add(name: string, planId: number, description: string) {
    const task = new Task()
    task.taskTitle = name
    task.planId = planId
    task.description = description
    task.sort = await this.getOneMaxSortNum(planId)
    await this.taskRepository.insert(task)
  }


  async updateSort(id: number, sort: number, planId: number) {
    const task = await this.taskRepository.findOne(id)
    if (task == null) {
      throw new Error('Method not implemented.')
    }
    if(planId == task.planId){
      await this.clearSort(sort, task.sort, task.planId)
    }else{
      await this.clearSort(0, task.sort, task.planId)
      await this.clearSort(sort, 0, planId)
    }
    task.sort = sort
    task.planId = planId
    await this.taskRepository.save(task)
  }

  async clearSort(newSort: number, oldSort: number, platId: number) {
    let maxSort: number = 0;
    let minSort: number = 0;
    let filter: String = `planId = :planId`;
    if(newSort == 0 ||oldSort == 0){
      filter += ` and sort >= :minSort`
      minSort = newSort + oldSort;
    }else{
      filter += ` and sort <= :maxSort and sort >= :minSort`
      maxSort = newSort > oldSort ? newSort : oldSort;
      minSort = newSort > oldSort ? oldSort : newSort;
    }
    let queryBuilder = this.taskRepository.createQueryBuilder()
      .update(Task)
    if ((newSort > oldSort||newSort == 0)&&oldSort!=0) {
      queryBuilder = queryBuilder.set({ sort: () => "sort - 1" })
    } else {
      queryBuilder = queryBuilder.set({ sort: () => "sort + 1" })
    }
    await queryBuilder.where(filter, { planId: platId, maxSort: maxSort, minSort: minSort })
      .execute();

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
