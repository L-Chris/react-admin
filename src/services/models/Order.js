import Base from './Base'
import {BaseURL} from '@/utils/decorators'

@BaseURL('/order')
class Order extends Base {
  async find ({ type } = {}) {
    let res = await super.find({ type })
    return res
  }
}

export default new Order()