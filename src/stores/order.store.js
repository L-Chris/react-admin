import { observable, computed, action } from 'mobx'
import Order from '@/services/models/Order';

class OrderStore {
  @observable modalVisible = false
  @observable modalForm = {}
  @observable orderList = []

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

  @action async findOrderList () {
    let list = await Order.find()
    this.orderList = list
  }
}

export default new OrderStore()