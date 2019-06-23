<template>
    <el-row class="main-head">
        <el-col :span="8">
            <div class="grid-content bg-purple">我是一个系统</div>
        </el-col>
        <el-col :span="8">
            <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :span="8">
            <div class="grid-content bg-purple"></div>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default class HeadBar extends Vue {}
</script>

<style scoped>
.main-head{
    padding: 25px;
    font-size: 20px;
}
</style>
