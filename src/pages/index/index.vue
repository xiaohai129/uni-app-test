<template>
	<div class="index-warp">
		<Test ref="test"></Test>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Test from '@/components/test';
import { base_getTest } from '@/apis/common';

@Component({
	components: {
		Test
	}
})
export default class Index extends Vue {
	onPageScroll() {
		base_getTest({
			username: '',
			password: ''
		}).then(res => {
			console.log(res);
		})
	}
}
</script>

<style lang="scss" scoped>
.index-warp{
	height: 10000rpx;
}
</style>