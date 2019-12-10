<style lang="scss" scoped>
    @import "scss/mixin";

    .form-out-container {
        height: 79vh;
    }

    .formconstraint-header {
        position: relative;
        width: 100%;
        height: 70px;
        margin-top: 24px;
    }

    .formconstraint-title {
        position: absolute;
        height: 100%;
        width: 500px;
        margin-left: 40px;
        font-size: 28px;
        line-height: 60px;
        text-align: left;
    }

    .field {
        font-size: 25px;
        height: 90%;
        width: 100px;
        background-color: #FAFAFA;
        cursor: pointer;
    }

    .border-bottom {
        border-bottom: 2px solid #5F7DDE;
    }

    .field-right {
        font-size: 25px;
        height: 90%;
        width: 100px;
        background-color: #FAFAFA;
        margin-left: 15px;
        cursor: pointer;
    }

    .add-fied-btn {
        position: absolute;
        height: 100%;
        width: 168px;
        font-size: 17px;
        line-height: 60px;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 8px;
        margin-right: 24px;
    }

    .cancel-fied-btn,.edit-fied-btn {
        float: right;
        height: 80%;
        width: 128px;
        font-size: 17px;
        line-height: 60px;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 8px;
        background:rgba(255,255,255,1);
        margin-right: 24px;
    }




    .field-group {
        width: 1528px;
        height: 95%;
        overflow-y: scroll;
        overflow-x: hidden;
        margin: auto;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        background:rgba(255,255,255,1);
    }

    .field-group::-webkit-scrollbar {/*滚动条整体样式*/
        width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
    }
    .field-group::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.2);
    }
    .ifield-group::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }

    .button-container {
        width: 100%;
        height: 60px;
        margin-top: 40px;
        text-align: center;
    }

    .form-data-title {
        width: 1528px;
        margin: auto;
        background-color: white;
    }

    .form-data-content {
        display: inline-block;
        width: 230px;
        vertical-align: top;
        border-right: 2px solid rgba(245, 245, 245, 1);
        border-bottom: 2px solid rgba(245, 245, 245, 1);
        line-height: 68px;
        font-size: 15px;
        overflow: hidden;
    }

    .form-data-content-operate {
        width: 378px;
    }
</style>

<template>
    <div class="form-out-container">
        <div class="formconstraint-header">
            <div class="formconstraint-title">
                <input :class="fieldClass" value="字段" type="button" @click="seenType=true">
                <input :class="groupClass" value="群组" type="button" @click="seenType=false">
            </div>
            <input class="edit-fied-btn" type="button" value="添加群组" @click="addGroup" v-if="!seenType">
            <input class="cancel-fied-btn" type="button" value="添加字段" @click="seenField=true" v-if="seenType">
        </div>

        <div class="field-group">
            <field v-if="seenType"></field>
            <group v-if="!seenType"></group>
        </div>

        <EditFiled v-if="seenEditFiled" :name="GroupName" @on-cancel="seenEditFiled=false"
                   @on-save="saveEditFiled"></EditFiled>
        <addField v-if="seenField" @on-cancel="cancelAddField" :isAdd="[]" @on-save="addField"></addField>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import field from '@/components/formConstraint/field/field.vue'
    import group from "@/components/formConstraint/group/group.vue";
    import EditGroupFiled from '@/components/editGroupFiled/EditGroupFiled.vue'
    import addField from "@/components/addField/addField.vue";
    import store from '@/store';
    import EditFiled from "@/components/editFiled/EditFiled.vue";
    import Auth from '@/store/modules/FiledManage'
    import {getModule} from 'vuex-module-decorators';

    const auth = getModule(Auth, store);

    @Component({
        components: {
            field,
            group,
            EditFiled,
            EditGroupFiled,
            addField
        }
    })
    export default class formConstraint extends Vue {
        seenType: boolean = true
        seenEditFiled: boolean = false
        seenField: boolean = false
        GroupName: string = ''

        get fieldClass() {
            if (this.seenType == true) {
                return "field border-bottom"
            }
            return "field"
        }

        get groupClass() {
            if (this.seenType == true) {
                return "field-right"
            }
            return "field-right border-bottom"
        }

        get watchData() {
            return auth.constraintList
        }

        // cancelEditFiled() {
        //     this.seenEditFiled = false
        // }

        cancelAddField() {
            console.log("fuck")
            this.seenField = false
            this.seenType = false
            this.seenType = true
        }

        addField() {

        }

        saveEditFiled(data: any) {
            console.log(data)
            this.seenEditFiled = false
            this.$set(auth.groupType, data.name, {
                groupName: data.name,
                type: data.type,
                groupString: '',
                member: []
            })
            console.log(auth.groupType)
            console.log(auth.groupType)
        }

        addGroup() {
            this.seenEditFiled = true
        }
    }
</script>