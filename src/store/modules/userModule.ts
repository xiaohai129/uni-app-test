import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store/index';

const mutationTypes = {
  setUserInfo: 'SET_USER_INFO'
}

@Module({ dynamic: true, namespaced: true, name: 'user', store})
class UserModule extends VuexModule {
  public userInfo: any = {};
  @Mutation
  private [mutationTypes.setUserInfo](userInfo: any) {
    this.userInfo = userInfo;
  }
  @Action
  public setUserInfo(user: any) {
    if (user) {
      this.context.commit(mutationTypes.setUserInfo, user);
    }
  }
}

export default getModule(UserModule);