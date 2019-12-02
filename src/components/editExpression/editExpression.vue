<style lang="scss" scoped>
    @import "scss/mixin";

    .expression-container {
        position: relative;
        width: 736px;
        height: 80%;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 8px;
        text-align: left;
        overflow: hidden;

        .expression-header-name {
            height: 7%;
            width: 100%;
            float: left;
            margin-left: 20px;
            margin-top: 2%;
            font-size: 26px;
            font-weight: 400;
            color: rgb(112, 112, 112);
            opacity: 1;
            text-align: left;
        }

        .expression-title {
            height: 16%;
            width: 80%;
            margin: auto;
            text-align: left;
            font-size: 20px;
            color: rgba(70, 77, 92, 1);
        }

        .choose-field-container {
            height: 60%;
            width: 80%;
            margin: auto;

            .choose-field {
                height: 10%;
                width: 100%;
            }
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
        <div class="expression-container">
            <div class="expression-header-name">编辑表达式</div>
            <div class="expression-title">表达式1=</div>
            <div class="choose-field-container">
                <div class="choose-field">
                    <Select v-model="chooseList" multiple :max-tag-count="4">
                        <OptionGroup label="字段">
                            <Option v-for="item in expList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                        </OptionGroup>
                        <OptionGroup label="符号">
                            <Option v-for="item in SymbolList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                        </OptionGroup>
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

    @Component({
        components: {CustomHeader, GlobalLayer}
    })
    export default class editExpression extends Vue {
        @Prop() expressionList!: Array<object>;

        @Prop(String) oldName!: string;

        expList: Array<object> = []

        chooseList: string[] = []

        SymbolList: Array<object> = [
            {
                value: "+",
                label: "+"
            },
            {
                value: "-",
                label: "-"
            },
            {
                value: "×",
                label: "×"
            },
            {
                value: "÷",
                label: "÷"
            },
        ]



        cancel() {
            this.$emit('on-cancel');
        }

        save() {
            //todo 不知道怎么弄一个多选
            if(this.chooseList.length == 0) {
                operationFailMsg('表达式不能为空')
                return; ;
            }
            for(let i = 0; i < this.chooseList.length; i++) {
                if(i % 2 == 1) {
                    if(!(this.chooseList[i] == "+" || this.chooseList[i] == "-" || this.chooseList[i] == "×" || this.chooseList[i] == "÷")) {
                        console.log("fuck")
                        operationFailMsg('请选择正确的表达式');
                        return ;
                    }
                } else {
                    if(this.chooseList[i] == "+" || this.chooseList[i] == "-" || this.chooseList[i] == "×" || this.chooseList[i] == "÷") {
                        console.log("fuck")
                        operationFailMsg('请选择正确的表达式');
                        return ;
                    }
                }
            }
            console.log(this.chooseList)

            this.$emit('on-save', {
                chooseList: this.chooseList,
                oldName: this.oldName
            });
        }

        monitorChange(value: any) {
            if (value.length % 2 == 1) {
                this.expList = [
                    {
                        value: "+",
                        label: "+"
                    },
                    {
                        value: "-",
                        label: "-"
                    },
                    {
                        value: "×",
                        label: "×"
                    },
                    {
                        value: "÷",
                        label: "÷"
                    },
                ]
            } else {
                this.expList = this.expressionList
            }
        }

        beforeMount() {
            this.expList = this.expressionList
            console.log(this.expList)
        }
    }
</script>