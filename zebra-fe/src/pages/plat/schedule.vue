<template>
  <div class="nav_main">
    <div class="nav_mine">
      <div class="nav_item" v-for="(item, index) in planList" :key="index">
        <div class="card_info">
          <div class="card_header">
            <div>{{item.planName}}</div>
          </div>

          <ul class="card_body">
            <draggable
              class="dragArea list-group"
              :list="item.taskList"
              :group="{ name: 'people'+item.id, put: true }"
              :key="index" @change="changeItem"
            >
              <li class="list_card_details" v-for="(task, sindex) in item.taskList" :key="sindex">
                <div class="list_card_title">{{task.taskTitle}}</div>
              </li>
            </draggable>
          </ul>
          <div class="card_floor">1111</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Draggable from "vuedraggable";
import { formatDate } from "@/common/dateUtility";
import { ModelUtility } from "@/common/model.utility";
import { Message } from "element-ui";
import { Component } from "vue-property-decorator";
import Vue from "vue";
import midPage from "@/components/midPage.vue";
import { PlanService, TargetService,StepService,TaskService } from "@/services/Plat.Service";
import { PlanDto,StepDto, TaskDto } from "@/services/Plat.Dto";
import Task from './task.vue';

@Component({
  components: { midPage, Draggable }
})
export default class Schedule extends Vue {
  planService: PlanService = new PlanService();
  targetService: TargetService = new TargetService();
  stepService: StepService = new StepService();
  taskService: TaskService = new TaskService();
  async created() {
    const targetList = await this.targetService.getTargetList();
    this.refreshPlanList();
  }
  async refreshPlanList() {
    let taskList: Array<TaskDto> = await this.taskService.getTaskList();
    for (const element of taskList) {
      let temTaskList = new Array<TaskDto>();
      if (this.taskDic.has(element.planId)) {
        temTaskList = this.taskDic.get(element.planId);
      } else {
        this.taskDic.set(element.planId, temTaskList);
      }
      temTaskList.push(element);
    }
    let planList: Array<PlanDto> = await this.planService.getPlanList();
    for (const plan of planList) {
      plan.taskList = this.taskDic.get(plan.id);
      this.planList.push(plan);
    }
  }

  targetList: any = new Array();
  planList: any = new Array<PlanDto>();
  taskDic: any = new Map<number, Array<TaskDto>>();
  currentPlan: PlanDto = new PlanDto();

  dialogFormVisible: boolean = false;
  formLabelWidth = "120px";
  formatDate(row: any, column: any, cellValue: any, index: any) {
    const daterc = row[column.property];
    if (daterc != null) {
      const dateMat = new Date(daterc);

      return formatDate(dateMat, "yyyy-MM-dd");
    }
  }

  async changeItem(evt: any) {
    let targetevt:any = null;
    if(evt.moved != null){
      targetevt = evt.moved
    }
    if(evt.added != null){
      targetevt = evt.added
    }
    let task:TaskDto = targetevt.element;
    let newSort= targetevt.newIndex;
    //await this.taskService.moveTask(task.id,task.planId,task.sort);
  }

  checkMove(evt: any) {
    console.log(evt);
    return true;

  }

  handleEdit(index: any, row: any) {
    console.log(index, row);
  }
  async handleDelete(index: any, row: any) {
    await this.planService.handleDelete(index);
  }

  async savePlan() {
    await this.planService.updatePlan(this.currentPlan);
    this.dialogFormVisible = false;
    Message("处理成功");
    this.refreshPlanList();
  }
}
</script>

<style scoped>
.nav_main {
  margin: 0px;
  display: block;
  padding: 15px 5px 0px 5px;
}
.nav_mine {
  height: 100%;
  flex-wrap: nowrap;
  overflow-x: auto;
  display: flex;
}
.nav_item {
  margin: 0px 10px;
  min-width: 272px;
  white-space: nowrap;
}
.card_info {
  border: #aca9a7;
  border-radius: 4px;
  text-align: left;
  background-color: #dfe1e6;
}

.card_header {
  cursor: pointer;
  padding: 10px 8px 8px;
}

.card_body {
  list-style: none;
  white-space: nowrap;
  padding: 0px 4px;
  margin: 0px 4px;
}

.list_card_details {
  cursor: pointer;
  border-radius: 4px;
  background-color: white;
  padding: 6px 8px 2px;
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
  min-height: 20px;
  cursor: move;
}
.list_card_details.over {
  border: 2px dashed #000;
}
.list_card_title {
  margin: 0px 0px 4px;
}

.card_floor {
  cursor: pointer;
  color: #6b778c;
  padding: 8px;
}
</style>