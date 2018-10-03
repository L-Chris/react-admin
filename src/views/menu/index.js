import React, { Component } from 'react'
import { Table, Button } from 'antd'
import Menu from '@/services/models/Menu'
import './index.scss'

export default class MenuView extends Component {
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
    let { list, ...pagination } = await Menu.find()
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
      <section className="menuView">
        <header>
          <Button>增加</Button>
        </header>
        <Table rowKey="id" dataSource={this.state.tableList} columns={this.columns} />
      </section>
    )
  }
}
