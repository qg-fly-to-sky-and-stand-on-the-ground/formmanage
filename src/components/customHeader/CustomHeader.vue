<style lang="scss" scoped>
.header-container {
  position: relative;
  width: 100%;
  height: 60px;
  padding: 20px 30px 0 30px;

  .header-name {
    float: left;
    display: block;
    font-size:26px;
    font-weight:400;
    color:rgba(112,112,112);
    opacity:1;
  }
}
</style>

<template>
  <div class="header-container">
    <span class="header-name">{{ name }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import {Prop} from "vue-property-decorator";

@Component
export default class CustomHeader extends Vue {
  @Prop(String) name!: string;
}
</script>
