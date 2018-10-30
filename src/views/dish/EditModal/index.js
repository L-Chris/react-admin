import React, { Component } from 'react'
import { Modal, Form, Input, InputNumber, message } from 'antd'
import { observer, inject } from 'mobx-react'
import Dish from '@/services/models/Dish'

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

@inject('dishStore')
@observer
class EditModal extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const { form, dishStore } = this.props
    form.validateFields(async (err, values) => {
      if (err) return
      const hideMessage = message.loading('保存中', 0)
      try {
        if (dishStore.modalType) {
          await Dish.add(values)
        } else {
          const { id } = dishStore.modalForm
          await Dish.update({ id, ...values })
        }
        await dishStore.findDish()
        hideMessage()
        message.success('保存成功')
        this.handleCancel()
      } catch (err) {
        hideMessage()
        message.error(err.message)
      }
    })
  }

  handleCancel = () => {
    const { form, dishStore } = this.props
    dishStore.setModalVisible(false)
    dishStore.setModalForm({})
    form.resetFields()
  }

  render() {
    const { dishStore } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        visible={dishStore.modalVisible}
        title={dishStore.modalTitle}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="名称">
            {getFieldDecorator('name', {
              initialValue: dishStore.modalForm.name,
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
            label="价格">
            {getFieldDecorator('price', {
              initialValue: dishStore.modalForm.price,
              rules: [
                { required: true, message: '请输入价格!' }
              ]
            })(
              <InputNumber/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="描述">
            {getFieldDecorator('extra', {
              initialValue: dishStore.modalForm.extra
            })(
              <Input placeholder="描述" />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(EditModal)