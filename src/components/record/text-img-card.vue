<template>
  <view class="cu-card article">
    <view class="cu-item">
      <view class="title">
        <view class="text-cut">{{datas.title}}</view>
      </view>
      <view class="content" v-if="datas.label">
        <view
          class="cu-tag light sm round"
          :class="['bg-'+item.color]"
          v-for="item in datas.label"
          :key="item.id"
        >{{item.name}}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    datas: Object
  }
});
</script>

<style lang="scss" scoped>
.cu-card {
  background-color: $uni-bg-color-grey;
  margin-bottom: 20rpx;
}
.cu-card .cu-item {
  margin: 0;
  background-color: none;
  .title,
  .content {
    padding: 0;
  }
  .title {
    line-height: 60rpx;
  }
  .content {
    image {
      width: 200rpx;
      height: 150rpx;
    }
    .text-content {
      line-height: 35rpx;
      height: 105rpx;
      @include multiEllipsis(3);
    }
  }
}
</style>