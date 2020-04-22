<template>
  <view class="record-calendar-wrap">
    <view class="date-wrap">
      <picker mode="date" fields="month" class="date-picker-wrap" @change="onChangeCalendarTime" :value="initPickerValue">
        <text class="text-month">{{record.month}}月</text>
        <text class="text-year">{{record.year}}年</text>
      </picker>
      <view class="date-control-wrap">
        <icon class="cuIcon-fold icon-btn" @click="onTapCalendarTime('prev')"></icon>
        <icon class="cuIcon-unfold icon-btn" @click="onTapCalendarTime('next')"></icon>
      </view>
    </view>
    <Calendar :datas="record" :selectDay="selectDay" @select="onTapCalendarDay"></Calendar>
    <view class="record-list-wrap">
      <view class="title">{{selectTimeStr}} 学习记录</view>
      <TextImgCard v-for="item in 10" :key="item"></TextImgCard>
    </view>  
  </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Calendar from '@/components/record/calendar';
import TextImgCard from '@/components/record/text-img-card';

@Component({
  components: {
    Calendar,
    TextImgCard
  }
})
export default class RecordCalendar extends Vue {
  private record = {year: 0, month: 0, tags: {} };
  private initPickerValue = '';
  private selectDay:number = 1;
  private selectTimeStr:string = '';
  created() {
    let date = new Date();
    let record = {year: date.getFullYear(), month: date.getMonth()+1, tags: {
       '30': [
          {
            id: '1',
            title: '测试记录9999999999999999999999',
            time: 1585535151525,
            content: '12121222222222222222222222'
          },
          {
            id: '1',
            title: '测试记录9999999999999999999999',
            time: 1585535151525,
            content: '12121222222222222222222222'
          }
       ]
    }};
    this.initPickerValue = record.year + '-' + record.month;
    this.record = record;
    this.onTapCalendarDay(date.getDate());
  }
  onTapCalendarDay(day: number) {
    this.selectTimeStr = `${this.record.year}年${this.record.month}月${day}日`;
    this.selectDay = day;
  }
  onChangeCalendarTime(e: any, dates?: number[]) {
    let date:number[] = [];
    if (dates) {
      date = dates;
    } else {
      let dateStr = e.target.value || '';
      date = dateStr.split('-') as number[];
    }
    if (date && date.length >= 2) {
      if (date[0] == this.record.year && date[1] == this.record.month) {
        return false;
      } else {
        this.record = {
          year: date[0],
          month: parseInt(date[1] as any),
          tags: {}
        };
      }
    }
  }
  onTapCalendarTime(type: string) {
    let date: number[]= [];
    let record = this.record;
    if (type == 'next') {
      record.month++;
      if (record.month > 12) {
        record.month = 1;
        record.year++;
      }
    } else if (type == 'prev') {
      record.month--;
      if (record.month <= 0) {
        record.month = 12;
        record.year--;
      }
    }
    date = [record.year, record.month];
    this.onChangeCalendarTime(null, date);
    this.onTapCalendarDay(1);
    return false;
  }
  
}
</script>

<style lang="scss" scoped>
  .record-calendar-wrap{
    padding: 30rpx;
  }
  .date-wrap{
    position: relative;
    .date-picker-wrap{
      margin-bottom: 20rpx;
      position: relative;
      .text-month {
        font-size: 64rpx;
      }
      .text-year {
        font-size: 28rpx;
        margin-left: 20rpx;
        font-weight:bold;
      }

    }
    .date-control-wrap{
      position: absolute;
      right: 0;
      top: 0;
      width: 160rpx;
      display: flex;
      justify-content: space-between;
      .icon-btn{
        height: 100rpx;
        width: 80rpx;
        line-height: 100rpx;
        font-size: 45rpx;
        padding-left: 30rpx;
        display: block;
      }
    }
  }
  .record-list-wrap{
    padding-top: 30rpx;
    .title{
      font-size: 38rpx;
      font-weight: bolder;
      margin: 80rpx 0 40rpx 0;
    }
  }
</style>