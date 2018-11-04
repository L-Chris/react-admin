import Base from './Base'
import {BaseURL} from '@/utils/decorators'

@BaseURL('/shop')
class Shop extends Base {
  async find () {
    const res = await super.find()
    return res
  }

  async findOne ({ id }) {
    const res = await super.findOne({id})
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
}

export default new Shop()