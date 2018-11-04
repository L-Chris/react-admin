import Base from './Base'
import {BaseURL} from '@/utils/decorators'

@BaseURL('/dish')
class Dish extends Base {
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
}

export default new Dish()