<template>
  <div>
    <div id="midPage_maindiv">
      <div id="midPage_insidediv">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class midPage extends Vue {}
</script>
<style scoped>
#midPage_maindiv {
  margin: 0;
  padding: 10px;
  background-color: red;
  height: 100%;
}
#midPage_insidediv {
  margin: auto;
  background-color: white;
}
</style>
