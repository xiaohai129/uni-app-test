import Vue from 'vue';
import App from '@/App.vue';
import Navbar from '@/components/navbar';

Vue.config.productionTip = false;
Vue.component('Navbar', Navbar);
Vue.prototype.validate = function(data: any, rules: any): boolean {
  for (let key in rules) {
    let d = data[key];
    if (!d) {
      uni.showToast({
        icon: 'none',
        title: rules[key] + '不能为空',
        duration: 2000
      });
      return false;
    }
  }
  return true;
}

new App().$mount();

declare module 'vue/types/vue' {
  interface Vue {
    validate: (data: object, rules: {
      [key: string]: string
    }) => boolean
  }
}
