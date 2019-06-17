<template  >
    <div id="main_div">
         <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      v-for="navbody in navList" :key="navbody.index">
                <el-menu-item :index="navbody.index">
                    <i :class="navbody.icon"></i>
                    <span slot="title">{{navbody.title}}</span>
                </el-menu-item>
    </el-menu>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const asidebarDataName: any = require('../../static/routerData.json')
@Component({})
export default class Asidebar extends Vue {
    navList: any[] = asidebarDataName.asidebar
    defaultActive: string = '1'
}
</script>
<style scoped>
#main_div{
    height: 100%;
}
.el-menu-vertical-demo {
    background: transparent;
    width: 200px;
}
</style>

