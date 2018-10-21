import React, { Component } from 'react'
import { Modal, Form, Icon, Input, message } from 'antd'
import { observer, inject } from 'mobx-react'
import User from '@/services/models/User'

const FormItem = Form.Item

@inject('userStore')
@observer
class EditModal extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const { form, userStore } = this.props
    form.validateFields(async (err, values) => {
      if (err) return
      const hideMessage = message.loading('保存中', 0)
      try {
        if (userStore.modalType) {
          await User.add(values)
        } else {
          const { id } = userStore.modalForm
          await User.update({ id, ...values })
        }
        await userStore.findUserList()
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
    const { form, userStore } = this.props
    userStore.setModalVisible(false)
    userStore.setModalForm({})
    form.resetFields()
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
            {getFieldDecorator('name', {
              initialValue: userStore.modalForm.name,
              rules: [{ required: true, message: '请输入昵称!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.3)' }} />} placeholder="昵称" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('account', {
              initialValue: userStore.modalForm.account,
              rules: [
                { required: true, message: '请输入账号!' },
                { min: 10, message: '最少10个字符' },
                { max: 30, message: '最多30个字符' }
              ],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.3)' }} />} placeholder="账号" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              initialValue: userStore.modalForm.password,
              rules: [
                { required: true, message: '请输入密码!' },
                { min: 10, message: '最少10个字符' },
                { max: 30, message: '最多30个字符' }
              ],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.3)' }} />} placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', {
              initialValue: userStore.modalForm.email,
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