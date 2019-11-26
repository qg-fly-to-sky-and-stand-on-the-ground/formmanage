<style lang="scss" scoped>

</style>

<template>
  <global-layer></global-layer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import GlobalLayer from "@/components/globalLayer/GlobalLayer.vue";
@Component({
  components: {GlobalLayer}
})
export default class EditFiled extends Vue {

}
</script>
