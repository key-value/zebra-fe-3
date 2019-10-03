<template  >
         <el-menu router 
         background-color="#292c35"
      text-color="#9795ac"
      active-text-color="#f0f0f7"
      class="el-menu-vertical-demo layout_bar">
                <el-menu-item
      v-for="(navbody, index) in navList" :default-active="$route.path" :key="'menu_'+index" :index="navbody.url">
                  <div class="menu-title">  <i :class="navbody.icon"></i>
                    <span :index="'menu_'+index" slot="title">{{navbody.title}}</span></div>
                </el-menu-item>
    </el-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const asidebarDataName: any = require('@/static/routerData.json')
@Component({})
export default class Asidebar extends Vue {
    navList: any[] = asidebarDataName.asidebar
    defaultActive: string = '1'
}
</script>
<style scoped>

.menu-title{
    margin-left: 15%;
    font-size: 16px;
}
</style>

