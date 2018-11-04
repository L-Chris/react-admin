import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Table, Select, DatePicker, Button, message } from 'antd'
import moment from 'dayjs'
import EditModal from './EditModal';
import { orderTypes, orderTypeMap } from '@/utils/const'
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
        return moment(text).format('YYYY/MM/DD HH:mm')
      }
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (_, item) => {
        const { orderStore } = this.props
        const handleClick = () => {
          const { shop, type, id, dishes } = item
          orderStore.setModalForm({
            id,
            type: { key: type, label: orderTypeMap[type] },
            shop: { key: shop.id, label: shop.name },
            dishes: dishes.map(_ => ({ key: _.id, label: _.name }))
          })
          orderStore.findDishByShop({ id: shop.id })
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

  handleSelectType = ({ key: type }) => {
    const { orderStore } = this.props
    orderStore.setSearchParams({ type })
    this.asyncData(orderStore.searchParams)
  }

  handleSelectDate = m => {
    const { orderStore } = this.props
    const date = m ? m.format('YYYY-MM-DD') : ''
    orderStore.setSearchParams({ date })
    this.asyncData(orderStore.searchParams)
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
          <Select
            labelInValue
            style={{ width: '180px' }}
            placeholder="请选择类型"
            onChange={this.handleSelectType}
          >
          {
            [{ id: '0', name: '全部' }].concat(orderTypes).map(_ => (
              <Select.Option key={_.id}>{_.name}</Select.Option>
            ))
          }
          </Select>
          <DatePicker onChange={this.handleSelectDate} style={{ width: '180px', marginLeft: '20px' }}/>
          <Button onClick={this.handleClickAdd} style={{ float: 'right' }}>增加</Button>
        </header>
        <Table rowKey="id" dataSource={orderStore.orderList} columns={this.columns} />
        <EditModal/>
      </section>
    )
  }
}
