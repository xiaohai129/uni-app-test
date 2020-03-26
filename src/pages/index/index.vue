<template>
	<view class="index-warp">
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">{{appName}}</block>
		</cu-custom>
		<Home v-show="tabbarIndex=='home'"/>
		<Other v-show="tabbarIndex=='other'"/>
		<Tabbar/>
	</view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Tabbar from '@/components/tabbar';
import Other from '@/pages/index/other';
import Home from '@/pages/index/home';
import appModule from '@/store/modules/appModule';

@Component({
	components: {
		Tabbar,
		Other,
		Home
	}
})
export default class Index extends Vue {
	get appName(): string {
    return appModule.appName;
	}
	get tabbarIndex(): string {
		return appModule.tabbarIndex;
	}
}
</script>

<style lang="scss" scoped>
</style>