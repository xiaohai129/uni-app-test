<template>
  <view class="layout_wrap text-black">
    <view class="cu-list" >
      <view class="cu-form-group">
				<view class="title">标题</view>
				<input placeholder="请输入您的学习标题" v-model="formData.title"/>
			</view>
      <view class="cu-form-group">
				<view class="title">任务</view>
        <picker mode="selector" :value="taskIndex" :range="taskList" @change="bindDateChange" range-key="title">
          <view class="picker">{{taskList[taskIndex].title}}</view>
				</picker>
			</view>
      <view class="cu-form-group" v-if="lableList.length">
				<view class="title">标签</view>
        <view>
          <view class='cu-tag radius margin-xs' 
            v-for="(item,index) in lableList" 
            :class="(item.checkout?'bg-':'line-')+item.color" 
            :key="index"
            @click="onSelectLabel(index)"
          >
            {{item.label}}
          </view>
        </view>
			</view>
      <view class="cu-form-group form-content">
				<view class="title">内容</view>
				<editor placeholder="请输入您的学习内容" v-model="formData.content"></editor >
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
    <jyf-parser :html="html" ref="article"></jyf-parser>
		<view class="padding">
      <button class="cu-btn block bg-blue margin-tb-sm lg" @click="onAddRecord">立即新增</button>
      <button class="cu-btn block bg-blue-op margin-tb-sm lg">保存信息</button>
		</view>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { addRecord } from '@/apis/record';
import { getColor } from '@/utils';
import parser from "@/components/jyf-parser";

@Component({
  components: {
    "jyf-parser": parser
  },
})
export default class AddRecord extends Vue {
  private imgList: string[] = [];
  private imgMaxNum: number = 8;
  private taskIndex = 0;
  private taskList = [{title: '暂无选择任务', id: -1}];
  private colorList = getColor();
  private lableList = [];
  private formData = {
    taskId: '',
    title: '',
    content: ''
  }
  private html = `
    <h2>12323</h2>
    <h2>12323</h2>
    <h2>12323</h2>
    <h2>12323</h2>
  `;

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
  private onAddRecord() {
    const taskId = this.taskList[this.taskIndex].id;
    if (taskId > 0) {
      this.formData.taskId = taskId as any;
    }
    let rules = {
      title: '学习标题',
      content: '学习内容'
    }
    if (!this.validate(this.formData, rules)) {
      return;
    }
    addRecord(this.formData).then(res => {
      console.log(res);
    })
  }
  private onSelectLabel(index: number) {
    this.$set(this.lableList[index], 'checkout', true);
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
  .cu-form-group {
    .title{
      width: 140rpx;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .picker{
      text-align: left;
      font-size: 30rpx;
      color: #555;
    }
    .cu-tag{
      &:nth-of-type(1n) {
        margin-left: 0;
      }
    }
  }
  .form-content{
    align-items: flex-start;
    .title{
      line-height: 100rpx;
    }
    editor{
      padding: 28rpx 0;
      font-size: 30rpx;
      &::placeholder{
        font-style: normal;
      }
    }
  }
}
</style>