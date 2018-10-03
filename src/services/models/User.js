import Base from './Base'
import {BaseURL} from '@/utils/decorators'

@BaseURL('/user')
class User extends Base {
  async find () {
    let res = await super.find()
    return res
  }
}

export default new User()