<template>
  <view class="cu-bar tabbar bg-white shadow foot">
    <view class="action" @click="onSetTabbarIndex('home')">
      <view class="cuIcon-cu-image">
        <image />
      </view>
      <view :class="pageIndex=='home'?'text-green':'text-gray'">首页</view>
    </view>
    <view class="action" @click="onSetTabbarIndex('other')">
      <view class="cuIcon-cu-image">
        <image />
      </view>
      <view :class="pageIndex=='other'?'text-green':'text-gray'">其他</view>
    </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import appModule from '@/store/modules/appModule';

@Component
export default class Tabbar extends Vue {
  get pageIndex(): string {
    return appModule.tabbarIndex;
  }
  private onSetTabbarIndex(index: string): void {
    appModule.setTabbarIndex(index);
  }
}
</script>

<style lang="scss" scoped>
</style>
