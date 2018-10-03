import React, { Component } from 'react'
import { Table, Button } from 'antd'
import Order from '@/services/models/Order'
import './index.scss'

export default class OrderView extends Component {
  state = {
    tableList: [],
    pagination: {}
  }

  constructor (props) {
    super(props)

    this.columns = [{
      title: '总价',
      dataIndex: 'price'
    }, {
      title: '是否付款',
      dataIndex: 'isPay'
    }, {
      title: '创建人',
      dataIndex: 'user.name'
    }, {
      title: '创建时间',
      dataIndex: 'createTime'
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: () => {
        return (
          <div className="table-operation">
            <Button type="primary">编辑</Button>
            <Button type="danger">删除</Button>
          </div>
        )
      }
    }]
  }

  async asyncData () {
    let { list, ...pagination } = await Order.find()
    this.setState({
      tableList: list,
      pagination
    })
  }

  componentWillMount () {
    this.asyncData()
  }

  render () {
    return (
      <section className="orderView">
        <header>
          <Button>增加</Button>
        </header>
        <Table rowKey="id" dataSource={this.state.tableList} columns={this.columns} />
      </section>
    )
  }
}
