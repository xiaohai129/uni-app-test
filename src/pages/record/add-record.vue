<template>
  <view class="layout_wrap text-black">
    <view class="cu-list" >
      <view class="cu-form-group">
				<view class="title">标题</view>
				<input placeholder="请输入您的学习标题" name="input"/>
			</view>
      <view class="cu-form-group align-start">
				<view class="title">内容</view>
				<textarea maxlength="2000" placeholder="请输入您的学习内容"></textarea>
			</view>
    </view>
    <view class="cu-list">
      <view class="cu-bar bg-white margin-top">
				<view class="action">
					图片上传
				</view>
				<view class="action">{{imgList.length}} / {{imgMaxNum}}</view>
			</view>
      <view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="onPreviewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag" @tap.stop="onDelImage" :data-index="index">
							<text class='cuIcon-close text-white'></text>
						</view>
					</view>
					<view class="solids" @tap="onChooseImage" v-if="imgList.length<imgMaxNum">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
    </view>
		<view class="padding">
      <button class="cu-btn block bg-blue margin-tb-sm lg">立即新增</button>
      <button class="cu-btn block bg-blue-op margin-tb-sm lg">保存信息</button>
		</view>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AddRecord extends Vue {
  private imgList: string[] = [];
  private imgMaxNum: number = 8;
  private onPreviewImage(e: any) {
    uni.previewImage({
      urls: this.imgList,
      current: e.currentTarget.dataset.url
    });
    console.log(this.imgList)
  }
  private onChooseImage(e: any) {
    uni.chooseImage({
      count: 4, 
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: (res: ChooseImageSuccessCallbackResult) => {
        let imgList = res.tempFilePaths as string[];
        if (this.imgList.length != 0) {
          this.imgList = this.imgList.concat(imgList)
        } else {
          this.imgList = imgList;
        }
        this.imgList = this.imgList.splice(0, this.imgMaxNum);
      }
    });
  }
  private onDelImage(e: any) {
		this.imgList.splice(e.currentTarget.dataset.index, 1);
  }
}
</script>

<style lang="scss" scoped>
.layout_wrap{
  background-color: #F3F3F5;
  padding: 30rpx 0;
  height: 100%;
  .bg-blue-op{
    background-color: rgba($color: $uni-color-blue, $alpha: 0.7);
    color: #fff;
  }
  .cu-form-group .title{
    width: 140rpx;
    white-space: nowrap;
  }
}
</style>