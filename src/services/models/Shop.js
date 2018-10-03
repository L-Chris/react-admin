import Base from './Base'
import {BaseURL} from '@/utils/decorators'

@BaseURL('/shop')
class Shop extends Base {
  async find () {
    let res = await super.find()
    return res
  }
}

export default new Shop()