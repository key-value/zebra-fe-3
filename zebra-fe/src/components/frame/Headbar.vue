<template>
    <el-row class="main-head">
        <el-col :span="8" >
            <div class="grid-content">
                <div class="main-head-title">我是一个系统</div></div>
        </el-col>
        <el-col :span="8">
            <div class="grid-content">
                    <div class="head_func_bar">
                        <div class="func_btn"  @click="pageFunction" >
                            <div class="btn_ico">
                                <li class="el-icon-share"></li>
                            </div>
                            <div class="btn_text">abc</div>
                        </div>
                        <div class="func_btn">
                            <div class="btn_ico">
                                <li class="el-icon-share"></li>
                            </div>
                            <div class="btn_text">debc</div>
                        </div>
                    </div>
            </div>
        </el-col>
        <el-col :span="8">
            <div class="grid-content"></div>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default class HeadBar extends Vue {

    pageFunction(){
        console.log(`123`);
    }
}
</script>

<style scoped lang="scss">

.main-head-title{
    font-size: 20px;
    margin: 10px 0px;
}
.head_func_bar{
    display: flex;
    flex-direction: row;
}
.func_btn{
    margin: 1px 0px;
    padding: 0px 10px;
    background-color: transparent;
    border: 0px;
}
.func_btn:hover{
    background-color: #282c35;
    border: 0px;
}
.btn_ico{
    font-size: 23px;
}
.btn_text{
    font-size: 4px;
}
</style>
