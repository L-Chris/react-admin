import Base from '@/services/models/Base'
import {BaseURL} from '@/utils/decorators'

@BaseURL('/auth')
class Login extends Base {
  login ({ account, password }) {
    return this.$post('/login', { account, password })
  }

  logout () {
    return this.$get('/logout')
  }
}

export default new Login()
