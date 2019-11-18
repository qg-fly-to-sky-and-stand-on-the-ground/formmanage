<style lang="scss" scoped>
    @import "scss/mixin";

    .editConstraint {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: black;
    }

    .editConstraint-bullet-window {
        height: 600px;
        z-index: 20;
        width: 700px;
        top: 50%;
        left: 50%;
        margin-top: -300px;
        margin-left: -350px;
        position: absolute;
        background-color: white;
        opacity: 1;
    }

    .editConstraint-title {
        height: 10%;
        width: 100%;
        text-align: left;
        text-indent: 31px;
        font-size: 20px;
        line-height: 60px;
        color:rgba(112,112,112,1);
    }

    .constraint-btn-container {
        height: 11%;
        width: 100%;
        background-color: green;
    }

    .single-constraint-btn{
        display: inline-block;
        height: 40px;
        width: 240px;
        background:rgba(70,77,92,1);
        border:1px solid rgba(70,77,92,1);
        border-radius:8px 0px 0px 8px;
        color: white;
        line-height: 40px;
        font-size: 16px;
    }

    .multi-constraint-btn {
        display: inline-block;
        height: 40px;
        width: 240px;
        background:rgba(255,255,255,1);
        border-radius:0px 8px 8px 0px;
        color: black;
        line-height: 40px;
        font-size: 16px;
    }

    .constraint-content {
        height: 50%;
        width: 70%;
        margin: auto;
        background-color: #42b983;
    }

</style>

<template>
    <div class="editConstraint">
        <div class="editConstraint-bullet-window">
            <div class="editConstraint-title">编辑字段文字</div>
            <div class="constraint-btn-container">
                <div class="single-constraint-btn">单字段约束</div>
                <div class="multi-constraint-btn">多字段约束</div>
            </div>

              <div class="constraint-content"></div>


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