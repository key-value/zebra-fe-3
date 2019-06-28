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
  background-color: red;
  padding: 10px;
  height: 100vh;
}
#midPage_insidediv {
  background-color: violet;
  margin: auto;
  height: 100vh;
}
</style>
