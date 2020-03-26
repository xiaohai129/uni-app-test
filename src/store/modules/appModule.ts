import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store/index';

const mutationTypes = {
  setTabbarIndex: 'SET_TABBAR_INDEX'
}

@Module({ dynamic: true, namespaced: true, name: 'app', store})
class AppModule extends VuexModule {
  public appName: string = '123';
  public tabbarIndex: string = 'home';
  @Mutation
  private [mutationTypes.setTabbarIndex](index: string) {
    this.tabbarIndex = index;
  }
  @Action
  public setTabbarIndex(index: string) {
    if (index.length > 0) {
      this.context.commit(mutationTypes.setTabbarIndex, index);
    }
  }
}

export default getModule(AppModule);