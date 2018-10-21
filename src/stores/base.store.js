import { observable, action } from 'mobx'
import User from '@/services/models/User';

class BaseStore {
  @observable userInfo = null

  @action async findCurrent () {
    this.userInfo = await User.findCurrent()
  }
}

export default new BaseStore()