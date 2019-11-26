<style lang="scss" scoped>
    @import "scss/mixin";

    .form-out-container {
        width: 100%;
        height: auto;
    }

    .formconstraint-header {
        position: relative;
        width: 100%;
        height: 60px;
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
        height: 72%;
        width: 100px;
        background-color: #FAFAFA;
        cursor: pointer;
    }

    .border-bottom {
        border-bottom: 2px solid #5F7DDE;
    }

    .field-right {
        font-size: 25px;
        height: 72%;
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
        right: 24px;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 8px;
    }

    .cancel-fied-btn {
        position: absolute;
        height: 100%;
        width: 128px;
        font-size: 17px;
        line-height: 60px;
        right: 204px;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 8px;
    }

    .edit-fied-btn {
        position: absolute;
        height: 100%;
        width: 128px;
        font-size: 17px;
        line-height: 60px;
        right: 344px;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 8px;
    }

    .field-group {
        width: 1528px;
        height: 650px;
        overflow-y: scroll;
        overflow-x: hidden;
        margin: auto;
        margin-top: 24px;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        opacity: 1;
        border-radius: 8px;
    }
</style>

<template>
    <div class="form-out-container">
        <div class="formconstraint-header">
            <div class="formconstraint-title">
                <input :class="fieldClass" value="字段" type="button" @click="seenType=true">
                <input :class="groupClass" value="群主" type="button" @click="seenType=false">
            </div>
            <div class="edit-fied-btn">添加字段</div>
            <div class="cancel-fied-btn">添加群组</div>
        </div>

        <div class="field-group">
            <field v-if="seenType"></field>
            <group v-if="!seenType"></group>
        </div>


<!--        <editConstraint v-if="edit" :edit="edit" @on-close="closeDialog"></editConstraint>-->
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import field from '@/components/formConstraint/field/field.vue'
    import group from "@/components/formConstraint/group/group.vue";

    @Component({
        components: {
            field,
            group
        }
    })
    export default class formConstraint extends Vue {
        seenType: boolean = true

        get fieldClass() {
            if(this.seenType == true) {
                return "field border-bottom"
            }
            return "field"
        }

        get groupClass() {
            if(this.seenType == true) {
                return "field-right"
            }
            return "field-right border-bottom"
        }
    }
</script>