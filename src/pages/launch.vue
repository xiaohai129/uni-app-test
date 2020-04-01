<template>
  <view class="layout_wrap">
    <view class="title">增加学习记录</view>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
}
</script>

<style lang="scss" scoped>
.layout_wrap{
  padding: 0 40rpx;
}
.title{
  font-size: 48rpx;
  font-weight: bold;
  padding: 20px 0;
}
</style>