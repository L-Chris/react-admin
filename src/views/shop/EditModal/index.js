import React, { Component } from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import { observer, inject } from 'mobx-react'
import Shop from '@/services/models/Shop'

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

@inject('shopStore')
@observer
class EditModal extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const { form, shopStore } = this.props
    form.validateFields(async (err, values) => {
      if (err) return
      const hideMessage = message.loading('保存中', 0)
      values.dishes = values.dishes.map(_ => _.key)
      try {
        if (shopStore.modalType) {
          await Shop.add(values)
        } else {
          const { id } = shopStore.modalForm
          await Shop.update({ id, ...values })
        }
        await shopStore.findShop()
        hideMessage()
        message.success('保存成功')
        this.handleCancel()
      } catch (err) {
        hideMessage()
        message.error(err.messsage)
      }
    })
  }

  handleCancel = () => {
    const { form, shopStore } = this.props
    shopStore.setModalVisible(false)
    shopStore.setModalForm({})
    form.resetFields()
  }

  componentWillMount = () => {
    this.props.shopStore.findDish()
  }

  render() {
    const { shopStore } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        visible={shopStore.modalVisible}
        title={shopStore.modalTitle}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="名称">
            {getFieldDecorator('name', {
              initialValue: shopStore.modalForm.name,
              rules: [
                { required: true, message: '请输入名称!' },
                { min: 3, message: '最少3个字符' },
                { max: 20, message: '最多20个字符' }
              ],
            })(
              <Input placeholder="名称" />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="菜品">
            {getFieldDecorator('dishes', {
              initialValue: shopStore.modalForm.dishes
            })(
              <Select
                mode="multiple"
                labelInValue
                style={{ width: '100%' }}
                placeholder="请选择菜品"
              >
              {
                shopStore.dishList.map(_ => (
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