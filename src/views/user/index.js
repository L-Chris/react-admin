import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Table, Button } from 'antd'
import EditModal from './EditModal'
import User from '@/services/models/User'
import './index.scss'

@inject('userStore')
@observer
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
        const { userStore } = this.props
        return (
          <div className="table-operation">
            <Button type="primary" onClick={() => userStore.showEditModal()}>编辑</Button>
            <Button type="danger">删除</Button>
          </div>
        )
      }
    }]
  }

  async asyncData () {
    let list = await User.find()
    this.setState({
      tableList: list,
      pagination: {}
    })
  }

  componentWillMount () {
    this.asyncData()
  }

  render () {
    const { userStore } = this.props
    return (
      <section className="userView">
        <header>
          <Button onClick={() => userStore.showAddModal()}>增加</Button>
        </header>
        <Table rowKey="id" dataSource={this.state.tableList} columns={this.columns} />
        <EditModal/>
      </section>
    )
  }
}