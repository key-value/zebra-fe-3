<template>
  <el-row class="main-head">
    <el-col :span="8">
      <div class="grid-content">
        <div class="main-head-title">我是一个系统</div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content">
        <div class="head_func_bar">
          <div
            class="func_btn"
            @click="pageEvent(item)"
            v-for="(item, index) in funcList"
            :key="index"
          >
            <div class="btn_ico">
              <li :class="item.icon!=null?item.icon:'el-icon-setting'"></li>
            </div>
            <div class="btn_text">{{item.name}}</div>
          </div>
          <!-- <div class="func_btn">
            <div class="btn_ico">
              <li class="el-icon-share"></li>
            </div>
            <div class="btn_text">debc</div>
          </div>-->
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content"></div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import Vue from "vue";
import { FuncBarVm } from "@/components/frameVm.ts";
import { Component } from "vue-property-decorator";
var _ = require("lodash");
const funcBtnData: any = require("@/static/funcBtnData.json");
@Component({})
export default class HeadBar extends Vue {
  funcList: Array<FuncBarVm> = new Array();
  pageName: String = "";
  pageFunction(
    pageName: string,
    btnList: Array<String>,
    funcBarList: Array<FuncBarVm>
  ) {
    this.funcList = new Array();
    this.pageName = pageName;
    if (btnList) {
      for (const btnName of btnList) {
        const currentBtn = _.find(funcBtnData, { name: btnName });
        this.funcList.push(currentBtn);
      }
    }
  }

  sendFunction(funcBarVm: FuncBarVm) {
    const a = `pageEvent-${this.pageName}`;
    this.$bus.emit(a, FuncBarVm.name);
  }

  created() {
    this.$bus.on("headFunBar", this.pageFunction);
  }

  pageEvent(item: FuncBarVm) {
    let vm = this;
    // if(this.$options.methods[item.name] != null){
    //   this[item.name]();
    // }
    this.$bus.emit("headFunBar-event", this.pageName, item);
  }
}
</script>

<style scoped>
.main-head {
  height: 30px;
}
.main-head-title {
  font-size: 20px;
  margin: 10px 0px;
}
.head_func_bar {
  display: flex;
  flex-direction: row;
}
.func_btn {
  margin: 1px 0px;
  padding: 0px 10px;
  background-color: transparent;
  border: 0px;
}
.func_btn:hover {
  background-color: #282c35;
  border: 0px;
}
.btn_ico {
  font-size: 23px;
}
.btn_text {
  font-size: 4px;
}
</style>
