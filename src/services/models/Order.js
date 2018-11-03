import Base from './Base'
import {BaseURL} from '@/utils/decorators'

@BaseURL('/order')
class Order extends Base {
  async find ({ type, date } = {}) {
    let res = await super.find({ type, date })
    return res
  }
}

export default new Order()