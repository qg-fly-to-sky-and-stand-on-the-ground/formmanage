<style lang="scss" scoped>
    @import "scss/mixin";

    .editConstraint {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);

    }

    .editConstraint-bullet-window {
        height: auto;
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
        color: rgba(112, 112, 112, 1);
    }

    .constraint-btn-container {
        height: 11%;
        width: 100%;
    }

    .single-constraint-btn {
        display: inline-block;
        height: 40px;
        width: 220px;
        background: rgba(70, 77, 92, 1);
        border: 1px solid rgba(70, 77, 92, 1);
        border-radius: 8px 0px 0px 8px;
        color: white;
        line-height: 40px;
        font-size: 16px;
        cursor: pointer;
    }

    .multi-constraint-btn {
        display: inline-block;
        height: 40px;
        width: 220px;
        background: rgba(255, 255, 255, 1);
        border-radius: 0px 8px 8px 0px;
        color: black;
        line-height: 40px;
        font-size: 16px;
        border: 1px solid black;
        cursor: pointer;
    }

    .constraint-content {
        max-height: 400px;
        width: 80%;
        margin: auto;
        overflow: auto;
        margin-top: 8px;
    }

    .btn-container {
        margin-top: 18px;
        height: 85px;
        width: 100%;
    }

    .save-btn {
        display: inline-block;
        height: 55px;
        width: 120px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 8px;
        line-height: 55px;
        margin-right: 45px;
        font-size: 18px;
    }

    .cancel-btn {
        display: inline-block;
        height: 55px;
        width: 120px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 8px;
        margin-left: 45px;
        line-height: 55px;
        font-size: 18px;
    }
</style>

<template>
    <div class="editConstraint">
        <div class="editConstraint-bullet-window">
            <div class="editConstraint-title">编辑字段约束</div>
            <div class="constraint-btn-container">
                <div class="single-constraint-btn" @click="showSingle" v-bind:style="singleColor">单字段约束</div>
                <div class="multi-constraint-btn" @click="showMulti" v-bind:style="multiColor">多字段约束</div>
            </div>

            <div class="constraint-content">
                <singleConstraint v-if="single"></singleConstraint>
                <multiConstraint v-if="multi"></multiConstraint>
            </div>

            <div class="btn-container">
                <div class='save-btn'>保存</div>
                <div class='cancel-btn' @click="closeMyself"> 取消</div>
            </div>


        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import singleConstraint from '@/components/formConstraint/editConstraint/singleConstraint/singleConstraint.vue';
    import multiConstraint from '@/components/formConstraint/editConstraint/multiConstraint/multiConstraint.vue';

    @Component({
        components: {
            singleConstraint,
            multiConstraint
        },
    })
    export default class editConstraint extends Vue {
        single: boolean = true;
        multi: boolean = false;

        get singleColor() {
            if (this.single == true) {
                return {
                    background: "rgba(70, 77, 92, 1)",
                    color: "white"
                }
            } else {
                return {
                    background: "white",
                    color: "black"
                }
            }
        };

        get multiColor() {
            if (this.multi == true) {
                return {
                    background: "rgba(70, 77, 92, 1)",
                    color: "white"
                }
            } else {
                return {
                    background: "white",
                    color: "black"
                }
            }
        };

        showSingle() {
            this.single = true;
            this.multi = false;
        };

        showMulti() {
            this.single = false;
            this.multi = true;
        };

        closeMyself() {
            this.$emit("on-close");
            //如果需要传参的话，可以在"on-close"后面再加参数，然后在父组件的函数里接收就可以了。
        }

    };
</script>