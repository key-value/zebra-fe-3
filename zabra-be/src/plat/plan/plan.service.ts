import { Injectable } from '@nestjs/common';
import Plan from './plan.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelUtility } from 'src/common/model.utility';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  async get(id: number): Promise<Plan> {
    return await this.planRepository.findOne(id)
  }

  async getAll(): Promise<Plan[]> {
    return await this.planRepository.find()
  }

  async getAllbyTargetId(targetId: number): Promise<Plan[]> {
    return await this.planRepository.find({ targetId})
  }

  async add(plat: Plan) {
    plat.expected = ''
    plat.expectedNumber = 0
    await this.planRepository.insert(plat)
  }

  async update(id: number, newPlan: Plan) {
    let plan = await this.planRepository.findOne(id)
    if (plan == null) {
      throw new Error('Method not implemented.')
    }
    plan = ModelUtility.merge(plan, newPlan)
    await this.planRepository.save(plan)
  }

  async delete(id: any) {
    const plat = await this.planRepository.findOne(id)
    if (plat == null) {
      return
    }
    await this.planRepository.remove(plat)
  }
}
