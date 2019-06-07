<template>
    <el-container class="main-container">
        <el-header>
            <headerbar></headerbar>
        </el-header>
        <el-container>
            <el-aside width="280px">
                <asidebar></asidebar>
            </el-aside>
            <el-main>
                <nuxt-child :key="$route.name"/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import Headerbar from '@/components/frame/Headbar.vue'
import Asidebar from '@/components/frame/Asidebar.vue'

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ components: { Headerbar,Asidebar } })
export default class HelloWorld extends Vue {
    @Prop() private msg!: string;
}
</script>


<style scoped>
</style>