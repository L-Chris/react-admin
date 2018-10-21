import React, { Component } from 'react'
import { Table, Button, message } from 'antd'
import { inject, observer } from 'mobx-react';
import EditModal from './EditModal';
import './index.scss'

@inject('dishStore')
@observer
export default class MenuView extends Component {
  constructor (props) {
    super(props)

    this.columns = [{
      title: '名称',
      dataIndex: 'name'
    }, {
      title: '价格',
      dataIndex: 'price'
    }, {
      title: '描述',
      dataIndex: 'extra'
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (_, item) => {
        const { dishStore } = this.props
        const handleClick = () => {
          dishStore.setModalForm(item)
          dishStore.setModalVisible(true)
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
    const { dishStore } = this.props
    dishStore.setModalVisible(true)
  }

  async asyncData () {
    const hide = message.loading('加载中', 0)
    await this.props.dishStore.findDish()
    hide()
  }

  componentWillMount () {
    this.asyncData()
  }



  render () {
    return (
      <section className="dishView">
        <header>
          <Button onClick={this.handleClickAdd}>增加</Button>
        </header>
        <Table rowKey="id" dataSource={this.props.dishStore.dishList} columns={this.columns} />
        <EditModal/>
      </section>
    )
  }
}
