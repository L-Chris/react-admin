import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Table, Button, message } from 'antd'
import moment from 'dayjs'
import EditModal from './EditModal';
import './index.scss'

@inject('orderStore')
@observer
export default class OrderView extends Component {
  constructor (props) {
    super(props)

    this.columns = [{
      title: '店铺',
      dataIndex: 'shop.name'
    }, {
      title: '类型',
      dataIndex: 'type.name'
    }, {
      title: '创建人',
      dataIndex: 'user.name'
    }, {
      title: '总价',
      dataIndex: 'price'
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      render (text, record, index) {
        return moment(Number(text)).format('YYYY/MM/DD hh:mm')
      }
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (_, item) => {
        const { orderStore } = this.props
        const handleClick = () => {
          const { shop, type } = item
          orderStore.setModalForm({
            type: { key: type.id, label: type.name },
            shop: { key: shop.id, label: shop.name },
            dishes: item.dishes.map(_ => ({ key: _.id, label: _.name }))
          })
          orderStore.setModalVisible(true)
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
    const { orderStore } = this.props
    orderStore.setModalVisible(true)
  }

  async asyncData () {
    const hide = message.loading('加载中', 0)
    await this.props.orderStore.findOrder()
    hide()
  }

  componentWillMount () {
    this.asyncData()
  }

  render () {
    return (
      <section className="orderView">
        <header>
        <Button onClick={this.handleClickAdd}>增加</Button>
        </header>
        <Table rowKey="id" dataSource={this.props.orderStore.orderList} columns={this.columns} />
        <EditModal/>
      </section>
    )
  }
}
