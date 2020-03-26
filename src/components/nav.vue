<template>
  <scroll-view class="nav-wrap" scroll-x scroll-with-animation slot="left">
    <view class="nav-item" v-for="item in datas" :key="item.value" @click="onClickNavItem(item.value)" :class="navIndex==itme.label?'active':''">{{item.label}}</view>
    <view class="bottom-slider" :style="{width: bsliderStyle.width, left: bsliderStyle.left}"></view>  
  </scroll-view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Nav extends Vue {
  private navIndex = '';
  private bsliderStyle = {
    width: '0px',
    left: '0px'
  };
  private dataIndex = 0;

  @Prop({ required: true })
  private datas!: Array<{value: string, label: string}>;
  @Prop({ required: true })
  public defaultIndex!: string;

  private created() {
    this.navIndex = this.defaultIndex;
    if (this.defaultIndex) {
      for (let i in this.datas) {
        let item = this.datas[i];
        if (item.value == this.defaultIndex) {
          this.dataIndex = parseInt(i);
          break;
        }
      }
    }
  }
  private mounted() {
    const query = uni.createSelectorQuery().in(this);
    query.selectAll('.nav-item').boundingClientRect((data: any) => {
      console.log(data);
      let rect = data[this.dataIndex];
      this.bsliderStyle.width = rect.width + 'px';
      this.bsliderStyle.left = rect.left + 'px';
    }).exec();
  }
  private onClickNavItem(index: string) {
    console.log(index);
  }
}
</script>

<style lang="scss" scoped>
.nav-wrap{
  position: relative;
  height: 60rpx;
  &.active{
    color: $uni-bg-color-bule;
  }
  .nav-item{
    display: inline-block;
    height: 60rpx;
    line-height: 60rpx;
    font-size: 32rpx;
    font-weight: bold;
    margin: 0 15rpx;
    box-sizing: border-box;
  }
  .bottom-slider{
    position: absolute;
    top: 54rpx;
    left: 0;
    border-radius: 4rpx;
    height: 8rpx;
    width: 100%;
    margin: 0 15rpx;
    transition: left 0.5s ease-in;
    background-color: $uni-bg-color-bule;
  }
  &::after{
    display: block;
    content: '';
    clear: both;
  }
}
</style>