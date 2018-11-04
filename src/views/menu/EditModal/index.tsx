import * as React from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import { observer, inject } from 'mobx-react'
import Menu from '@/services/models/Menu'

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

@inject('menuStore')
@observer
class EditModal extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    const { form, menuStore } = this.props
    form.validateFields(async (err, values) => {
      if (err) return
      const hideMessage = message.loading('保存中', 0)
      values.dishes = values.dishes.map(_ => _.key)
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
        message.error(err.message)
      }
    })
  }

  handleCancel = () => {
    const { form, menuStore } = this.props
    menuStore.setModalVisible(false)
    menuStore.setModalForm({})
    form.resetFields()
  }

  componentWillMount = () => {
    this.props.menuStore.findDish()
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
          <Form.Item
            {...formItemLayout}
            label="名称">
            {getFieldDecorator('name', {
              initialValue: menuStore.modalForm.name,
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
              initialValue: menuStore.modalForm.dishes
            })(
              <Select
                mode="multiple"
                labelInValue
                style={{ width: '100%' }}
                placeholder="请选择菜品"
              >
              {
                menuStore.dishList.map(_ => (
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