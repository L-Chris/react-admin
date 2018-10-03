import React, {Component} from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import './index.scss'

const { Header, Footer, Sider, Content } = Layout

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  handleClickItem ({key}) {
    this.props.navigate(key)
  }

  render () {
    return (
      <Layout style={{ height: '100%' }}>
        <Header className="header">
          <img className="header-logo" alt=""/>
          <Menu
            theme="dark"
            mode="horizontal"
          >
            <Menu.Item>主页</Menu.Item>
            <Menu.Item>点餐</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>1</Breadcrumb.Item>
            <Breadcrumb.Item>2</Breadcrumb.Item>
            <Breadcrumb.Item>3</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider>
              <Menu
                mode="inline"
                style={{ height: '100%' }}
                onClick={this.handleClickItem.bind(this)}
              >
                <Menu.Item key="user">用户管理</Menu.Item>
                <Menu.Item key="menu">菜单管理</Menu.Item>
                <Menu.Item key="order">订单记录</Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Content>
        <Footer></Footer>
      </Layout>
    )
  }
}

export default Home