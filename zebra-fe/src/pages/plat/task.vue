<template>
  <div >
    <div id="head-layout"></div>
    <midPage>
      <div>
        <el-row>
          <el-col>
            <el-table :data="taskList" stripe style="width: 100%">
              <el-table-column prop="taskTitle" label="名称" width="120"></el-table-column>
              <el-table-column prop="planName" label="所属计划" width="120"></el-table-column>
              <el-table-column align="right" width="160">
                <template slot-scope="scope">
                  <el-button size="mini" @click="showTask(scope.$index,scope.row)">Edit</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >Delete</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>

        <el-dialog
          title="更新数据"
          :visible.sync="dialogFormVisible"
          :modalAppendToBody="false"
          width="45%"
        >
          <el-form :model="currentTask">
            <el-form-item label="任务名称" :label-width="formLabelWidth">
              <el-input v-model="currentTask.taskTitle" autocomplete="off" placeholder="任务名称"></el-input>
            </el-form-item>
            <el-form-item label="所属计划" :label-width="formLabelWidth">
              <el-select v-model="currentTask.planId" class="input-box" placeholder="请选择">
                <el-option
                  v-for="item in planList"
                  :key="item.id"
                  :label="item.planName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="currentTask.description" placeholder="描述下计划"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveTask">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </midPage>
  </div>
</template>

<script lang="ts">
import { formatDate } from "@/common/dateUtility";
import { ModelUtility } from "@/common/model.utility";
import { Message } from "element-ui";
import { Component } from "vue-property-decorator";
import Vue from "vue";
import midPage from "@/components/midPage.vue";
import { TaskService, PlanService } from "@/services/Plat.Service";
import { TaskDto } from "@/services/Plat.Dto";
import { FuncBarVm } from "@/components/frameVm.ts";

@Component({
  components: { midPage }
})
export default class Task extends Vue {
  taskService: TaskService = new TaskService();
  planService: PlanService = new PlanService();
  funcBarList: any = new Array();
  async created() {
    this.$bus.on("headFunBar-event", this.funcbarEvent);
    this.planList = await this.planService.getPlanList();
    await this.refreshTaskList();
    this.funcBarList = new Array<String>(`add`);
    this.$bus.emit("headFunBar", "target", this.funcBarList);
    // 事件监听滚动条
  }

  async refreshTaskList() {
    this.taskList = await this.taskService.getTaskList();
    for (const task of this.taskList) {
      const plan = this.planList.find((x: any) => x.id === task.planId);
      if (plan) {
        task.planName = plan.planName;
      }
    }
  }
  taskList: any = new Array();
  planList: any = new Array();
  currentTask: TaskDto = new TaskDto();

  dialogFormVisible: boolean = false;
  formLabelWidth = "120px";

  formatDate(row: any, column: any, cellValue: any, index: any) {
    const daterc = row[column.property];
    if (daterc != null) {
      const dateMat = new Date(daterc);

      return formatDate(dateMat, "yyyy-MM-dd");
    }
  }
  add(){this.showTask(-1 , null)}
  funcbarEvent(pageName: string, item: FuncBarVm) {
    if (item === null) {
      return;
    }
    this.$options.methods &&
      this.$options.methods[item.name] &&
      this.$options.methods[item.name].call(this);
  }
  async handleDelete(index: any, row: any) {
    await this.taskService.deleteTask(row.id);
  }
  showTask(index: any, item: any) {
    let task: any;
    if (index < 0) {
      this.currentTask = new TaskDto();
    } else {
      task = this.taskList[index];
      ModelUtility.merge(this.currentTask, task);
    }

    this.dialogFormVisible = true;
  }

  async saveTask() {
    await this.taskService.updateTask(this.currentTask);
    this.dialogFormVisible = false;
    Message("处理成功");
    this.refreshTaskList();
  }
}
</script>



<style scoped>
#funBar {
  width: 100%;
  height: auto;
  position: sticky;
  top: 0;
  z-index: 100;
}
#head-layout {
    height: 10px;
}

#funBar-content {
  position: relative;
  margin: 0px 20px;
  background-color: #e1e1e1;
  padding:5px;
}

.page-head-button {
  position: absolute;
  top: 60;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}

.input-box {
  width: 100%;
}
</style>