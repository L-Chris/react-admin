import Base from './Base'
import {BaseURL} from '@/utils/decorators'

@BaseURL('/menu')
class Menu extends Base {
  async find () {
    let res = await super.find()
    return res
  }
}

export default new Menu()
