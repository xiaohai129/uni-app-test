<script lang="ts">
	import Vue from 'vue';
	import { login } from '@/apis/user';
	import UserModule from '@/store/modules/userModule';

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
			});
			uni.login({
				provider: 'weixin',
				success: function (res) {
					const code = res.code;
					login({
						code
					}).then(res => {
						let userInfo = res.data;
						UserModule.setUserInfo(userInfo);
						const token = userInfo.token;
						try {
							uni.setStorageSync('storage_token', token);
						} catch (e) {
							uni.showToast({
								title: '系统错误' 
							})
						}
					})
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
	body, page {
		background-color: #fff;
		color: #1B1F28;
		height: 100%;
	}
	.no-data {
		height: 260rpx;
		width: 100%;
		margin-top: 80rpx;
		padding-top: 200rpx;
		text-align: center;
		font-size: $uni-font-size-sm;
		color: $uni-text-color-placeholder;
		background: url("http://118.25.42.61/images/nodata-img.png") no-repeat center top;
		background-size: 280rpx;
		box-sizing: border-box;
	}
	.text-tips {
		color: $uni-text-color-placeholder;
	}
	.layout_wrap{
		font-size: 24rpx;
	}
	.form-item_wrap{
		margin: 10rpx 0;
		.form-item {
			padding: 20rpx;
			display: flex;
			justify-content: space-between;
		}
	}
</style>
