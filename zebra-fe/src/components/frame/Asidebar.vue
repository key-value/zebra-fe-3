<template  >
    <el-menu :default-active="defaultActive">
        <el-menu v-for="navbody in navList" :key="navbody.index">
            <nuxt-link :to="navbody.url">
                <el-menu-item :index="navbody.index">
                    <i :class="navbody.icon"></i>
                    <span slot="title">{{navbody.title}}</span>
                </el-menu-item>
            </nuxt-link>
        </el-menu>
    </el-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const asidebarDataName: any = require('../../static/routerData.json')
@Component({})
export default class Asidebar extends Vue {
navList: any[]  = asidebarDataName.asidebar
defaultActive: string = '1'
}
</script>
