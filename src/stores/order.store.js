import { observable, computed, action } from 'mobx'
import Order from '@/services/models/Order';
import Shop from '@/services/models/Shop';

class OrderStore {
  @observable modalVisible = false
  @observable modalForm = {
    type: { key: '' },
    shop: { key: '' },
    dishes: []
  }
  @observable types = []
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

  @action async findOrderType () {
    this.types = [{ id: 1, name: '普通' }, { id: 2, name: '午餐' }, { id: 3, name: '晚餐' }]
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