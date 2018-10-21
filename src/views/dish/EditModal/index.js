import React, { Component } from 'react'
import { Modal, Form, Icon, Input, message } from 'antd'
import { observer, inject } from 'mobx-react'
import Dish from '@/services/models/Dish'

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
        message.error(err.messsage)
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
          <Form.Item>
            {getFieldDecorator('name', {
              initialValue: dishStore.modalForm.name,
              rules: [
                { required: true, message: '请输入名称!' },
                { min: 3, message: '最少3个字符' },
                { max: 20, message: '最多20个字符' }
              ],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.3)' }} />} placeholder="名称" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('price', {
              initialValue: dishStore.modalForm.price,
              rules: [
                { required: true, message: '请输入价格!' }
              ],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.3)' }} />} placeholder="价格" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('extra', {
              initialValue: dishStore.modalForm.extra
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.3)' }} />} placeholder="描述" />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(EditModal)