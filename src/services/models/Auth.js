import Base from '@/services/models/Base'
import {BaseURL} from '@/utils/decorators'

@BaseURL('/auth')
class Login extends Base {
  login ({ account, password }) {
    return super.$post('/login', { account, password })
  }

  logout () {
    return super.$get('/logout')
  }
}

export default new Login()
