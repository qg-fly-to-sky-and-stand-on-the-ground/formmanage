<style lang="scss" scoped>
    @import "scss/mixin";

    .fieldPropbtn {
        display: inline-block;
        height: 75%;
        width: 35%;
        margin: 8.5px 10px 0 0;
        border: 1px solid gray;
        border-radius: 8px;
        line-height: 51px;
        cursor: pointer;
    }



</style>

<template>
    <div class="fieldPropbtn">
        修改属性
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';

    @Component({
        components: {

        }
    })
    export default class fieldPropbtn extends Vue {


    }
</script>