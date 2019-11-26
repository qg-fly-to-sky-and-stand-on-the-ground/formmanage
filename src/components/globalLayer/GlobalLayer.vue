<style lang="scss" scoped>
@import "scss/mixin";
.global-layer {
  @include flex-center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .2);
  z-index: 100;
}
</style>

<template>
  <div class="global-layer">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class GlobalLayer extends Vue {

}
</script>
