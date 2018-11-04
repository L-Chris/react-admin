import * as React from 'react';
import { Layout, Menu } from 'antd';
import './index.scss';

const { Header, Footer, Sider, Content } = Layout

class Home extends React.Component {
  state = {
    menus: [
      { key: 'user', label: '用户管理' },
      { key: 'shop', label: '店铺管理' },
      { key: 'dish', label: '菜品管理' },
      { key: 'order', label: '订单管理' }
    ]
  }

  handleClickItem = ({ key }) => {
    this.setState({ menus: this.state.menus })
  }

  render () {
    const defaultSelectedKeys = [this.state.menus[0].key]
    return (
      <Layout style={{ height: '100%' }}>
        <Header className="header">
          <img className="header-logo" alt=""/>
          <Menu
            theme="dark"
            mode="horizontal">
            <Menu.Item>主页</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 24px', margin: '18px 0' }}>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider>
              <Menu
                mode="inline"
                style={{ height: '100%' }}
                defaultSelectedKeys={defaultSelectedKeys}
                onClick={this.handleClickItem}>
              {
                this.state.menus.map(({key, label}) => (
                  <Menu.Item key={key}>{label}</Menu.Item>
                ))
              }
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Content>
        <Footer/>
      </Layout>
    )
  }
}

export default Home