<template>
  <div class="home-layout">
    <cu-custom bgColor="bg-gradual-blue">
			<block slot="content">发起</block>
		</cu-custom>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
}
</script>

<style lang="scss" scoped>
.home-layout{
  height: 2000rpx;
}
</style>