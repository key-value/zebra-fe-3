<template>
  <midPage>
    <div>
      <!-- <el-row>
        <el-col :span="4">
          <el-button @click.native="showPlan(-1 , null)" shadow="hover">新增</el-button>
        </el-col>
      </el-row>-->
      <el-row>
        <el-col>
          <el-table :data="planList" stripe style="width: 100%">
            <el-table-column :formatter="formatDate" prop="beginTime" label="启动日期" width="180"></el-table-column>
            <el-table-column prop="planName" label="名称" width="120"></el-table-column>
            <el-table-column prop="expectations" label="成果"></el-table-column>
            <el-table-column prop="targetName" label="执行目标"></el-table-column>
            <el-table-column class="item_list" align="right" width="160">
              <template slot-scope="scope">
                <el-button size="mini" @click="showPlan(scope.$index,scope.row)">Edit</el-button>
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
        <el-form :model="currentPlan">
          <el-form-item label="计划名称" :label-width="formLabelWidth">
            <el-input v-model="currentPlan.planName" autocomplete="off" placeholder="计划代号"></el-input>
          </el-form-item>
          <el-form-item label="预期成果" :label-width="formLabelWidth">
            <el-input v-model="currentPlan.expectations" placeholder="希望达到的成果"></el-input>
          </el-form-item>
          <el-form-item label="最低成果" :label-width="formLabelWidth">
            <el-input v-model="currentPlan.minExpectations" placeholder="至少要做出的成果"></el-input>
          </el-form-item>
          <el-form-item label="启动时间" :label-width="formLabelWidth">
            <div>
              <el-date-picker
                class="input-box"
                v-model="currentPlan.beginTime"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="预期结束时间" :label-width="formLabelWidth">
            <div>
              <el-date-picker
                class="input-box"
                v-model="currentPlan.endTime"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="执行目标" :label-width="formLabelWidth">
            <div>
              <el-select v-model="currentPlan.targetId" class="input-box" placeholder="请选择">
                <el-option
                  v-for="item in targetList"
                  :key="item.id"
                  :label="item.targetName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="currentPlan.description" placeholder="描述下计划"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="savePlan">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </midPage>
</template>

<script lang="ts">
import { formatDate } from "@/common/dateUtility";
import { ModelUtility } from "@/common/model.utility";
import { Message } from "element-ui";
import { Component } from "vue-property-decorator";
import Vue from "vue";
import midPage from "@/components/midPage.vue";
import { PlanService, TargetService } from "@/services/Plat.Service";
import { PlanDto } from "@/services/Plat.Dto";
import { FuncBarVm } from "@/components/frameVm.ts";

@Component({ components: { midPage } })
export default class Plan extends Vue {
  targetList: any = new Array();
  planList: any = new Array();
  currentPlan: PlanDto = new PlanDto();
  funcBarList: any = new Array();
  pickerOptions1: any = {
    disabledDate(time: any) {
      return time.getTime() <= Date.now();
    },
    shortcuts: [
      {
        text: "今天",
        onClick(picker: any) {
          picker.$emit("pick", new Date());
        }
      },
      {
        text: "明天",
        onClick(picker: any) {
          const date = new Date();
          date.setTime(date.getTime() + 3600 * 1000 * 24);
          picker.$emit("pick", date);
        }
      },
      {
        text: "下周",
        onClick(picker: any) {
          const date = new Date();
          date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
          picker.$emit("pick", date);
        }
      }
    ]
  };

  dialogFormVisible: boolean = false;
  formLabelWidth = "120px";

  planService: PlanService = new PlanService();
  targetService: TargetService = new TargetService();

  add() {
    this.showPlan(-1, new PlanDto());
  }

  funcbarEvent(pageName: string, item: FuncBarVm) {
    if (item === null) {
      return;
    }
    this.$options.methods &&
      this.$options.methods[item.name] &&
      this.$options.methods[item.name].call(this);}

  async created() {
    this.$bus.on("headFunBar-event", this.funcbarEvent);
    this.targetList = await this.targetService.getTargetList();
    this.refreshPlanList();
    this.funcBarList = new Array<String>(`add`);
    this.$bus.emit("headFunBar", "plan", this.funcBarList);
  }
  async refreshPlanList() {
    this.planList = await this.planService.getPlanList();
    for (const element of this.planList) {
      const target = this.targetList.find((x: any) => x.id == element.targetId);
      if (target) {
        element.targetName = target.targetName;
      } else {
        element.targetName = "-";
      }
    }
  }

  formatDate(row: any, column: any, cellValue: any, index: any) {
    const daterc = row[column.property];
    if (daterc != null) {
      const dateMat = new Date(daterc);
      return formatDate(dateMat, "yyyy-MM-dd");
    }
  }
  async handleDelete(index: any, row: any) {
    await this.planService.handleDelete(row.id);
    await this.refreshPlanList();
  }
  showPlan(index: any, item: PlanDto) {
    let plan: any;
    if (index < 0) {
      this.currentPlan = new PlanDto();
    } else {
      plan = this.planList[index];
      ModelUtility.merge(this.currentPlan, plan);
    }

    this.dialogFormVisible = true;
  }

  async savePlan() {
    await this.planService.updatePlan(this.currentPlan);
    this.dialogFormVisible = false;
    Message("处理成功");
    this.refreshPlanList();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/common.scss";

.el-row {
  margin-bottom: 20px;
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

.item_list {
  background-color: yellow;
}
</style>