import Base from './Base'
import {BaseURL} from '@/utils/decorators'

@BaseURL('/menu')
class Menu extends Base {
  async find () {
    let res = await super.find()
    return res
  }

  async update (params) {
    let res = await super.update(params)
    return res
  }

  async add (params) {
    let res = await super.add(params)
    return res
  }
}

export default new Menu()
