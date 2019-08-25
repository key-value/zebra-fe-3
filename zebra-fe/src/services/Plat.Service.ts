import { PlanDto, TargetDto, TaskDto,StepDto } from './plat.Dto';
import axios from 'axios'

export class PlanService {
    async getPlanList() {
        const v = await axios.get('/api/plan')
        return [...v.data];
    }

    async updatePlan(planDto: PlanDto) {
        if (planDto.id === 0) {
            await axios.post('/api/plan', planDto)
        } else {
            await axios.put(`/api/plan/${planDto.id}`, planDto)
        }
    }

    async handleDelete(id: number) {
        await axios.delete(`/api/plan/${id}`)
    }
}
export class TargetService {
    async getTargetList() {
        const v = await axios.get('/api/target/all')
        return [...v.data];
    }

    async updateTarget(targetDto: TargetDto) {
        if (targetDto.id === 0) {
            await axios.post('/api/target', targetDto)
        } else {
            await axios.put(`/api/target/${targetDto.id}`, targetDto)
        }
    }

    async deleteTarget(id: number) {
        await axios.delete(`/api/target/${id}`)
    }
}
    
export class TaskService {
    async getTaskList() {
        const v = await axios.get("/api/task");
        return [...v.data];
    }

    async updateTask(taskDto: TaskDto) {
        if (taskDto.id === 0) {
            await axios.post('/api/task', taskDto)
        } else {
            await axios.put(`/api/task/${taskDto.id}`, taskDto)
        }
    }

    async deleteTask(id: number) {
        await axios.delete(`/api/task/${id}`)
    }

    async moveTask(id: number,platId:number,sort:number){
        await axios.put(`/task/${id}/planId/${platId}/sort/${sort}`)
    }
} 
    
export class StepService {
    async getStepList() {
        const v = await axios.get("/api/step");
        return [...v.data];
    }

    async updateStep(stepDto: StepDto) {
        if (stepDto.id === 0) {
            await axios.post('/api/step', stepDto)
        } else {
            await axios.put(`/api/step/${stepDto.id}`, stepDto)
        }
    }

    async deleteStep(id: number) {
        await axios.delete(`/api/step/${id}`)
    }
} 
