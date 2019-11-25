<style lang="scss" scoped>
    @import "scss/mixin";

    .fieldmeanBtn {
        height: 75%;
        width: 60%;
        margin: 8.5px auto;
        border: 1px solid gray;
        border-radius: 8px;
        line-height: 51px;
    }



</style>

<template>
    <div class="fieldmeanBtn">
        字段含义
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';

    @Component({
        components: {

        }
    })
    export default class fieldmeanBtn extends Vue {


    }
</script>