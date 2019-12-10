<style lang="scss" scoped>
.right-section {
  position: relative;
  flex: 1;
  background-color: #FAFAFA;
}
</style>

<template>
  <section class="right-section">
    <Header></Header>
    <router-view/>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import Header from "@/views/layout/rightSection/header/Header.vue";


@Component({
  components: {
    Header,
  }
})
export default class RightSection extends Vue {

}
</script>
