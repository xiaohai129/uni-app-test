<template>
  <view>
    <input v-model="value"/>
    <view>{{ value }}</view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Test extends Vue {
  private value: number = 12;
  private aaa: string = '1233';
}
</script>

<style lang="scss" scoped>

</style>