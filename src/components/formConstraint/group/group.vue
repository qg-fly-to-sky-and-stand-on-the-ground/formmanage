<style lang="scss" scoped>
    @import "scss/mixin";

    .group-container {
        width: 1528px;
        height: auto;
        margin: auto;
        background-color: rgb(255, 255, 255);
        opacity: 1;
    }

    .group-title {
        height: 67px;
        width: 100%;
    }

    .group-name {
        display: inline-block;
        height: 68px;
        width: 250px;
        vertical-align: top;
        border-right: 2px solid rgba(245, 245, 245, 1);
        border-bottom: 2px solid rgba(245, 245, 245, 1);
        line-height: 68px;
        font-size: 23px;
    }

    .group-operate {
        display: inline-block;
        height: 68px;
        width: 399px;
        vertical-align: top;
        border-right: 2px solid rgba(245, 245, 245, 1);
        border-bottom: 2px solid rgba(245, 245, 245, 1);
        line-height: 68px;
        font-size: 23px;
    }

    .group-type {
        display: inline-block;
        height: 68px;
        width: 250px;
        vertical-align: top;
        border-right: 2px solid rgba(245, 245, 245, 1);
        border-bottom: 2px solid rgba(245, 245, 245, 1);
        line-height: 68px;
        font-size: 23px;
    }

    .group-feild {
        display: inline-block;
        height: 68px;
        width: 625px;
        vertical-align: top;
        border-right: 2px solid rgba(245, 245, 245, 1);
        border-bottom: 2px solid rgba(245, 245, 245, 1);
        line-height: 68px;
        font-size: 23px;

        input {
            display: inline-block;
            height: 98%;
            width: 90%;
            border: 0;
        }

        img {
            display: inline-block;
            height: 30px;
            width: 30px;
            cursor: pointer;
        }
    }

    .group-content-operate {
        width: 365px;
    }


</style>

<template>
    <div class="group-container">
        <div class="group-title">
            <div class="group-name">群组名</div>
            <div class="group-type">类型</div>
            <div class="group-feild">所含字段</div>
            <div class="group-operate">操作</div>
        </div>
        <div class="group-title" v-for="(value, key, index) in groupSort" :key="key">
            <div class="group-name">{{key}}</div>
            <div class="group-type">{{value.type}}</div>
            <div class="group-feild">
                <input ref="a" :value="value.groupString" @input="cutString($event)" type="text">
                <img src="../../../assets/groupEdit.png" @click="openEditGroupFiled(key)">
            </div>
            <div class="group-operate">
                <fieldPropbtn @click.native="modifyField(key)"></fieldPropbtn>
                <fieldcancelBtn @click.native="remove(key)"></fieldcancelBtn>
            </div>
        </div>

        <EditFiled v-if="seenEdit" :name="name" @on-cancel="cancelEditFiled" @on-save="saveEditFiled"></EditFiled>
        <EditGroupFiled v-if="seenEditGroupFiled" :name="GroupName" :filedList="filedList" :allFiledList="allFiledList" @on-cancel="cancelEditGroupFiled" @on-save="saveEditGroupFiled"></EditGroupFiled>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import store from '@/store';
    import {getModule} from 'vuex-module-decorators';
    import Auth from '@/store/modules/FiledManage'
    import fieldPropbtn from "@/components/formConstraint/field/fiedPropbtn/fieldPropbtn.vue";
    import fieldcancelBtn from "@/components/formConstraint/field/fieldcancelBtn/fieldcancelBtn.vue";
    import EditGroupFiled from '@/components/editGroupFiled/EditGroupFiled.vue'
    import EditFiled from "@/components/editFiled/EditFiled.vue";


    const auth = getModule(Auth, store);


    @Component({
        components: {
            EditFiled,
            EditGroupFiled,
            fieldPropbtn,
            fieldcancelBtn
        }
    })
    export default class group extends Vue {
        seenEdit: boolean = false
        seenEditGroupFiled: boolean = false
        name: string = ''
        GroupName: string = ''
        filedList: Array<object> = []
        allFiledList: Array<object> = []
        //用来装分组group
        groupSort: any = {}
        modifyGroupProp: any = {}

        get groupType() {
            return auth.groupType
        }

        /**
         * 点击笔修改字段
         */
        openEditGroupFiled(key: any) {
            this.GroupName = key
            this.filedList = []
            this.allFiledList = []

            console.log(this.GroupName)
            console.log(auth.groupType)
            console.log(key)
            //todo 当找不到要处理一
            for(let i in auth.groupType) {
                if(i == key) {
                    console.log(auth.groupType[i])
                    if(auth.groupType[i].member.length != 0) {
                        for(let j = 0; j < auth.groupType[i].member.length; j++) {
                            this.filedList.push(auth.groupType[i].member[j].nameEn)
                        }
                    }
                }
            }
            for(let i = 0; i < auth.constraintList.length; i++) {
                if(!(auth.constraintList[i].nameEn in this.allFiledList)) {
                    this.allFiledList.push(auth.constraintList[i].nameEn)
                }
            }
            this.seenEditGroupFiled = true
            console.log(this.filedList)
        }

        cancelEditGroupFiled() {
            this.seenEditGroupFiled = false
        }


        saveEditGroupFiled(ResultData: any) {
            this.seenEditGroupFiled = false
            this.sendConstraint(ResultData)
        }

        cancelEditFiled() {
            this.seenEdit = false
        }

        saveEditFiled(data: object) {
            this.seenEdit = false
            console.log(data)
            this.modifyConstraint(data)
            // auth.modifyGroupPropData(data)
            console.log(auth.constraintList)
        }

        modifyField(key: any) {
            this.seenEdit = true;
            for (let i in this.groupType) {
                if (i == key) {
                    this.name = key
                    break
                }
            }
            this.groupSort = auth.groupType
        }

        deleteData(key: any) {
            let requestData = null
            console.log(key)
            for(let i = 0; i < auth.constraintList.length; i++) {
                if(auth.constraintList[i].group == key) {
                    console.log(key)
                    auth.constraintList[i].group = null
                }
            }
            requestData = {
                "form":{
                    "id":"uuid" // 参看表单中获取 demo可用 ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95
                },
                "constraintList": auth.constraintList
            }
            //todo 好像还有点bug
            auth.modifyGroupPropData(JSON.stringify(requestData)).then ((res: any) => {
                alert(res.msg)
                auth.getFormData({
                    form: {
                        "id": "ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95"
                    }
                }).then((res: any) => {
                    auth.setList(res.data.constraintList)
                    auth.setGroup()
                    this.groupSort = auth.groupType
                    console.log(auth.groupType)
                })
            })


        }

        remove(key: any) {
            delete auth.groupType[key]
            this.groupSort = auth.groupType
            this.deleteData(key)
            console.log(auth.groupType)
        }

        /**
         * 修改constraintList列表然后把数据重新提交给后台
         */
        cutString(e: any) {
            console.log(e.target.value)
        }


        sendConstraint(data: any) {
            let tempConstraint = null
            console.log(auth.constraintList)
            console.log(data)

            console.log(data.name)

            for (let i = 0; i < auth.constraintList.length; i++) {
                if(data.addField.length != 0) {
                    for(let j = 0; j < data.addField.length; j++) {
                        if(auth.constraintList[i].nameEn == data.addField[j]) {
                            console.log("fuck")
                            console.log(auth.constraintList[i].nameEn)
                            auth.constraintList[i].group = data.name
                        }
                    }
                }
                if(data.deleteField.length != 0) {
                    for(let k = 0; k < data.deleteField.length; k++) {
                        if(auth.constraintList[i].nameEn ==  data.deleteField[k]) {
                            console.log(auth.constraintList[i].nameEn)
                            auth.constraintList[i].group = null
                        }
                    }
                }
            }
            tempConstraint = {
                "form": {
                    "id":"ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95"
                },
                "constraintList": auth.constraintList
            }
            console.log(tempConstraint)
            auth.modifyGroupPropData(JSON.stringify(tempConstraint)).then ((res: any) => {
                alert(res.msg)
                auth.getFormData({
                    form: {
                        "id": "ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95"
                    }
                }).then((res: any) => {
                    auth.setList(res.data.constraintList)
                    auth.setGroup()
                    this.groupSort = auth.groupType
                })
            })
        }


        /**
         * 修改constraintList列表然后把数据重新提交给后台
         */
        modifyConstraint(data: any) {
            let tempConstraint = null
            console.log(auth.constraintList)
            console.log(data)
            for (let i = 0; i < auth.constraintList.length; i++) {
                console.log(auth.constraintList[i].group)
                if (auth.constraintList[i].group == data.oldName) {
                    console.log(data.name)
                    auth.constraintList[i].type = data.type
                    auth.constraintList[i].group = data.name
                    console.log(auth.constraintList[i])
                }
            }
            tempConstraint = {
                "form": {
                    "id":"ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95"
                },
                "constraintList": auth.constraintList
            }
            console.log(tempConstraint)
            auth.modifyGroupPropData(JSON.stringify(tempConstraint)).then ((res: any) => {
                console.log(res.msg)
                auth.getFormData({
                    form: {
                        "id": "ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95"
                    }
                }).then((res: any) => {
                    auth.setList(res.data.constraintList)
                    auth.setGroup()
                    console.log(auth.groupType)
                    this.groupSort = auth.groupType
                })
            })
        }

        mounted() {
            console.log(auth.constraintList)
            this.groupSort = auth.groupType
        }


    }
</script>