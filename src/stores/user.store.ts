import { observable, computed, action } from 'mobx'
import User from '@/services/models/User';

class UserStore {
  @observable modalVisible = false
  @observable modalForm = {
    id: null
  }
  @observable userList = []

  @computed get modalType () {
    return this.modalForm.id ? 0 : 1
  }

  @computed get modalTitle () {
    return this.modalType ? '新增用户' : '编辑用户'
  }

  @action setModalVisible (bool) {
    this.modalVisible = bool
  }

  @action setModalForm (form) {
    this.modalForm = form
  }

  @action async findUserList () {
    const list: any = await User.find()
    this.userList = list
  }
}

export default new UserStore()