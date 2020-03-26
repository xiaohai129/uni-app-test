<template>
  <view>
    <Navbar>
      <Nav slot="left" :datas="navData" defaultIndex="list"/>
    </Navbar>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Nav from '@/components/nav';

@Component({
  components: {
    Nav
  }
})
export default class Calendar extends Vue {
  private navData = [
    { value: 'calendar', label: '学习日历'},
    { value: 'list', label: '学习列表'}
  ]
}
</script>

<style lang="scss" scoped>
.nav-wrap{
  width: 100%;
}
</style>
<style lang="scss">
.nav-wrap{
  width: 100%;
}
</style>