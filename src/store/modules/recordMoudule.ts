import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store/index';

const mutationTypes = {
  setRecord: 'SET_RECORD'
}

@Module({ dynamic: true, namespaced: true, name: 'record', store })
class RecordModule extends VuexModule {
  public record: any = {
    title: '',
    content: '',
    taskId: ''
  }
  @Action
  public setRecord(data: any) {
    if (data) {
      let recordData = {} as any;
      if (data.title) {
        recordData.title = data.title;
      }
      if (data.content) {
        recordData.content = data.content;
      }
      if (data.taskId) {
        recordData.taskId = data.taskId;
      }
      this.context.commit(mutationTypes.setRecord, recordData);
    }
  }
  @Mutation
  private [mutationTypes.setRecord](data: any) {
    this.record = Object.assign(this.record, data);
  }
}

export default getModule(RecordModule);