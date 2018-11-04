import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { Table, Button, message } from 'antd'
import EditModal from './EditModal'
import './index.scss'

@inject('userStore')
@observer
export default class UserView extends React.Component {
  columns: Array<object>;

  constructor (props) {
    super(props)

    this.columns = [{
      title: '昵称',
      dataIndex: 'name'
    }, {
      title: '邮箱',
      dataIndex: 'email'
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (_, item) => {
        const { userStore } = this.props
        const handleClick = () => {
          userStore.setModalForm(item)
          userStore.setModalVisible(true)
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
    const { userStore } = this.props
    userStore.setModalVisible(true)
  }

  async asyncData () {
    const hide = message.loading('加载中', 0)
    await this.props.userStore.findUserList()
    hide()
  }

  componentWillMount () {
    this.asyncData()
  }

  render () {
    return (
      <section className="userView">
        <header>
          <Button onClick={this.handleClickAdd}>增加</Button>
        </header>
        <Table rowKey="id" dataSource={this.props.userStore.userList} columns={this.columns} />
        <EditModal/>
      </section>
    )
  }
}