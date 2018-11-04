import Base from './Base'
import {BaseURL} from '@/utils/decorators'

@BaseURL('/user')
class User extends Base {
  async find () {
    const res = await super.find()
    return res
  }

  async update (params) {
    const res = await super.update(params)
    return res
  }

  async add (params) {
    const res = await super.add(params)
    return res
  }

  async findCurrent () {
    const res = await this.$get('/current')
    return res
  }
}

export default new User()