<template>
  <view class="layout-wrap">
    <view class="action-wrap">
      <view class="title">新增</view>
      <view class="action-item" @click="onGotoPage('/pages/record/add-record')">
        <view class="action-icon">
          <image src="http://118.25.42.61/images/record-icon.png" />
        </view>
        <text>新增学习记录</text>
      </view>
      <view class="action-item" @click="onGotoPage('/pages/record/add-task')">
        <view class="action-icon">
          <image src="http://118.25.42.61/images/task-icon.png" />
        </view>
        <text>新增学习任务</text>
      </view>
      <view class="action-item" @click="onGotoPage('/pages/record/add-label')">
        <view class="action-icon">
          <image src="http://118.25.42.61/images/label-icon.png" />
        </view>
        <text>新增学习标签</text>
      </view>
    </view>
    <view class="task-wrap">
      <view>近期目标</view>
      <view class="no-data" v-if="false">暂无学习目标</view>
      <view class="task-item violet">
        <view class="time">03-01 14:00</view>
        <view class="title">学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs</view>
        <view
          class="text-info"
        >学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nod学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nodejsejs学习nodejs学习nodejs学习nodejs</view>
      </view>
      <view class="task-item lblue">
        <view class="title">学习nodejs</view>
        <view
          class="text-info"
        >学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nod学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nodejs学习nodejsejs学习nodejs学习nodejs学习nodejs</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Explore extends Vue {
  private onGotoPage(path: string) {
    uni.navigateTo({
      url: path
    });
  }
}
</script>

<style lang="scss" scoped>
.layout-wrap {
  padding: 20rpx 40rpx 60rpx 40rpx;
}
.action-wrap {
  .title {
    font-size: 48rpx;
    font-weight: bold;
  }
  .action-item {
    width: 100%;
    height: 120rpx;
    padding: 20rpx 0;
    border-radius: 4rpx;
    line-height: 80rpx;
    font-size: 30rpx;
    font-weight: bold;
    background: url('http://118.25.42.61/images/more-icon.png') no-repeat #f3f3f5 96% center;
    background-size: 40rpx 40rpx;
    margin-top: 30rpx;
    box-sizing: border-box;
    .action-icon {
      background-color: $uni-color-blue;
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 30rpx 0 20rpx;
      padding: 10rpx;
      box-sizing: border-box;
      float: left;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.task-wrap {
  padding: 20px 0;
  .task-item {
    position: relative;
    background-color: #fff;
    border-radius: 12rpx;
    box-shadow: 0 3rpx 10rpx rgba($color: #999, $alpha: 0.5);
    margin: 20rpx 0;
    padding: 20rpx 20rpx 20rpx 40rpx;
    &::before {
      width: 10rpx;
      height: 120rpx;
      position: absolute;
      top: 50%;
      left: 0;
      content: '';
      display: block;
      border-radius: 0 6rpx 6rpx 0;
      margin-top: -60rpx;
    }
    &.violet::before {
      background-color: #cd74fd;
    }
    &.lblue::before {
      background-color: #a1c7f8;
    }
    &.orange::before {
      background-color: #e0654e;
    }
    &.sblue::before {
      background-color: #49c5ee;
    }
    &.yellow::before {
      background-color: #febe29;
    }
    .time {
      position: absolute;
      right: 20rpx;
      top: 20rpx;
      height: 50rpx;
      line-height: 50rpx;
      font-size: 24rpx;
      color: #999;
    }
    .title {
      font-size: 28rpx;
      font-weight: bold;
      height: 50rpx;
      line-height: 50rpx;
      padding-right: 150rpx;
      @include singleEllipsis;
    }
    .text-info {
      font-size: 24rpx;
      height: 70rpx;
      line-height: 30rpx;
      padding-top: 10rpx;
      @include multiEllipsis(2);
    }
  }
}
</style>