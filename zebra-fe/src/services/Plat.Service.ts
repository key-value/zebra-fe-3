import { PlanDto,TargetDto } from './plat.Dto';
import axios from 'axios'

module PlatModule {
    export class PlanService {
        async getPlanList() {
            return await axios.get('/api/plan')
        }

        async createPlan(planDto: PlanDto) {
            if (planDto.id === 0) {
                await axios.post('/api/plan', planDto)
            } else {
                await axios.put(`/api/plan/${planDto.id}`, planDto)
            }
        }

        async handleDelete(planDto: PlanDto) {
            await axios.delete(`/api/plan/${planDto.id}`)
        }
    } 
    export class TargetService {
        async getTargetList() {
            return await axios.get('/api/target/all')
        }

        async createTarget(targetDto: TargetDto) {
            if (targetDto.id === 0) {
                await axios.post('/api/target', targetDto)
            } else {
                await axios.put(`/api/target/${targetDto.id}`, targetDto)
            }
        }

        async DeleteTarget(targetDto: TargetDto) {
            await axios.delete(`/api/target/${targetDto.id}`)
        }
    } 

}