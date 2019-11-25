<style lang="scss" scoped>
    @import "scss/mixin";
    .single-constraint-container {
        height: 100%;
        width: 100%;
    }

    .field-content {
        height: 40px;
        width: 100%;
        text-align: left;
        margin-top: 15px;
    }

    .checkbox-container {
        vertical-align: top;
        display: inline-block;
        height: 100%;
        width: 10%;
        font-size: 0;
    }

    .checkbox{
        background-color:rgba(255,255,255,1);
        border:1px solid rgba(112,112,112,1);
        height: 20px;
        width: 20px;
        margin-top: 10px;
    }

    .chose-field {
        text-align: center;
        line-height: 40px;
        vertical-align: top;
        display: inline-block;
        height: 100%;
        width: 87%;
        border:1px solid rgba(112,112,112,1);
        border-radius:8px;
        color: black;
        font-size: 17px;
    }
</style>

<template>
    <div class="single-constraint-container">
        <div class="field-content">
            <div class="checkbox-container">
                <input type="checkbox" class="checkbox"/>
            </div>
            <div class="chose-field">单字段1</div>
        </div>
        <div class="field-content">
            <div class="checkbox-container">
                <input type="checkbox" class="checkbox"/>
            </div>
            <div class="chose-field">单字段1</div>
        </div>
        <div class="field-content">
            <div class="checkbox-container">
                <input type="checkbox" class="checkbox"/>
            </div>
            <div class="chose-field">单字段1</div>
        </div>
        <div class="field-content">
            <div class="checkbox-container">
                <input type="checkbox" class="checkbox"/>
            </div>
            <div class="chose-field">单字段1</div>
        </div>
        <div class="field-content">
            <div class="checkbox-container">
                <input type="checkbox" class="checkbox"/>
            </div>
            <div class="chose-field">单字段1</div>
        </div>
        <div class="field-content">
            <div class="checkbox-container">
                <input type="checkbox" class="checkbox"/>
            </div>
            <div class="chose-field">单字段1</div>
        </div>
        <div class="field-content">
            <div class="checkbox-container">
                <input type="checkbox" class="checkbox"/>
            </div>
            <div class="chose-field">单字段1</div>
        </div>
        <div class="field-content">
            <div class="checkbox-container">
                <input type="checkbox" class="checkbox"/>
            </div>
            <div class="chose-field">单字段1</div>
        </div>
        <div class="field-content">
            <div class="checkbox-container">
                <input type="checkbox" class="checkbox"/>
            </div>
            <div class="chose-field">单字段1</div>
        </div>
        <div class="field-content">
            <div class="checkbox-container">
                <input type="checkbox" class="checkbox"/>
            </div>
            <div class="chose-field">单字段1</div>
        </div>
        <div class="field-content">
            <div class="checkbox-container">
                <input type="checkbox" class="checkbox"/>
            </div>
            <div class="chose-field">单字段1</div>
        </div>
        <div class="field-content">
            <div class="checkbox-container">
                <input type="checkbox" class="checkbox"/>
            </div>
            <div class="chose-field">单字段1</div>
        </div>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';

    @Component
    export default class Header extends Vue {

    }
</script>