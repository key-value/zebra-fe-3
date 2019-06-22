<template  >
         <el-menu router
      class="el-menu-vertical-demo">
                <el-menu-item
      v-for="(navbody, index) in navList" :default-active="$route.path" :key="'menu_'+index" :index="navbody.url">
                    <i :class="navbody.icon"></i>
                    <span :index="'menu_'+index" slot="title">{{navbody.title}}</span>
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
.el-menu-vertical-demo {
    background: whitesmoke;
    height: 100%;
    width: 270px;
}
</style>

