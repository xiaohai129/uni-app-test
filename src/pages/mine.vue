<template>
  <view class="layout_wrap">
    <view class="top_wrap">
      <view class="top_wrap-bg"></view>
      <view class="top_wrap-content">
        <view class="flex justify-start">
          <view class="cu-avatar lg round" :style="{'background-image': 'url('+userInfo.avatar+')'}"></view>
					<view class="flex-sub margin-left-sm">
            <view class="text-xl">{{userInfo.nickname || '请先登录'}}</view>
            <view class="text-df">{{userInfo.account || '暂无绑定手机号'}}</view>
          </view>
				</view>
      </view>
    </view>
    <view class="nav_wrap"></view>
    <view class="top_wrap-login" v-if="!userInfo.id">
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGetUserInfo" class="login-btn">
        <text class="cuIcon-weixin"></text>
        <text>使用微信授权</text>
      </button>
    </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { register } from '@/apis/user';
import userModule from '@/store/modules/userModule';

@Component
export default class Mine extends Vue {
  get userInfo(): any {
    return userModule.userInfo;
  }
  onGetUserInfo(e: any) {
    const userInfo = e.target.userInfo;
    const user = {
      nickname: userInfo.nickName,
      avatar: userInfo.avatarUrl,
      province: userInfo.province,
      city: userInfo.city,
      country: userInfo.country,
      gender: userInfo.gender
    }
    register(user).then(res => {
      console.log(res);
    })
  }
}
</script>

<style lang="scss" scoped>
.top_wrap{
  width: 100%;
  height: 240rpx;
  position: relative;
  overflow: hidden;
  .top_wrap-bg{
    width: 160%;
    height: 100%;
    background: url('http://118.25.42.61/images/mine-bg.png') $uni-bg-color-bule no-repeat center center;
    background-size: auto 240rpx;
    border-radius: 0 0 100% 100%;
    position: absolute;
    z-index: 1;
    left: -30%;
    top: 0;
  }
  .top_wrap-content{
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20rpx 50rpx;
    color: #fff;
    .cu-avatar{
      border: 1px solid #fff;
    }
  }
}
.nav_wrap{
  width: 90%;
  margin: 0 auto;
  height: 140rpx;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 10rpx $uni-shadow-color;
  position: relative;
  z-index: 5;
  top: -80rpx;
}
.top_wrap-login{
  position: absolute;
  z-index: 3;
  width: 100%;
  left: 0;
  bottom: 0;
  .login-btn{
    color: #fff;
    background-color: $uni-color-blue;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 28rpx;
    width: 300rpx;
    margin: 0 auto;
    border-radius: 40rpx;
    .cuIcon-weixin{
      margin-right: 10rpx;
      font-size: 30rpx;
    }
    &::after{
      border: none;
    }
  }
}
</style>