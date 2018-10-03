import React, { Component } from 'react'
import { Layout, Card } from 'antd'
import LoginForm from './loginForm'
import './index.scss'

const { Content } = Layout

export default class Login extends Component {

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return
    })
  }

  render () {
    return (
      <Layout style={{ height: '100%' }}>
        <Content>
          <Card
            className="login-card"
            title="登录"
          >
            <LoginForm/>
          </Card>
        </Content>
      </Layout>
    )
  }
}
