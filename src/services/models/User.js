import Base from './Base'
import {BaseURL} from '@/utils/decorators'

@BaseURL('/user')
class User extends Base {
  async find () {
    let res = await super.find()
    return res
  }

  async save (params) {
    let res = await super.save(params)
    return res
  }
}

export default new User()