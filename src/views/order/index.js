import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Table, Select, Button, message } from 'antd'
import moment from 'dayjs'
import EditModal from './EditModal';
import './index.scss'

const orderTypeMap = {
  '0': '普通',
  '1': '午餐',
  '2': '晚餐'
}

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
      dataIndex: 'type',
      render (text, record, index) {
        return orderTypeMap[text]
      }
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
          const { shop, type, id } = item
          orderStore.setModalForm({
            id,
            type: { key: type, label: orderTypeMap[type] },
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

  handleSelect = ({ key: type }) => {
    this.asyncData({ type })
  }

  async asyncData (params) {
    const hide = message.loading('加载中', 0)
    await this.props.orderStore.findOrder(params)
    hide()
  }

  componentWillMount () {
    this.asyncData()
  }

  render () {
    const { orderStore } = this.props

    return (
      <section className="orderView">
        <header>
          <Button onClick={this.handleClickAdd}>增加</Button>
          <Select
            labelInValue
            style={{ width: '240px', marginLeft: '20px' }}
            placeholder="请选择类型"
            onChange={this.handleSelect}
          >
          {
            orderStore.types.map(_ => (
              <Select.Option key={_.id}>{_.name}</Select.Option>
            ))
          }
          </Select>
        </header>
        <Table rowKey="id" dataSource={orderStore.orderList} columns={this.columns} />
        <EditModal/>
      </section>
    )
  }
}
