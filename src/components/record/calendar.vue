<template>
  <view class="calendar-wrap">
    <view class="days-label">
      <view class="label-item" v-for="(item, index) in dayLabels" :key="index">{{item}}</view>
    </view>
    <view class="days-wrap">
      <view 
        :class="['day-item', item.day?'':'data-fill', item.day == selectDay?'select':'']" 
        v-for="(item, index) in days" :key="index"
        @tap.stop="onSelectDay(item.day)"
      >
        <text v-if="item.day" :class="['day-item-text', item.tag.length?'':'text-tips']">{{item.day}}</text>
        <view v-if="item.tag" class="day-item-value">{{item.tag}}</view>
      </view>
      <view class="no-data" v-if="days.length<=0">无当前年月信息</view>
    </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Calendar extends Vue {
  @Prop({type: Object, required: true})
  private data!: {year: number, month: number, tags: {[key: number]: []}};
  @Prop({type: Number, required: true, default: 1})
  private selectDay!: number;

  private days:Object[] = [];
  private dayLabels: string[] = ['一','二','三','四','五','六','日'];
  created() {
    this.getCalendarData();
  }
  @Watch('data')
  private getCalendarData() {
    if (this.data.year && this.data.month) {
      let days:object[] = [];
      let date = new Date(this.data.year, this.data.month, 0);
      let tags = this.data.tags;
      let dayNum = date.getDate();
      let dateOne = new Date(this.data.year, this.data.month-1, 1);
      let dayOne = (dateOne.getDay() + 6) % 7;
      for (let i=0; i<dayOne; i++) {
        days.push({ 
          day: 0,
          tag: ''
        })
      }
      for (let i=1; i<=dayNum; i++) {
        let tag = tags[i] || [];
        let tagText = '';
        if (tag.length) {
          tagText = tag.length + '条';
        }
        days.push({
          day: i,
          tag: tagText
        });
      }
      let surplus = days.length % 7;
      if (surplus<=0) {
        surplus = 7;
      }
      for (let i=0; i<7-surplus; i++) {
        days.push({ 
          day: 0,
          tag: ''
        })
      }
      this.days = days;
    }
  }
  private onSelectDay(day:number){
    if (day && day!=this.selectDay) {
      this.$emit('select', day);
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar-wrap {
  $itemSize: 96rpx;
  @mixin item {
    width: $itemSize;
    height: $itemSize;
    margin: 1rpx;
    background-color: #F3F3F5;
  }
  .days-label{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20rpx;
    .label-item{
      @include item();
      height: 78rpx;
      line-height: 78rpx;
      font-size: 32rpx;
      font-weight: bold;
      color: #222;
      text-align: center;
    }
  }
  .days-wrap{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .day-item{
      @include item();
      font-size: 24rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      &.data-fill{
        background-color: transparent;
      }
      &.select{
        box-shadow: 0 0 6rpx $uni-color-blue inset;
      }
    }
    .no-data{
      height: auto;
      line-height: auto;
    }
    .day-item-text{
      display: inline-block;
      padding-top: 10rpx;
      text-align: center;
    }
    .text-tips{
      color: $uni-text-color-placeholder;
    }
    .day-item-value{
      display: inline-block;
      color: #fff;
      border-radius: 20rpx;
      font-size: 20rpx;
      padding: 0 10rpx;
      background-color: $uni-bg-color-bule;
      margin-bottom: 6rpx;
    }
  }
}
</style>