import { Injectable, HttpException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import Target from './target.model';

@Injectable()
export class TargetService {
  constructor(
    @InjectRepository(Target)
    private readonly targetRepository: Repository<Target>,
  ) {}

   async getAll(): Promise<Target[]> {
    return await this.targetRepository.find()
  }

  async add(name: string, description?: string) {
    const target = new Target()
    target.targetName = name
    target.description = description
    target.state = 0
    await this.targetRepository.insert(target)
  }

  async update(id: number, name: string , description: string){
    const target = await this.targetRepository.findOne(id)
    if (target == null){
      throw new Error('Method not implemented.')
    }
    target.targetName = name
    target.description = description
    await this.targetRepository.save(target)
  }

  async delete(id: any) {
    const target = await this.targetRepository.findOne(id)
    if (target == null){
      return
    }
    await this.targetRepository.remove(target)
  }
}
