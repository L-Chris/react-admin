import Base from './Base'
import {BaseURL} from '@/utils/decorators'

@BaseURL('/')
class Login extends Base {
  login ({ account, password }) {
    return super.$get('/login', { account, password })
  }

  logout () {
    return super.$get('/logout')
  }
}

export default new Login()
