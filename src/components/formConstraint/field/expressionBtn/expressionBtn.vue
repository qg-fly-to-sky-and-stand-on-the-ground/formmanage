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
    <div class="expressionBtn" @click="showExpression = true">
        表达式1
        <editExpression @on-cancel="canceleditExpression" v-if="showExpression"></editExpression>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import editExpression from "@/components/editExpression/editExpression.vue";

    @Component({
        components: {
            editExpression
        }
    })
    export default class expressionBtn extends Vue {
        showExpression: boolean = false

        canceleditExpression() {
            this.showExpression = false
            console.log(this.showExpression)
        }
    }
</script>