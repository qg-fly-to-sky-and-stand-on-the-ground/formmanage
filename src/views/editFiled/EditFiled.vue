<style lang="scss" scoped>

</style>

<template>
  <global-layer>
    <custom-header
      :name="title"
    ></custom-header>
    <div class="item-container">
      <span class="item-key">英文名称</span>
      <input v-model="localName" />
    </div>
    <div class="item-container">
      <span class="item-key">类型</span>
    </div>
    <div class="button-container">
      <Button>保存</Button>
      <Button>取消</Button>
    </div>
  </global-layer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import GlobalLayer from "@/components/globalLayer/GlobalLayer.vue";
import {Prop} from "vue-property-decorator";
import CustomHeader from "@/components/customHeader/CustomHeader.vue";
@Component({
  components: {CustomHeader, GlobalLayer}
})
export default class EditFiled extends Vue {
  @Prop(Number) id!: number;

  @Prop(String) name!: string;

  @Prop(String) type!: string;

  title: string = '';

  localName: string = '';

  localType: string = '';

  beforeMount() {
    if (this.id != -1) {
      this.title = '添加群组';
    } else {
      this.title = '编辑群组';
    }

  }
}
</script>
