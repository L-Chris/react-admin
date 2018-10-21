import React, { Component } from 'react'
import { Table, Button, message } from 'antd'
import { inject, observer } from 'mobx-react';
import EditModal from './EditModal';
import './index.scss'

@inject('menuStore')
@observer
export default class MenuView extends Component {
  constructor (props) {
    super(props)

    this.columns = [{
      title: '名称',
      dataIndex: 'name'
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (_, item) => {
        const { menuStore } = this.props
        const handleClick = () => {
          menuStore.setModalForm(item)
          menuStore.setModalVisible(true)
        }
        return (
          <div className="table-operation">
            <Button type="primary" onClick={handleClick}>编辑</Button>
          </div>
        )
      }
    }]
  }

  handleClickAdd = () => {
    const { menuStore } = this.props
    menuStore.setModalVisible(true)
  }

  async asyncData () {
    const hide = message.loading('加载中', 0)
    await this.props.menuStore.findMenu()
    hide()
  }

  componentWillMount () {
    this.asyncData()
  }



  render () {
    return (
      <section className="menuView">
        <header>
          <Button onClick={this.handleClickAdd}>增加</Button>
        </header>
        <Table rowKey="id" dataSource={this.props.menuStore.menuList} columns={this.columns} />
        <EditModal/>
      </section>
    )
  }
}
