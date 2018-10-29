import React, { Component } from 'react'
import { Table, Button, message } from 'antd'
import { inject, observer } from 'mobx-react';
import EditModal from './EditModal';
import './index.scss'

@inject('shopStore')
@observer
export default class ShopView extends Component {
  constructor (props) {
    super(props)

    this.columns = [{
      title: '名称',
      dataIndex: 'name'
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (_, item) => {
        const { shopStore } = this.props
        const handleClick = () => {
          shopStore.setModalForm({
            ...item,
            dishes: item.dishes.map(_ => ({ key: _.id, label: _.name }))
          })
          shopStore.setModalVisible(true)
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
    const { shopStore } = this.props
    shopStore.setModalForm({ menu: { key: '' } })
    shopStore.setModalVisible(true)
  }

  async asyncData () {
    const hide = message.loading('加载中', 0)
    await this.props.shopStore.findShop()
    hide()
  }

  componentWillMount () {
    this.asyncData()
  }

  render () {
    return (
      <section className="shopView">
        <header>
          <Button onClick={this.handleClickAdd}>增加</Button>
        </header>
        <Table rowKey="id" dataSource={this.props.shopStore.shopList} columns={this.columns} />
        <EditModal/>
      </section>
    )
  }
}
