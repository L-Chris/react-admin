import { observable, computed, action } from 'mobx'
import Menu from "@/services/models/Menu";

class MenuStore {
  @observable modalVisible = false
  @observable modalForm = {}
  @observable menuList = []

  @computed get modalType () {
    return this.modalForm.id ? 0 : 1
  }

  @computed get modalTitle () {
    return this.modalType ? '新增菜单' : '编辑菜单'
  }

  @action setModalVisible (bool) {
    this.modalVisible = bool
  }

  @action setModalForm (form) {
    this.modalForm = form
  }

  @action async findMenu () {
    let list = await Menu.find()
    this.menuList = list
  }
}

export default new MenuStore()