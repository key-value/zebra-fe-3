<template>
  <div>
    <div class="nav_bar">
      <el-select v-model="targetId" placeholder="请选择"
          @change="targetChange()">
        <el-option
          v-for="item in targetList"
          :key="item.id"
          :label="item.targetName"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-button  type="success">添加计划</el-button>
    </div>
    <div>
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
                  :key="index"
                  @add="update($event,item)"
                  @update="update($event,item)"
                >
                  <li
                    class="list_card_details"
                    v-for="(task, sindex) in item.taskList"
                    :key="sindex"
                  >
                    <div class="list_card_title">{{task.taskTitle}}</div>
                  </li>
                </draggable>
              </ul>
              <div class="card_floor">
                <div v-if="newPlanId!=item.id">
                  <div class="el-icon-plus"></div>
                  <el-button type="text" @click="newPlanId = item.id">新任务</el-button>
                </div>
                <div>
                  <div v-if="newPlanId==item.id" class="card_floor_form">
                    <div>
                      <el-input type="textarea" :rows="2" v-model="newTaskName" clearable></el-input>
                    </div>
                    <div>
                      <el-button size="small" @click="newTask(item)" type="success">添加</el-button>
                      <el-button size="small" @click="newPlanId=0">取消</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
import {
  PlanService,
  TargetService,
  StepService,
  TaskService
} from "@/services/Plat.Service";
import { PlanDto, StepDto, TaskDto, TargetDto } from "@/services/Plat.Dto";
import Task from "./task.vue";

@Component({
  components: { Draggable }
})
export default class Schedule extends Vue {
  planService: PlanService = new PlanService();
  targetService: TargetService = new TargetService();
  stepService: StepService = new StepService();
  taskService: TaskService = new TaskService();
  async created() {
    this.targetList = await this.targetService.getTargetList();
    if (this.targetList.size > 0) {
      this.targetId = this.targetList[0].id;
    }
    console.log(this.targetId)
    this.refreshPlanList();
  }
  async refreshPlanList() {
    this.planList = new Array<PlanDto>();
    this.taskDic = new Map();
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
    let planList: Array<PlanDto> = await this.planService.getPlanAllList(
      this.targetId
    );
    for (const plan of planList) {
      plan.taskList = this.taskDic.get(plan.id);
      this.planList.push(plan);
    }
  }

  targetId: number = 1;
  targetList: any = new Array<TargetDto>();
  planList: any = new Array<PlanDto>();
  taskDic: any = new Map<number, Array<TaskDto>>();
  currentPlan: PlanDto = new PlanDto();

  newPlanId: number = 0;
  newTaskName: string = "";
  dialogFormVisible: boolean = false;
  formLabelWidth = "120px";
  formatDate(row: any, column: any, cellValue: any, index: any) {
    const daterc = row[column.property];
    if (daterc != null) {
      const dateMat = new Date(daterc);

      return formatDate(dateMat, "yyyy-MM-dd");
    }
  }
  async onMoveCallback(evt: any, originalEvent: any) {
    console.log("start", evt, originalEvent);
    let targetevt: any = null;
    targetevt = evt.draggedContext;

    //let task:TaskDto = targetevt.element;
    let newSort = targetevt.newIndex;
    //await this.taskService.moveTask(task.id,task.planId,task.sort);
    // return false; — for cancel
  }

  async targetChange() {
    if (this.targetId > 0) {
      this.refreshPlanList();
    }
  }

  async update(event: any, item: PlanDto) {
    let task = item.taskList[event.newIndex];
    var index = event.newIndex + 1;

    this.taskService.moveTask(task.id, item.id, index);
  }

  async newTask(item: PlanDto) {
    console.log(item);
    let currentTask: TaskDto = new TaskDto();
    currentTask.taskTitle = this.newTaskName;
    currentTask.planId = item.id;
    await this.taskService.updateTask(currentTask);
    this.newPlanId = 0;
    item.taskList.push(currentTask);
    this.dialogFormVisible = false;
    Message("处理成功");
  }

  handleEdit(index: any, row: any) {}
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
.nav_bar {
  background-color: black;
  padding: 5px;
  text-align: left;
}

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
.card_floor_form {
  border: 2px solid #aca9a7;
  padding: 5px;
}
.card_floor_form > div {
  margin: 2px;
}
</style>