import { observable, computed, action } from 'mobx'
import Shop from '@/services/models/Shop';
import Dish from '@/services/models/Dish';

class ShopStore {
  @observable modalVisible = false
  @observable modalForm = {
    id: null,
    dishes: []
  }
  @observable shopList = []
  @observable dishList = []

  @computed get modalType () {
    return this.modalForm.id ? 0 : 1
  }

  @computed get modalTitle () {
    return this.modalType ? '新增店铺' : '编辑店铺'
  }

  @action setModalVisible (bool) {
    this.modalVisible = bool
  }

  @action setModalForm (form) {
    this.modalForm = form
  }

  @action async findShop () {
    const list: any = await Shop.find()
    this.shopList = list
  }

  @action async findDish () {
    const list: any = await Dish.find()
    this.dishList = list
  }
}

export default new ShopStore()