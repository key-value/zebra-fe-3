<template>
  <div class="home">
    <section>
      <el-row>
        <el-col><div>111</div></el-col>
        <el-col><div>222</div></el-col>
        <el-col><div>333</div></el-col>
      </el-row>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
