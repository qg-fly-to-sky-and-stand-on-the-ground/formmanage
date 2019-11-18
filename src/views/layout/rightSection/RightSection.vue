<style lang="scss" scoped>
.right-section {
  position: relative;
  flex: 1;
}
</style>

<template>
  <section class="right-section">
    <Header></Header>
    <formConstraint></formConstraint>
    <router-view/>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import Header from "@/views/layout/rightSection/header/Header.vue";
import formConstraint from "@/components/formConstraint/formConstraint.vue";

@Component({
  components: {
    Header,
    formConstraint
  }
})
export default class RightSection extends Vue {

}
</script>
