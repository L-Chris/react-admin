import { observable, computed, action } from 'mobx'
import Order from '@/services/models/Order';
import Shop from '@/services/models/Shop';

class OrderStore {
  @observable modalVisible = false
  @observable modalForm = {
    shop: { key: '' }
  }
  @observable orderList = []
  @observable shopList = []
  @observable dishList = []

  @computed get modalType () {
    return this.modalForm.id ? 0 : 1
  }

  @computed get modalTitle () {
    return this.modalType ? '新增订单' : '编辑订单'
  }

  @action setModalVisible (bool) {
    this.modalVisible = bool
  }

  @action setModalForm (form) {
    this.modalForm = form
  }

  @action async findOrder () {
    let list = await Order.find()
    this.orderList = list
  }

  @action async findShop () {
    let list = await Shop.find()
    this.shopList = list
  }

  @action async findDishByShop ({ id }) {
    let { dishes } = await Shop.findOne({ id })
    this.dishList = dishes
  }
}

export default new OrderStore()