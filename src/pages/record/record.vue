<template>
  <view>
    <Navbar bgColor="bg-white">
      <Nav slot="left" :data="navData" :navIndex="navIndex" @change="onChangeNav"></Nav>
    </Navbar>
    <view v-show="navIndex == 'calendar'">
      <RecordCalendar></RecordCalendar>
    </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Nav from '@/components/nav';
import RecordCalendar from '@/pages/record/record-calendar';

@Component({
  components: {
    Nav,
    RecordCalendar
  }
})
export default class Calendar extends Vue {
  private navData = [
    { value: 'calendar', label: '学习日历'},
    { value: 'list', label: '学习列表'}
  ]
  public navIndex = 'calendar';

  onChangeNav(index: string) {
    this.navIndex = index;
  }
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