<style lang="scss" scoped>
    @import "scss/mixin";

    .regularExpression-container {
        position: relative;
        width: 736px;
        height: 400px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 8px;
        text-align: left;
        overflow: hidden;

        .regularExpression-header-name {
            height: 17%;
            width: 100%;
            margin-left: 20px;
            margin-top: 2%;
            font-size: 26px;
            font-weight: 400;
            color: rgb(112, 112, 112);
            opacity: 1;
            text-align: left;
        }

        .regularExpression-name-container {
            height: 15%;
            width: 80%;
            margin: auto;
            margin-top: 4px;
        }

        .regularExpression-name-title {
            display: inline-block;
            height: 100%;
            width: 20%;
            vertical-align: top;
            line-height: 60px;
        }

        .regularExpression-name-input {
            display: inline-block;
            height: 100%;
            width: 80%;
            vertical-align: top;
            line-height: 60px;
        }

        .button-container {
            width: 100%;
            height: 60px;
            margin-top: 40px;
            text-align: center;
        }

    }
</style>

<template>
    <global-layer>
        <div class="regularExpression-container">
            <div class="regularExpression-header-name">字段约束</div>
            <div class="regularExpression-name-container">
                <div class="regularExpression-name-title">字段长度</div>
                <div class="regularExpression-name-input">
                    <Input v-model="Formlength" placeholder="格式: 8-8" style="width: 300px;"/>
                </div>
            </div>
            <div class="regularExpression-name-container">
                <div class="regularExpression-name-title">约束格式</div>
                <div class="regularExpression-name-input">
                    <Select v-model="regular" style="width:200px">
                        <Option v-for="item in regularList" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </div>
            </div>

            <div class="button-container">
                <Button style="width:1.20rem;height:.60rem;font-size: .2rem;box-shadow:0px 3px 6px rgba(0,0,0,0.16);"
                        @click="save"
                >保存
                </Button>
                <Button style="width:1.20rem;height:.60rem;font-size: .2rem;box-shadow:0px 3px 6px rgba(0,0,0,0.16);margin-left: .8rem;"
                        @click="cancel"
                >取消
                </Button>
            </div>

        </div>
    </global-layer>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import GlobalLayer from "@/components/globalLayer/GlobalLayer.vue";
    import {Prop} from "vue-property-decorator";
    import CustomHeader from "@/components/customHeader/CustomHeader.vue";
    import {operationFailMsg} from "@/utils/shared/message";
    import store from '@/store';
    import Auth from '@/store/modules/FiledManage'
    import {getModule} from 'vuex-module-decorators';

    const auth = getModule(Auth, store);

    @Component({
        components: {CustomHeader, GlobalLayer}
    })
    export default class regularExpression extends Vue {
        @Prop(String) oldRegName!: string

        Formlength: string = ''
        regular: string = ''
        regularList: Array<object> = [
            {
                value: '手机号码',
                label: '手机号码'
            },
            {
                value: '邮箱',
                label: '邮箱'
            },
        ]

        save() {
            let Array = []
            Array = this.Formlength.split('-')
            if (this.regular.length == 0 || this.Formlength.length == 0) {
                operationFailMsg('输入不能为空');
                return;
            } else if (this.Formlength[0] > this.Formlength[2]) {
                operationFailMsg('长度格式有误');
                return;
            } else if(this.Formlength[1] != "-") {
                operationFailMsg('长度格式有误');
                return;
            } else if(isNaN(Number(this.Formlength[0])) || isNaN(Number(this.Formlength[2]))) {
                operationFailMsg('长度格式有误');
                return;
            }

            console.log(Array)
            if (Array[0] > Array[1]) {
                operationFailMsg('长度格式有误');
                return;
            }

            if (this.regular == '手机号码') {
                this.regular = "^1[3456789]\d{9}$"
            } else if (this.regular == '邮箱') {
                this.regular = "[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$"
            }

            this.$emit("on-save", {
                length: this.Formlength,
                regular: this.regular,
                oldRegName: this.oldRegName
            })
        }

        cancel() {
            this.$emit("on-cancel")
        }
    }
</script>