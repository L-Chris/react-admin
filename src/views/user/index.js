import React, { Component } from 'react'
import { Table, Button } from 'antd'
import User from '@/services/models/User'
import './index.scss'

export default class UserView extends Component {
  state = {
    tableList: [],
    pagination: {}
  }

  constructor (props) {
    super(props)

    this.columns = [{
      title: '名称',
      dataIndex: 'name'
    }, {
      title: '手机',
      dataIndex: 'phone'
    }, {
      title: '邮箱',
      dataIndex: 'email'
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

  handleAdd = async e => {
    await User.add({ name: '123', email: '123', phone: '123', account: '123', password: '123', createTime: '123' })
  }

  async asyncData () {
    let { list, ...pagination } = await User.find()
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
      <section className="userView">
        <header>
          <Button onClick={this.handleAdd}>增加</Button>
        </header>
        <Table rowKey="id" dataSource={this.state.tableList} columns={this.columns} />
      </section>
    )
  }
}
