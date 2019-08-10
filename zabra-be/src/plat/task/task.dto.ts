import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'

export class CreateTaskDto {

  @ApiModelProperty()
  id: number

  @ApiModelProperty({ required: true })
  taskTitle: string

  @ApiModelPropertyOptional()
  planId: number

  @ApiModelPropertyOptional() description?: string
}