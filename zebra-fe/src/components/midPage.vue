<template>
  <div>
    <div id="midPage_maindiv" >
      <div id="midPage_insidediv">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class midPage extends Vue {
  

}
</script>
<style scoped>
#midPage_maindiv {
  margin: 0;
  padding: 0px 20px 20px;
}
#midPage_insidediv {
  margin: auto;
  padding: 10px;
}
</style>
