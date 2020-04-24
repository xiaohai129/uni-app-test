<template>
  <view class="record-calendar-wrap">
    <view class="date-wrap">
      <picker
        mode="date"
        fields="month"
        class="date-picker-wrap"
        @change="onChangeCalendarTime"
        :value="initPickerValue"
      >
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
      <view class="cu-timeline" v-for="(item, key) in recordList" :key="key">
        <view class="cu-item text-blue">
          <view class="content">
            <view>
              <text>【{{item.time}}】</text>
              {{item.title}}
            </view>
            <view class="tag-wrap" v-if="item.label">
              <view
                class="cu-tag radius sm"
                :class="['bg-'+label.color]"
                v-for="label in item.label"
                :key="label.id"
              >{{label.name}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Calendar from '@/components/record/calendar';
import TextImgCard from '@/components/record/text-img-card';
import { getRecordList, getRecordStatis } from '@/apis/record';

@Component({
  components: {
    Calendar,
    TextImgCard
  }
})
export default class RecordCalendar extends Vue {
  private record = { year: 0, month: 0, tags: {} };
  private initPickerValue = '';
  private selectDay: number = 1;
  private selectTimeStr: string = '';
  private recordList = [];
  created() {
    let date = new Date();
    let record = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      tags: {}
    };
    this.initPickerValue = record.year + '-' + record.month;
    this.record = record;
    this.onTapCalendarDay(date.getDate());
    this.getRecordStatis(this.initPickerValue + '-01');
  }
  onTapCalendarDay(day: number) {
    this.selectTimeStr = `${this.record.year}年${this.record.month}月${day}日`;
    this.selectDay = day;
    this.getRecordList(new Date(`${this.record.year}-${this.record.month}-${day}`).getTime());
  }
  getRecordList(date: number) {
    getRecordList({
      date,
      pageNum: 0,
      pageSize: 0
    }).then(res => {
      this.recordList = res.data;
    });
  }
  onChangeCalendarTime(e: any, dates?: number[]) {
    let date: any[] = [];
    let dateStr: string = '';
    if (dates) {
      date = dates;
    } else {
      dateStr = e.target.value || '';
      date = dateStr.split('-');
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
    let date: number[] = [];
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
    this.getRecordStatis(`${record.year}-${record.month}-01`);
    return false;
  }
  getRecordStatis(date) {
    getRecordStatis({
      date: new Date(date).getTime()
    }).then(res => {
      let data = res.data;
      let tags = {};
      for (let i in data) {
        let item = data[i];
        tags[item.day] = item.num;
      }
      this.$set(this.record, 'tags', tags);
    });
  }
}
</script>

<style lang="scss" scoped>
.record-calendar-wrap {
  padding: 30rpx;
}
.date-wrap {
  position: relative;
  .date-picker-wrap {
    margin-bottom: 20rpx;
    position: relative;
    .text-month {
      font-size: 64rpx;
    }
    .text-year {
      font-size: 28rpx;
      margin-left: 20rpx;
      font-weight: bold;
    }
  }
  .date-control-wrap {
    position: absolute;
    right: 0;
    top: 0;
    width: 160rpx;
    display: flex;
    justify-content: space-between;
    .icon-btn {
      height: 100rpx;
      width: 80rpx;
      line-height: 100rpx;
      font-size: 45rpx;
      padding-left: 30rpx;
      display: block;
    }
  }
}
.record-list-wrap {
  padding-top: 30rpx;
  .title {
    font-size: 38rpx;
    font-weight: bolder;
    margin: 80rpx 0 40rpx 0;
  }
}
.cu-timeline > .cu-item {
  padding-left: 78rpx;
  &::before {
    left: 10rpx;
  }
  &::after {
    left: 35rpx;
  }
}
</style>