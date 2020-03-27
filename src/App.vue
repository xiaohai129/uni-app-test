<script lang="ts">
	import Vue from 'vue';
	export default Vue.extend({
		mpType: 'app',
		onLaunch() {
			uni.getSystemInfo({
				success: function(e: any) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					let remSize = e.windowWidth / 750;
					Vue.prototype.CustomBar = 82 * remSize;
					Vue.prototype.fontSize = remSize;
					// #endif
					
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif
				}
			})
		},
		onShow() {
			console.log('App Show')
		},
		onHide() {
			console.log('App Hide')
		}
	});
</script>

<style lang="scss">
	@import "colorui/colorui/main.css";
	@import "colorui/colorui/icon.css";
	body {
		background-color: #fff;
	}
	.no-data {
		height: 200rpx;
		width: 100%;
		line-height: 200rpx;
		text-align: center;
		font-size: $uni-font-size-sm;
		color: $uni-text-color-placeholder;
	}
	.text-tips {
		color: $uni-text-color-placeholder;
	}
</style>
