<template>
  <view class="layout_wrap">
    <view class="cu-timeline" v-for="(item, key) in recordList" :key="key">
      <view class="cu-time">{{key}}</view>
      <view class="cu-item text-blue">
        <view class="content" v-for="record in item" :key="record.id">
          <view>
            <text>【{{record.time}}】</text>
            {{record.title}}
          </view>
          <view class="tag-wrap" v-if="record.label">
            <view
              class="cu-tag radius sm"
              :class="['bg-'+item.color]"
              v-for="item in record.label"
              :key="item.id"
            >{{item.name}}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import { getRecordList } from '@/apis/record';

export default Vue.extend({
  data() {
    return {
      formData: {
        pageSize: 10,
        pageNum: 0
      },
      recordList: {}
    };
  },
  created() {
    this.getRecordList();
  },
  methods: {
    getRecordList() {
      getRecordList(this.formData).then(res => {
        let list = res.data.list;
        if (!list || !list.length) {
          return;
        }
        let recordList = { ...this.recordList };
        for (let i in list) {
          let item = list[i];
          if (recordList[item.date]) {
            recordList[item.date].push(item);
          } else {
            recordList[item.date] = [item];
          }
        }
        this.recordList = recordList;
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.cu-timeline .cu-time {
  width: 200rpx;
  text-align: left;
  padding-left: 20rpx;
}
.tag-wrap {
  margin-top: 20rpx;
  .cu-tag {
    margin: 2rpx 16rpx;
    &:nth-of-type(1n) {
      margin-left: 0;
    }
  }
}
</style>