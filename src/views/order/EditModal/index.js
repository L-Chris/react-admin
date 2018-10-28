import React, { Component } from 'react'
import { Modal, Form, Icon, Input, message } from 'antd'
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
        await orderStore.findUserList()
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
          <FormItem
            {...formItemLayout}
            label="名称">
            {getFieldDecorator('name', {
              initialValue: orderStore.modalForm.name,
              rules: [{ required: true, message: '请输入名称!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.3)' }} />} placeholder="名称" />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(EditModal)