<template>
  <scroll-view class="nav-wrap" scroll-x scroll-with-animation slot="left">
    <view :class="['nav-item', navIndex==item.value?'active':'']" v-for="item in data" :key="item.value" @click="onClickNavItem" :data-index="item.value">{{item.label}}</view>
    <view class="bottom-slider" :style="{width: bsliderStyle.width, left: bsliderStyle.left}"></view>  
  </scroll-view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator';

@Component
export default class Nav extends Vue {
  private bsliderStyle = {
    width: '0px',
    left: '0px'
  };
  private navItemInfo: {[key:string]: any } = {};
  @Prop({ required: true })
  private navIndex!: string;
  @Prop({ required: true })
  private data!: Array<{value: string, label: string}>;

  private mounted() {
    const query = uni.createSelectorQuery().in(this);
    query.selectAll('.nav-item').boundingClientRect((data: any) => {
      let navItemInfo: any = {};
      let checkItem: any;
      let offsetLeft = 0;
      data.map((item: any, index: number) => {
        let key = item.dataset.index;
        navItemInfo[key] = item;
        if (index == 0) {
          offsetLeft = item.left;
        }
        if (this.navIndex == key) {
          this.bsliderStyle = {
            width: item.width + 'px',
            left: (item.left - offsetLeft) + 'px'
          }
        }
      });
      this.navItemInfo = navItemInfo;
    }).exec();
  }
  private onClickNavItem(e:Event) {
    let target = e.currentTarget as any;
    let key = target.dataset.index;
    let info = this.navItemInfo[key];
    this.bsliderStyle.width = info.width + 'px';
    this.bsliderStyle.left = target.offsetLeft + 'px';
    this.$emit('change', key);
  }
}
</script>

<style lang="scss" scoped>
.nav-wrap{
  position: relative;
  height: 58rpx;
  .nav-item{
    display: inline-block;
    height: 58rpx;
    line-height: 58rpx;
    font-size: 32rpx;
    font-weight: bold;
    margin-right: 28rpx;
    box-sizing: border-box;
    transition: color 0.3s ease-in;
    &.active{
      color: $uni-bg-color-bule;
    }
  }
  .bottom-slider{
    position: absolute;
    top: 50rpx;
    left: 0;
    border-radius: 4rpx;
    height: 8rpx;
    width: 0;
    transition: left 0.3s ease-in, wdith 0.3s ease-in;
    background-color: $uni-bg-color-bule;
  }
  &::after{
    display: block;
    content: '';
    clear: both;
  }
}
</style>