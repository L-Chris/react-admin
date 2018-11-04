import { observable, computed, action } from 'mobx'
import Order from '@/services/models/Order';
import Shop from '@/services/models/Shop';

class OrderStore {
  @observable modalVisible = false
  @observable searchParams = {}
  @observable modalForm = {
    type: { key: '' },
    shop: { key: '' },
    dishes: []
  }
  @observable orderList = []
  @observable shopList = []
  @observable dishList = []

  @computed get modalType () {
    return this.modalForm.id ? 1 : 0
  }

  @computed get modalTitle () {
    return this.modalType ? '编辑订单' : '新增订单'
  }

  @action setModalVisible (bool) {
    this.modalVisible = bool
  }

  @action setSearchParams (params) {
    if ('type' in params) this.searchParams.type = params.type
    if ('date' in params) this.searchParams.date = params.date
  }

  @action setModalForm (form) {
    this.modalForm = form
  }

  @action async findOrder (params) {
    let list = await Order.find(params)
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