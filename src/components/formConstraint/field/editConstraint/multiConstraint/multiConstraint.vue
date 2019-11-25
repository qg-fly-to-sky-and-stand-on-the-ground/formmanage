<style lang="scss" scoped>
    @import "scss/mixin";
    .multi-constraint-container {
        height: 100%;
        width: 100%;
        padding-bottom: 18px;
    }

    .field-content {
        height: 40px;
        width: 85%;
        margin: auto;
        text-align: left;
        margin-top: 15px;
        line-height: 40px;
        font-size: 20px;
        text-align: center;
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
        border-radius:8px;
    }
</style>

<template>
   <div class="multi-constraint-container">
       <div class="field-content">单选约束</div>
       <div class="field-content">多选约束</div>
       <div class="field-content">表达式约束</div>
   </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';

    @Component ({
        components: {

        }
    })
    export default class Header extends Vue {

    }
</script>