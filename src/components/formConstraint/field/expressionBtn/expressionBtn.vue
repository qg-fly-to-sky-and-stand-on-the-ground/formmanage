<style lang="scss" scoped>
    @import "scss/mixin";

    .expressionBtn {
        height: 75%;
        width: 60%;
        margin: 8.5px auto;
        border: 1px solid gray;
        border-radius: 8px;
        line-height: 51px;
        cursor: pointer;
    }



</style>

<template>
    <div class="expressionBtn">
        表达式1
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';

    @Component({
        components: {

        }
    })
    export default class expressionBtn extends Vue {


    }
</script>