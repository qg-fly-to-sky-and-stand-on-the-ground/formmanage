<style lang="scss" scoped>
    @import "scss/mixin";
    .form-out-container {
        width: 100%;
        height: auto;
    }

    .formconstraint-header{
        position: relative;
        width: 100%;
        height: 60px;
        margin-top: 24px;
    }

    .formconstraint-title {
        position: absolute;
        height: 100%;
        width: 150px;
        margin-left: 40px;
        font-size: 28px;
        line-height: 60px;
        text-align: left;
    }

    .add-fied-btn {
        position: absolute;
        height: 100%;
        width: 168px;
        font-size: 17px;
        line-height: 60px;
        right: 24px;
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
        border-radius:8px;
    }
    .cancel-fied-btn {
        position: absolute;
        height: 100%;
        width: 128px;
        font-size: 17px;
        line-height: 60px;
        right: 204px;
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
        border-radius:8px;
    }
    .edit-fied-btn {
        position: absolute;
        height: 100%;
        width: 128px;
        font-size: 17px;
        line-height: 60px;
        right: 344px;
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
        border-radius:8px;
    }

    .form-container {
        width: 1528px;
        height: auto;
        margin: auto;
        margin-top: 24px;
        background-color: rgba(255,255,255,1);
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
        opacity:1;
        border-radius:8px;
    }

    .form-data-title {
        height: 70px;
        width: 100%;
    }

    .form-data-content {
        display: inline-block;
        height: 68px;
        width: 507.3px;
        vertical-align: top;
        border-right: 2px solid rgba(245,245,245,1);
        border-bottom: 2px solid rgba(245,245,245,1);
        line-height: 68px;
        font-size: 23px;
    }


</style>

<template>
    <div class="form-out-container">
        <div class="formconstraint-header">
            <div class="formconstraint-title">表单约束</div>
            <div class="add-fied-btn">编辑约束字段</div>
            <div class="cancel-fied-btn">删除字段</div>
            <div class="edit-fied-btn">添加字段</div>
        </div>

        <div class="form-container">
            <div class="form-data-title">
                <div class="form-data-content">数据字段</div>
                <div class="form-data-content">字段含义</div>
                <div class="form-data-content">字段约束</div>
            </div>
            <div class="form-data-title">
                <div class="form-data-content">数据字段1</div>
                <div class="form-data-content">字段含义1</div>
                <div class="form-data-content"></div>
            </div>
            <div class="form-data-title">
                <div class="form-data-content">数字字段2</div>
                <div class="form-data-content">字段含义2</div>
                <div class="form-data-content"></div>
            </div>
            <div class="form-data-title">
                <div class="form-data-content">数字字段</div>
                <div class="form-data-content">字段含义</div>
                <div class="form-data-content"></div>
            </div>
            <div class="form-data-title">
                <div class="form-data-content">数字字段3</div>
                <div class="form-data-content">字段含义3</div>
                <div class="form-data-content"></div>
            </div>
            <div class="form-data-title">
                <div class="form-data-content">数字字段</div>
                <div class="form-data-content">字段含义</div>
                <div class="form-data-content">字段约束</div>
            </div>
            <div class="form-data-title">
                <div class="form-data-content">数字字段</div>
                <div class="form-data-content">字段含义</div>
                <div class="form-data-content">字段约束</div>
            </div>
        </div>
        <editConstraint></editConstraint>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import editConstraint from '@/components/formConstraint/editConstraint/editConstraint.vue';

    @Component ({
        components: {
            editConstraint
        }
    })
    export default class Header extends Vue {

    }
</script>