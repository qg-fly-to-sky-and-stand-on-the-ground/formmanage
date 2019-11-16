<style lang="scss" scoped>
@import "scss/mixin";
.header-container {
  position: relative;
  width:100%;
  height:92px;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 18px rgba(0, 0, 0, 0.12);

  .info-container {
    @include vertical-center;

    position: relative;
    width: 400px;
    float: right;
    height: 92px;

    .time {

    }

    .user {

    }

    .exit {

    }
  }
}
</style>

<template>
  <div class="header-container">
    <div class="info-container">
      <div class="time">2019年11月14日</div>
      <div class="user"></div>
      <div class="exit"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class Header extends Vue {

}
</script>
