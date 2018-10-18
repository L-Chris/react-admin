import { observable, computed, action } from 'mobx'

class UserStore {
  @observable modalType = 0
  @observable modalVisible = false
  @observable modalForm = {}

  @computed get modalTitle () {
    return this.modalType ? '新增用户' : '编辑用户'
  }

  @action showAddModal () {
    this.modalType = 1
    this.modalVisible = true
  }

  @action showEditModal () {
    this.modalType = 0
    this.modalVisible = true
  }

  @action setModalVisible (bool) {
    this.modalVisible = bool
  }
}

export default new UserStore()