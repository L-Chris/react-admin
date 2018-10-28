import { observable, computed, action } from 'mobx'
import Menu from "@/services/models/Menu";
import Dish from '@/services/models/Dish';

class MenuStore {
  @observable modalVisible = false
  @observable modalForm = {
    dishes: []
  }
  @observable menuList = []
  @observable dishList = []

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

  @action async findDish () {
    let list = await Dish.find()
    this.dishList = list
  }
}

export default new MenuStore()