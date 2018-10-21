import { observable, computed, action } from 'mobx'
import Dish from "@/services/models/Dish";

class DishStore {
  @observable modalVisible = false
  @observable modalForm = {}
  @observable dishList = []

  @computed get modalType () {
    return this.modalForm.id ? 0 : 1
  }

  @computed get modalTitle () {
    return this.modalType ? '新增菜品' : '编辑菜品'
  }

  @action setModalVisible (bool) {
    this.modalVisible = bool
  }

  @action setModalForm (form) {
    this.modalForm = form
  }

  @action async findDish () {
    let list = await Dish.find()
    this.dishList = list
  }
}

export default new DishStore()