import { BaseModelVm } from './../../shared/base.model'
import { Long, Table, Column, Entity } from 'typeorm'

@Entity()
export default class Task extends BaseModelVm {
  @Column()
  public planId: number
  @Column()
  public taskTitle: string
  @Column()
  public description: string

  @Column()
  public sort: number
}
