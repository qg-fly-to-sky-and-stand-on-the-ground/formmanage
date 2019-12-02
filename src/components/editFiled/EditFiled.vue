<style lang="scss" scoped>
@import "scss/mixin";
.edit-filed-container {
  position: relative;
  width:736px;
  height:338px;
  background:rgba(255,255,255,1);
  box-shadow:0px 3px 6px rgba(0,0,0,0.16);
  border-radius:8px;
  overflow: hidden;

  .item-container {
    width: 100%;
    display: flex;
    height: 48px;
    margin-top: 20px;

    .item-key {
      display: block;
      float: left;
      width: 170px;
      text-align: end;
      font-size:24px;
      font-weight:400;
      line-height:48px;
      color:rgba(70,77,92,1);
      margin-right: 36px;
    }
  }

  .name-input {
    display: block;
    float: left;
    width:460px;
    font-size: 24px;
    padding-left: 10px;
    padding-right: 10px;
    height:48px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(70,77,92,1);
    opacity:1;
    border-radius:4px;
  }

  .radio-group {
    @include vertical-center;
  }

  .button-container {
    width: 100%;
    height: 60px;
    margin-top: 40px;
  }
}
</style>

<template>
  <global-layer>
    <div class="edit-filed-container">
      <custom-header
        :name="title"
      ></custom-header>
      <div class="item-container">
        <span class="item-key">中文名称</span>
        <input class="name-input" v-model="localName" />
      </div>
      <div class="item-container">
        <span class="item-key">类型</span>
        <RadioGroup v-model="localType" class="radio-group">
          <Radio label="单选" style="display: block;float: left;"></Radio>
          <Radio label="多选" style="display: block;float: left;margin-left: .3rem"></Radio>
        </RadioGroup>
      </div>
      <div class="button-container">
        <Button style="width:1.20rem;height:.60rem;font-size: .2rem;box-shadow:0px 3px 6px rgba(0,0,0,0.16);"
          @click="cancel"
        >取消</Button>
        <Button style="width:1.20rem;height:.60rem;margin-left: .8rem;font-size: .2rem;box-shadow:0px 3px 6px rgba(0,0,0,0.16);"
          @click="save"
        >保存</Button>
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
export default class EditFiled extends Vue {
  @Prop(String) name!: string;

  @Prop(String) type!: string;

  title: string = '';

  localName: string = '';

  localType: string = '';

  oldName: string = ''

  cancel() {
    this.$emit('on-cancel');
  }

  save() {
    if(this.localType == "多选") {
      this.localType = "MULTI_COLUMN"
    } else if(this.localType == "单选") {
      this.localType = "SINGLE_COLUMN"
    }
    if (this.localName.length == 0) {
      operationFailMsg('请填写字段名');
      return ;
    }
    if (this.localType.length == 0) {
      operationFailMsg('请选择一个类型!');
      return ;
    }
    this.$emit('on-save', {
      name: this.localName,
      type: this.localType,
      oldName: this.oldName
    });
  }

  beforeMount() {
    if (this.name.length == 0) {
      this.title = '添加群组';
    } else {
      this.title = '编辑群组';
    }
    this.localType = this.type ? this.type : '';
    this.localName = this.name ? this.name : '';
    this.oldName = this.name ? this.name : '';
  }
}
</script>
