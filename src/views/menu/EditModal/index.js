import React, { Component } from 'react'
import { Modal, Form, Icon, Input, message } from 'antd'
import { observer, inject } from 'mobx-react'
import Menu from '@/services/models/Menu'

@inject('menuStore')
@observer
class EditModal extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const { form, menuStore } = this.props
    form.validateFields(async (err, values) => {
      if (err) return
      const hideMessage = message.loading('保存中', 0)
      try {
        if (menuStore.modalType) {
          await Menu.add(values)
        } else {
          const { id } = menuStore.modalForm
          await Menu.update({ id, ...values })
        }
        await menuStore.findMenu()
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
    const { form, menuStore } = this.props
    menuStore.setModalVisible(false)
    menuStore.setModalForm({})
    form.resetFields()
  }

  render() {
    const { menuStore } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        visible={menuStore.modalVisible}
        title={menuStore.modalTitle}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('name', {
              initialValue: menuStore.modalForm.name,
              rules: [
                { required: true, message: '请输入名称!' },
                { min: 3, message: '最少3个字符' },
                { max: 20, message: '最多20个字符' }
              ],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.3)' }} />} placeholder="名称" />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(EditModal)