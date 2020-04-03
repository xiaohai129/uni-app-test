<template>
  <view class="layout_wrap">
    <view class="cu-timeline" v-for="item in 10" :key="item">
			<view class="cu-time">昨天</view>
			<view class="cu-item text-blue">
				<view class="bg-blue content">
					<text>20:00</text> 【月球】快件已到达月球，准备发往地球
				</view>
				<view class="bg-cyan content">
					<text>10:00</text> 【银河系】快件已到达银河系，准备发往月球
				</view>
			</view>
		</view>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class RecordTime extends Vue {
}
</script>

<style lang="scss" scoped>

</style>