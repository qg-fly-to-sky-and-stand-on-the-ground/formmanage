<style lang="scss" scoped>
@import "scss/mixin";
.left-section {
  position: relative;
  width: 344px;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(270deg,rgba(70,77,92,1) 0%,rgba(57,63,76,1) 100%);
  box-shadow: 0px 18px 64px rgba(47,51,61,0.48);

  .head-container {
    position: relative;
    width: 100%;
    padding: 48px 0 36px 0;

    img {
      width: 96px;
      height: 96px;
      background: rgba(255,255,255,1);
      border: 1px solid rgba(112,112,112,1);
      border-radius: 8px;
    }
  }

  .system-name {
    display: block;
    width:100%;
    font-size:30px;
    font-weight:400;
    line-height:51px;
    color:rgba(255,255,255,1);
    text-align: center;
  }

  .choice-container {
    @include clear-float;

    position: relative;
    width: 100%;
    margin-top: 20px;

    .choice-item {
      &:hover {
        background-color: #fff;
        color: #2F333D;
      }

      cursor: pointer;
      width:344px;
      height:72px;
      line-height: 72px;
      color: #fff;
      font-size:24px;
    }
  }
}
</style>

<template>
  <section class="left-section">
    <div class="head-container">
      <img src="">
    </div>
    <span class="system-name">智能表单约束系统</span>
    <div class="choice-container">
      <div class="choice-item" @click="toUpload">上传文件</div>
      <div class="choice-item" @click="toFormConstraint">表单约束</div>
      <div class="choice-item" @click="toUser">用户界面</div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class LeftSection extends Vue {
  toUpload() {
    this.$router.push({name: 'upLoad'})
  }
  toFormConstraint(){
    this.$router.push({name: 'formConstraint'})
  }

  toUser() {
    this.$router.push({name: 'user'})
  }
}
</script>
