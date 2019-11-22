<style lang="scss" scoped>
.user {
  padding-top: 3.5vh;
}
.user .left-div {
  float: left;
  width: 64%;
  height: 80vh;
}
.user .right-div {
  width: 36%;
  margin-top: 5vh;
}
.user .title {
  width: 90%;
  margin: 0 auto;
  margin-bottom: 3vh;
  margin-left: 66px;
  text-align: left;
  font-size: 36px;
  font-weight: 400;
}
.user .table-display {
  width: 90%;
  height: 77vh;
  margin: 0 auto;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.user .right-div {
  float: left;
  width: 34%;
  height: 79vh;
  margin: 0 auto;
margin-top: 5vh;
  border-radius: 8px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  background: white;
  font-size: 20px;
}
.user .fields {
    text-align: left;
    width: 90%;
    margin: 0 auto;
    padding: 3%;
    border-bottom: 1px solid #D8D8D8;
}


</style>

<template>
  <div class="user">
    <div class="left-div">
      <h1 class="title">表单界面</h1>
      <div class="table-display"></div>
    </div>
    <div class="right-div">
      <div class="field-list">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" stretch="true">
          <el-tab-pane label="已标注" name="first">
            <div class="fields">字段1</div>
            <div class="fields">字段1</div>
            <div class="fields">字段1</div>
            <div class="fields">字段1</div>
            <div class="fields">字段1</div>
          </el-tab-pane>
          <el-tab-pane label="未标注" name="second">
              <div class="fields">字段1</div>
              </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
</script>