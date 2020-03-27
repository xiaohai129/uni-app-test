<template>
  <view class="record-calendar-wrap">
    <picker mode="date" value="YYYY-MM" fields="month" class="date-wrap" @change="onChangeCalendarTime">
      <text class="text-month">{{record.month}}月</text>
      <text class="text-year">{{record.year}}年</text>
      <icon class="cuIcon-unfold icon-btn"></icon>
      <icon class="cuIcon-fold icon-btn"></icon>
    </picker>
    <Calendar :data="record"></Calendar>

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
  private record = {};
  created() {
    let date = new Date();
    this.record = {year: date.getFullYear(), month: date.getMonth()+1, tags: {}};
  }
  onChangeCalendarTime(e: any, dates?: []) {
    let date:string[]|number[] = [];
    if (dates) {
      date = dates;
    } else {
      let dateStr = e.target.value || '';
      date = dateStr.split('-');
    }
    if (date && date.length >= 2) {
      let record = this.record as any;
      if (date[0] == record.year && date[1] == record.month) {
        return false;
      } else {
        let record = {
          year: date[0],
          month: date[1],
          tags: {}
        };
        this.record = record;
      }
    } 
  }
  
}
</script>

<style lang="scss" scoped>
  .record-calendar-wrap{
    padding: 30rpx;
  }
  .date-wrap{
    margin-bottom: 20rpx;
    .text-month {
      font-size: 64rpx;
    }
    .text-year {
      font-size: 28rpx;
      margin-left: 20rpx;
      font-weight:bold;
    }
    .icon-btn{
      float: right;
      display: block;
      height: 60rpx;
      line-height: 60rpx;
      font-size: 45rpx;
      padding-left: 30rpx;
    }
  }
</style>