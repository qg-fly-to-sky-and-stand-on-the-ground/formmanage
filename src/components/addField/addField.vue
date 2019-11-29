<style lang="scss" scoped>
    @import "scss/mixin";

    .addField-container {
        position: relative;
        width: 736px;
        height: 400px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 8px;
        text-align: left;
        overflow: hidden;

        .addField-header-name {
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

        .en-name-container {
            height: 15%;
            width: 80%;
            margin: auto;
            margin-top: 4px;
        }

        .en-name-title {
            display: inline-block;
            height: 100%;
            width: 20%;
            vertical-align: top;
            line-height: 60px;
        }

        .en-name-input {
            display: inline-block;
            height: 100%;
            width: 80%;
            vertical-align: top;
            line-height: 60px;
        }

        .button-container {
            width: 100%;
            height: 60px;
            margin-top: 20px;
            text-align: center;
        }
    }
</style>

<template>
    <global-layer>
        <div class="addField-container">
            <div class="addField-header-name">{{title}}</div>
            <div class="en-name-container">
                <div class="en-name-title">英文名称</div>
                <div class="en-name-input">
                    <Input v-model="enValue" placeholder="Enter something..." style="width: 300px;"/>
                </div>
            </div>
            <div class="en-name-container">
                <div class="en-name-title">中文名称</div>
                <div class="en-name-input">
                    <Input v-model="chValue" placeholder="Enter something..." style="width: 300px;"/>
                </div>
            </div>
            <div class="en-name-container">
                <div class="en-name-title">描述</div>
                <div class="en-name-input">
                    <Input v-model="description" placeholder="Enter something..." style="width: 300px;"/>
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
    export default class addField extends Vue {
        @Prop() isAdd!: string[];
        enValue: string = ''
        chValue: string = ''
        description: string = ''

        title: string = ''

        oldArray: string[] = []

        cancel() {
            this.$emit('on-cancel');
        }

        save() {
            let requestData
            if (this.enValue.length == 0 || this.chValue.length == 0 || this.description.length == 0) {
                operationFailMsg('输入不能为空');
                return;
            }
            this.$emit("on-save", {
                enValue: this.enValue,
                chValue: this.chValue,
                description: this.description
            })

            if (this.isAdd.length != 0) {
                requestData = {
                    "form": {
                        "id": "ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95"
                    },
                    "constraintList": [this.matchField()]

                }
                console.log(requestData)
            } else {
                requestData = {
                    "form": {
                        "id": "ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95"
                    },
                    "constraintList": [
                        {
                            "nameEn": this.enValue,
                            "nameCh": this.chValue,
                            "des": this.description,
                            "type": null,
                            "length": null,
                            "defaultValue": null,
                            "group": null,
                            "regularExpression": null
                        }
                    ]
                }
            }

            console.log(requestData)
            //todo 添加的时候页面不会更新，不知道为什么修改了他就更新了，我真的是日
            auth.modifyGroupPropData(JSON.stringify(requestData)).then((res: any) => {
                this.$emit("on-cancel")
                alert(res.msg)
            })
        }

        matchField() {
            for (let i = 0; i < auth.constraintList.length; i++) {
                if (auth.constraintList[i].nameEn == this.oldArray[0] && auth.constraintList[i].nameCh == this.oldArray[1]) {
                    auth.constraintList[i].nameEn = this.enValue
                    auth.constraintList[i].nameCh = this.chValue
                    auth.constraintList[i].des = this.description
                    return auth.constraintList[i]
                }
            }
        }


        beforeMount() {
            if (this.isAdd.length == 0) {
                this.title = "添加新字段"
            } else {
                this.title = "修改属性"
                this.enValue = this.isAdd[0]
                this.chValue = this.isAdd[1]
                this.description = this.isAdd[2]
                this.oldArray = this.isAdd
            }
        }
    }
</script>