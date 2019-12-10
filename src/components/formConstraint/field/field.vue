<style lang="scss" scoped>
    @import "scss/mixin";

    .form-container {
        width: 1528px;
        margin: auto;
        background-color: rgba(255, 255, 255, 1);
        opacity: 1;
    }

    .form-data-title {
        width: 100%;
    }

    .form-data-content {
        height: 68px;
        display: inline-block;
        width: 230px;
        vertical-align: top;
        border-right: 2px solid rgba(245, 245, 245, 1);
        border-bottom: 2px solid rgba(245, 245, 245, 1);
        line-height: 68px;
        font-size: 23px;
        overflow: hidden;
    }

    .form-data-content-operate {
        width: 360px;
    }

    .expressionBtn {
        height: 75%;
        width: 60%;
        margin: 8.5px auto;
        border: 1px solid gray;
        border-radius: 8px;
        line-height: 51px;
        cursor: pointer;
    }

    .fieldcancelBtn {
        display: inline-block;
        height: 75%;
        width: 35%;
        margin: 8.5px 0 0 10px;
        border: 1px solid gray;
        border-radius: 8px;
        line-height: 51px;
        cursor: pointer;
    }

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
    <div class="form-container">
        <div class="form-data-title">
            <div class="form-data-content">英文</div>
            <div class="form-data-content">中文</div>
            <div class="form-data-content">含义</div>
            <div class="form-data-content">约束</div>
            <div class="form-data-content">表达式</div>
            <div class="form-data-content form-data-content-operate">操作</div>
        </div>
        <div class="form-data-title" v-for="(dataList, index) in constraintList" :key="index">
            <div class="form-data-content">{{dataList.nameEn}}</div>
            <div class="form-data-content">{{dataList.nameCh}}</div>
            <div class="form-data-content">{{dataList.des}}</div>
            <div class="form-data-content">
                <div class="fieldPropbtn" @click="showReg(index)">
                    添加约束
                </div>
            </div>
            <div class="form-data-content">
                <div class="expressionBtn" @click="showExp(index)">
                    表达式
                </div>
            </div>
            <div class="form-data-content form-data-content-operate">
                <div class="fieldPropbtn" @click="showAdd(index)">
                    修改属性
                </div>
                <div class="fieldcancelBtn" @click="deleteSingle(index)">
                    删除
                </div>
            </div>
        </div>
        <addField v-if="addField" :isAdd="transmissionData" @on-cancel="addField=false"></addField>
        <editExpression @on-cancel="showExpression = false" @on-save="saveExp" v-if="showExpression"
                        :expressionList="transmissionExp" :oldName="ExpOld"></editExpression>
        <regularExpression @on-cancel="showRegular=false" @on-save="saveRegular" v-if="showRegular"
                           :oldRegName="oldRegName"></regularExpression>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import editExpression from "@/components/editExpression/editExpression.vue";
    import addField from "@/components/addField/addField.vue";
    import fieldmeanBtn from "@/components/formConstraint/field/fieldmeanBtn/fieldmeanBtn.vue";
    import expressionBtn from "@/components/formConstraint/field/expressionBtn/expressionBtn.vue";
    import fieldPropbtn from "@/components/formConstraint/field/fiedPropbtn/fieldPropbtn.vue";
    import regularExpression from "@/components/regularExpression/regularExpression.vue";
    import fieldcancelBtn from "@/components/formConstraint/field/fieldcancelBtn/fieldcancelBtn.vue";
    import store from '@/store';
    import {getModule} from 'vuex-module-decorators';
    import {Prop, Watch} from "vue-property-decorator";
    import Auth from '@/store/modules/FiledManage'

    const auth = getModule(Auth, store);

    @Component({
        components: {
            fieldmeanBtn,
            expressionBtn,
            fieldPropbtn,
            fieldcancelBtn,
            editExpression,
            addField,
            regularExpression
        }
    })
    export default class field extends Vue {
        edit: boolean = false;
        showExpression: boolean = false
        addField: boolean = false
        showRegular: boolean = false
        deleteField: object = {}
        public  constraintList: any = [];
        oldRegName: string = ''
        ExpOld: string = ""
        transmissionData: string[] = []
        transmissionExp: Array<object> = []
        data: object = {
            "form": {
                "id": "ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95" // 参看表单中获取 demo可用 ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95
            },
        }

        get ListData() {
            return auth.constraintList
        }

        @Watch("ListData")
        getCount() {
            this.constraintList = auth.constraintList
        }

        showExp(index: number) {
            this.getNameEnCh(index)
            for (let i = 0; i < auth.constraintList.length; i++) {
                if (index == i) {
                    console.log("diaoni")
                    this.ExpOld = auth.constraintList[i].nameCh
                    break
                }
            }
            console.log(this.transmissionExp)
            this.showExpression = true
        }

        showReg(index: number) {
            for (let i = 0; i < auth.constraintList.length; i++) {
                if (index == i) {
                    this.oldRegName = auth.constraintList[i].nameCh
                    break
                }
            }
            this.showRegular = true
        }

        saveRegular(data: object) {
            let requestData = null
            console.log(data)
            requestData = {
                "form": {
                    "id": "ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95"
                },
                "constraintList": [
                    this.matchNameReg(data)
                ]
            }

            auth.modifyGroupPropData(JSON.stringify(requestData)).then((res: any) => {
                alert(res.msg)
                auth.getFormData({
                    form: {
                        "id": "ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95"
                    }
                }).then((res: any) => {
                    auth.setList(res.data.constraintList)
                })
            })
            this.showRegular = false
        }

        saveExp(data: object) {
            let requestData = null
            console.log(data)
            requestData = {
                "form": {
                    "id": "ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95"
                },
                "constraintList": [
                    this.matchNameCh(data)
                ]
            }

            auth.modifyGroupPropData(JSON.stringify(requestData)).then((res: any) => {
                alert(res.msg)
                auth.getFormData({
                    form: {
                        "id": "ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95"
                    }
                }).then((res: any) => {
                    auth.setList(res.data.constraintList)
                })
            })


            this.showExpression = false
        }

        matchNameCh(data: any) {
            for (let i = 0; i < auth.constraintList.length; i++) {
                if (data.oldName == auth.constraintList[i].nameCh) {
                    auth.constraintList[i].defaultValue = ""
                    for (let j = 0; j < data.chooseList.length; j++) {
                        auth.constraintList[i].defaultValue += data.chooseList[j]
                    }
                    return auth.constraintList[i]
                }
            }
        }

        matchNameReg(data: any) {
            for (let i = 0; i < auth.constraintList.length; i++) {
                if (data.oldRegName == auth.constraintList[i].nameCh) {
                    auth.constraintList[i].regularExpression = data.regular
                    auth.constraintList[i].length = data.length
                    return auth.constraintList[i]
                }
            }
        }

        showAdd(index: number) {
            this.transmissionData = []
            for (let i = 0; i < auth.constraintList.length; i++) {
                if (i == index) {
                    this.transmissionData.push(auth.constraintList[i].nameEn, auth.constraintList[i].nameCh, auth.constraintList[i].des)
                    console.log(this.transmissionData)
                    break
                }
            }
            this.addField = true
        }

        deleteSingle(index: number) {
            let requestData = null
            let deleteId = this.getDeleteId(index)

            auth.constraintList.splice(index, 1)

            requestData = {
                "form": {
                    "id": "ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95"
                },
                "constraintList": [
                    {id: deleteId}
                ]
            }

            auth.deleteField(JSON.stringify(requestData)).then((res: any) => {
                alert(res.msg)
                auth.getFormData({
                    form: {
                        "id": "ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95"
                    }
                }).then((res: any) => {
                    auth.setList(res.data.constraintList)
                    auth.setGroup()
                    this.constraintList = auth.constraintList
                })
            })
        }

        getDeleteId(index: number) {
            for (let i = 0; i < auth.constraintList.length; i++) {
                if (i == index) {
                    console.log(auth.constraintList[i].id)
                    return auth.constraintList[i].id
                }
            }
        }

        canceleditExpression() {
            this.showExpression = false
        }

        getNameEnCh(index: number) {
            this.transmissionExp = []
            for (let i = 0; i < auth.constraintList.length; i++) {
                this.transmissionExp.push({value: auth.constraintList[i].nameCh, label: auth.constraintList[i].nameCh})
            }
        }

        mounted() {
            this.deleteField = {}
            this.constraintList.length = 0;
            auth.getFormData(this.data).then((res: any) => {
                this.constraintList = res.data.constraintList
                auth.setList(res.data.constraintList)
                auth.setGroup()
            })
        }
    }
</script>