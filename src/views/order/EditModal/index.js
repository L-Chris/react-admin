import React, { Component } from 'react'
import { Modal, Form, Select, message } from 'antd'
import { observer, inject } from 'mobx-react'
import Order from '@/services/models/Order'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
}

@inject('orderStore')
@observer
class EditModal extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const { form, orderStore } = this.props
    form.validateFields(async (err, values) => {
      if (err) return
      const hideMessage = message.loading('保存中', 0)
      try {
        if (orderStore.modalType) {
          await Order.add(values)
        } else {
          const { id } = orderStore.modalForm
          await Order.update({ id, ...values })
        }
        await orderStore.findOrder()
        hideMessage()
        message.success('保存成功')
        this.handleCancel()
      } catch ({err}) {
        hideMessage()
        message.error(err.messsage)
      }
    })
  }

  handleCancel = () => {
    const { form, orderStore } = this.props
    orderStore.setModalVisible(false)
    orderStore.setModalForm({})
    form.resetFields()
  }

  handleShopChange = ({ key }) => {
    this.props.orderStore.findDishByShop({ id: key })
  }

  componentWillMount = () => {
    this.props.orderStore.findShop()
  }

  render() {
    const { orderStore } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        visible={orderStore.modalVisible}
        title={orderStore.modalTitle}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleSubmit} className="loginForm">
        <Form.Item
            {...formItemLayout}
            label="店铺">
            {getFieldDecorator('shop', {
              initialValue: orderStore.modalForm.shop
            })(
              <Select
                labelInValue
                style={{ width: '100%' }}
                placeholder="请选择店铺"
                onChange={this.handleShopChange}
              >
              {
                orderStore.shopList.map(_ => (
                  <Select.Option key={_.id}>{_.name}</Select.Option>
                ))
              }
              </Select>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="菜品">
            {getFieldDecorator('dishes', {
              initialValue: orderStore.modalForm.dishes
            })(
              <Select
                mode="multiple"
                labelInValue
                style={{ width: '100%' }}
                placeholder="请选择菜品"
              >
              {
                orderStore.dishList.map(_ => (
                  <Select.Option key={_.id}>{_.name}</Select.Option>
                ))
              }
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(EditModal)