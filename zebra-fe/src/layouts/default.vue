<template>
    <div class="layout_contain primitive">
        <header>
            <headerbar></headerbar>
        </header>
        <aside >
            <div id='asidebar' ><asidebar></asidebar></div>
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
    // @Prop() private msg!: string;
}
</script>


<style scoped lang="scss">
$background_color: #1E1E1E;

.layout_contain {
    height: 100vh;
    display: flex;
    flex-direction: column;
     /*  background-color: $background_color ; #9b9b9b;*/
}
header{
    background-color: transparent;
    
}
aside {
    align-items: stretch;
    display: flex;
    flex-grow: 1;
    background-color: darkgray;
    overflow: hidden;
}

#main_content{
    flex-grow: 2;
    width: 0;
    overflow-x: auto;
}
</style>