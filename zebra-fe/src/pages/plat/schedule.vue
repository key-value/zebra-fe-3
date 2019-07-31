<template>
  <div class="nav_main">
    <div class="nav_mine">
      <div class="nav_item" v-for="(item, index) in targetList" :key="index">
        <div class="card_info">
          <div class="card_header">
            <div>{{item.targetName}}</div>
          </div>

          <ul class="card_body">
            <draggable
              class="dragArea list-group"
              :list="item.PlanList"
              :group="{ name: 'people'+item.id, put: true }"
      :key="index"
            >
              <li
                class="list_card_details"
                v-for="(plan, sindex) in item.PlanList"
                :key="sindex"
              >
                <div class="list_card_title">{{plan.planName}}</div>
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
import { PlanService, TargetService } from "@/services/Plat.Service";
import { PlanDto } from "@/services/Plat.Dto";

@Component({
  components: { midPage, Draggable }
})
export default class Schedule extends Vue {
  planService: PlanService = new PlanService();
  targetService: TargetService = new TargetService();
  async created() {
    this.refreshPlanList();
    console.log(this.targetList)
  }
  async refreshPlanList() {
    let planList: Array<PlanDto> = await this.planService.getPlanList();
    for (const element of planList) {
      let temPlanList = new Array<PlanDto>();
      if (this.planDic.has(element.targetId)) {
        temPlanList = this.planDic.get(element.targetId);
      } else {
        this.planDic.set(element.targetId, temPlanList);
      }
      temPlanList.push(element);
    }
      const targetList = await this.targetService.getTargetList();
      for (const target of targetList) {
        target.PlanList = this.planDic.get(target.id);
        this.targetList.push(target)
      }
  }

  async getPlanList(targetId: number) {
    if (!this.planDic.has(targetId)) {
      return new Array();
    }
    console.log(targetId);
    console.log(this.planDic.get(targetId));
    return this.planDic.get(targetId);
  }

  targetList: any = new Array();
  planDic: any = new Map<number, Array<PlanDto>>();
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
 removeAt(idx:any) {
      this.list.splice(idx, 1);
    };
    add() {
      id++;
      this.list.push({ name: "Juan " + id, id, text: "" });
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
  padding: 15px 5px;
}
.nav_mine {
  height: 100%;
  flex-wrap: nowrap;
  overflow-x: auto;
  display: flex;
}
.nav_item {
  margin: 0px 10px;
  width: 272px;
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