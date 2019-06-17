<template>
    <div class="layout_contain">
        <header>
            <headerbar></headerbar>
        </header>
        <aside>
            <asidebar></asidebar>
            <router-view id="main_content"></router-view>
        </aside>
    </div>
</template>

<script lang="ts">
import Headerbar from '@/components/frame/Headbar.vue'
import Asidebar from '@/components/frame/Asidebar.vue'

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ components: { Headerbar, Asidebar } })
export default class Tlm extends Vue {
    @Prop() private msg!: string;
}
</script>


<style scoped>
.layout_contain {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: red;
}
aside {
    align-items: stretch;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
}
#main_content{
    flex-grow: 1;

}
</style>