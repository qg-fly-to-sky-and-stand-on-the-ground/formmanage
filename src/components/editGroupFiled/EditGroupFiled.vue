<style lang="scss" scoped>
@import "scss/mixin";
.edit-group-container {
  position: relative;
  width:736px;
  height:584px;
  background:rgba(255,255,255,1);
  box-shadow:0px 3px 6px rgba(0,0,0,0.16);
  opacity:1;
  border-radius:8px;

  .item-container {
    @include clear-float;
    width: 100%;
    display: flex;
    margin-top: 20px;

    .item-key {
      display: block;
      float: left;
      width: 170px;
      text-align: end;
      font-size:23px;
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

  .check-box-container {
    width:460px;
    height: 300px;
    overflow: auto;
  }

  .check-box {
    display: block;
    margin-top: 10px;
    text-align: start;
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
    <div class="edit-group-container">
      <custom-header :name="title"></custom-header>
      <div class="item-container">
        <span class="item-key">群组名称</span>
        <input class="name-input" v-model="localName" disabled/>
      </div>
      <div class="item-container">
        <span class="item-key">所含字段</span>
        <div class="check-box-container">
          <CheckboxGroup v-model="localFiledList">
            <Checkbox
              v-for="(item, index) in allFiledList"
              :key="item"
              class="check-box"
              :label="item"></Checkbox>
          </CheckboxGroup>
        </div>
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
import CustomHeader from "@/components/customHeader/CustomHeader.vue";
import store from '@/store';
import {getModule} from 'vuex-module-decorators';
import Auth from '@/store/modules/FiledManage'
import {Prop} from "vue-property-decorator";
import {operationFailMsg} from "@/utils/shared/message";

const auth = getModule(Auth, store);
@Component({
  components: {CustomHeader, GlobalLayer}
})
export default class EditGroupFiled extends Vue {
  title: string = '编辑所含字段';

  @Prop(String) name!: string;

  @Prop() filedList!: string[];

  @Prop() allFiledList!: string[];

  @Prop() type!: string;

  localFiledList: string[] = [];

  localName: string = '';

  oldList: string[] = [];

  oldName: string = ''

  cancel() {
    this.$emit('on-cancel');
  }

  //还原这些字段的类型单字段，还是多字段
  changeType() {
    for(let i = 0; i < auth.constraintList.length; i++) {
      for(let j = 0; j < this.localFiledList.length; j++) {
        if(auth.constraintList[i].nameEn == this.localFiledList[j]) {
          auth.constraintList[i].type = auth.groupType[this.type].type
        }
      }
    }
  }

  save() {
    let Union1 =  this.oldList.concat(this.localFiledList.filter(v => !this.oldList.includes(v)))
    let Union2 =  this.oldList.concat(this.localFiledList.filter(v => !this.oldList.includes(v)))

    let deleteField = Union1.filter((item: any) => {
      if(!(this.localFiledList.includes(item))) {
        return item
      }
    })

    let addField = Union2.filter((item: any) => {
      if(!(this.oldList.includes(item))) {
        return item
      }
    })

    console.log(deleteField)
    console.log(this.type)

    this.changeType()

    console.log(auth.constraintList)


    if (this.localName.length == 0) {
      operationFailMsg('请填写字段名');
      return ;
    }
    if (this.localFiledList.length == 0) {
      operationFailMsg('请至少选择一个字段!');
      return ;
    }
    this.$emit('on-save', {
      name: this.localName,
      list: this.localFiledList,
      oldList: this.oldList,
      addField: addField,
      deleteField: deleteField,
      oldName: this.oldName,
    });
  }

  beforeMount() {
    this.localFiledList = this.filedList.concat();
    this.oldList = this.filedList.concat();
    this.localName = this.name;
    this.oldName = this.name
    console.log(this.localName)
  }
}
</script>
