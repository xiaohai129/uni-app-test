<template>
  <view class="record-calendar-wrap">
    <view class="date-wrap">
      <picker mode="date" fields="month" class="date-picker-wrap" @change="onChangeCalendarTime" :value="initPickerValue">
        <text class="text-month">{{record.month}}月</text>
        <text class="text-year">{{record.year}}年</text>
      </picker>
      <view class="date-control-wrap">
        <icon class="cuIcon-fold icon-btn" @click="onClickCalendarTime('prev')"></icon>
        <icon class="cuIcon-unfold icon-btn" @click="onClickCalendarTime('next')"></icon>
      </view>
    </view>
    <Calendar :data="record"></Calendar>
    <view class="record-list-wrap">
      <view class="record-list-item" v-for="item in record.tags[this.seleteDay]" :key="item.id">
        {{ item }}
        <text>{{ item.title }}</text>
        <text>{{ item.time }}</text>
      </view>
    </view>  
  </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Calendar from '@/components/record/calendar';

@Component({
  components: {
    Calendar
  }
})
export default class RecordCalendar extends Vue {
  private record = {year: 0, month: 0, tags: {} };
  private initPickerValue = '';
  private seleteDay!: number;
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
    this.seleteDay = date.getDate();
  }
  onClickCalendarDay(index: number) {
    console.log(index);
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
  onClickCalendarTime(type: string) {
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
    .record-list-item{

    }
  }
</style>