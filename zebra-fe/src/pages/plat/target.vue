<template>
  <midPage>
    <div>
      <!-- <el-row :gutter="24">
        <el-col :span="6" v-for="(item, index) in targetList" :key="index">
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span>{{item.targetName}}</span>
              <div style="float: right; padding: 0">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    操作
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="showTarget(item)">编辑</el-dropdown-item>

                    <el-dropdown-item @click.native="deleteTarget(item.id)">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div>{{item.description}}</div>
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card @click.native="showTarget(null)" shadow="hover">新增</el-card>
        </el-col>
      </el-row> -->
      <div class="card_list">
        <div class="card_lattice"  v-for="(item, index) in targetList" :key="index">
          <div class="layout_card">
            <div class="layout_card_title">
              <span class="layout_card_title_icon el-icon-edit"></span>
              <span class="layout_card_title_text">{{item.targetName}}</span>
            </div>
            <div class="layout_card_title_footer">
              <div class="layout_card_title_desc">
                <span>{{item.description}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog
        title="更新数据"
        :visible.sync="dialogFormVisible"
        :modalAppendToBody="false"
        width="45%"
      >
        <el-form :model="currentTarget">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="currentTarget.targetName" autocomplete="off" placeholder="目标"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-input
              :rows="3"
              type="textarea"
              v-model="currentTarget.description"
              placeholder="描述下目标"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveTarget">确 定</el-button>
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
import { TargetService } from "@/services/Plat.Service.ts";
import { TargetDto } from "@/services/Plat.Dto";

@Component({
  components: { midPage }
})
export default class Target extends Vue {
  targetList: any = new Array();
  currentTarget = new TargetDto();
  dialogFormVisible: boolean = false;
  formLabelWidth = "120px";
  targetService: TargetService = new TargetService();
  created() {
    this.refreshTarget();
  }
  handleCommand(target: TargetDto) {
    this.showTarget(target);
  }

  showTarget(target: any) {
    if (target == null) {
      this.currentTarget.targetName = "";
      this.currentTarget.description = "";
      this.currentTarget.id = 0;
    } else {
      this.currentTarget.targetName = target.targetName;
      this.currentTarget.description = target.description;
      this.currentTarget.id = target.id;
    }
    this.dialogFormVisible = true;
  }

  async saveTarget() {
    await this.targetService.updateTarget(this.currentTarget);
    this.refreshTarget();
    this.dialogFormVisible = false;
    Message("更新成功!!!");
  }

  async refreshTarget() {
    // const v= await this.$axios.get("/api/target/all");
    this.targetList = await this.targetService.getTargetList();
  }

  async deleteTarget(id: number) {
    await this.targetService.deleteTarget(id);
    await this.refreshTarget();
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.card_list {
  display: flex;
  flex-direction: row;
}

.card_lattice {
  margin: 0.4rem 0.6rem;
}
.el-card {
  min-height: 220px;
}
</style>