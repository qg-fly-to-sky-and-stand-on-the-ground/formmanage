<style lang="scss" scoped>
    @import "scss/mixin";
    .form-container {
        width: 1528px;
        height: auto;
        margin: auto;
        margin-top: 24px;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        opacity: 1;
        border-radius: 8px;
    }

    .form-data-title {
        height: 70px;
        width: 100%;
    }

    .form-data-content {
        display: inline-block;
        height: 68px;
        width: 230px;
        vertical-align: top;
        border-right: 2px solid rgba(245, 245, 245, 1);
        border-bottom: 2px solid rgba(245, 245, 245, 1);
        line-height: 68px;
        font-size: 23px;
    }

    .form-data-content-operate {
        width: 365px;
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
                    <fieldmeanBtn></fieldmeanBtn>
                </div>
                <div class="form-data-content">{{dataList.constraint}}</div>
                <div class="form-data-content form-data-content-operate">{{dataList.constraint}}</div>
            </div>
        </div>
        <!--        <editConstraint v-if="edit" :edit="edit" @on-close="closeDialog"></editConstraint>-->

</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    // import editConstraint from "@/components/formConstraint/field/editConstraint/editConstraint.vue";
    // import singleConstraint from "@/components/formConstraint/field/editConstraint/singleConstraint/singleConstraint.vue";
    import fieldmeanBtn from "@/components/formConstraint/field/fieldmeanBtn/fieldmeanBtn.vue";
    import store from '@/store';
    import {getModule} from 'vuex-module-decorators';
    import Auth from '@/store/modules/FiledManage'

    const auth = getModule(Auth, store);

    @Component({
        components: {
            fieldmeanBtn
        }
    })
    export default class field extends Vue {
        edit: boolean = false;
        constraintList: Array<object> = [
            {
                "nameEn":"NSRMC",
                "nameCh":"纳税人名称",
                "des":"纳税人的名称",
                "type":"SINGLE_COLUMN",
                "length":"0-10",
                "defaultValue":"100",
                "group":"MX",
                "regularExpression":"xxx"
            },
            {
                "nameEn":"NSRMC",
                "nameCh":"纳税人名称",
                "des":"纳税人的名称",
                "type":"SINGLE_COLUMN",
                "length":"0-10",
                "defaultValue":"100",
                "group":"MX",
                "regularExpression":"xxx"
            },
            {
                "nameEn":"NSRMC",
                "nameCh":"纳税人名称",
                "des":"纳税人的名称",
                "type":"SINGLE_COLUMN",
                "length":"0-10",
                "defaultValue":"100",
                "group":"MX",
                "regularExpression":"xxx"
            },
        ];
        data: object = {
            "form":{
                "id":"ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95" // 参看表单中获取 demo可用 ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95
            },
        }

        mounted () {
            auth.getFormData(this.data).then((res: object) => {
                console.log(res)
            })
        }
    }
</script>