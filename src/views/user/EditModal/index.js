import React, { Component } from 'react'
import { Modal, Form, Icon, Input } from 'antd'
import { observer, inject } from 'mobx-react'
import User from '@/services/models/User'

const FormItem = Form.Item

@inject('userStore')
@observer
class EditModal extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (err) return
      await User.save(values)
    })
  }

  handleCancel = () => {
    this.props.userStore.setModalVisible(false)
  }

  render() {
    const { userStore } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        visible={userStore.modalVisible}
        title={userStore.modalTitle}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleSubmit} className="loginForm">
          <FormItem>
            {getFieldDecorator('account', {
              rules: [{ required: true, message: '请输入昵称!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.3)' }} />} placeholder="昵称" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入邮箱!' }],
            })(
              <Input prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.3)' }} />} type="email" placeholder="邮箱" />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(EditModal)