import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { navigate } from '@reach/router'
import Auth from '@/services/models/Auth'
import './index.scss'


const FormItem = Form.Item

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (err) return
      try {
        await Auth.login(values)
        navigate('/')
      } catch (err) {
        console.log(err)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="loginForm">
        <FormItem>
          {getFieldDecorator('account', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.3)' }} />} placeholder="账号" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.3)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>
          )}<a className="loginForm-register">注册</a>
          <Button type="primary" htmlType="submit" className="loginForm-button">登录</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(LoginForm)