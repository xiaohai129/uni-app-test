<template>
  <div>{{aaa}}</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Test extends Vue {
  private aaa: string = '1233';
}
</script>

<style lang="scss" scoped>

</style>