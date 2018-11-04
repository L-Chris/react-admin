import axios from '@/services'
import { BaseURL } from '@/utils/decorators'

@BaseURL(axios.defaults.baseURL || '')
class Base {
  static $name = ''
  static $http = axios

  find (params = {}, url = '/list') {
    return this.$get(url, params)
  }

  findOne (params = {}, url = '/get') {
    return this.$get(url, params, params)
  }

  update (data = {}, url = '/update', options = {}) {
    return this.$post(url, data, options)
  }

  add (data = {}, url = '/add', options = {}) {
    return this.$post(url, data, options)
  }

  save (data = {}, url = '/save', options ={}) {
    return this.$post(url, data, options)
  }

  delete (params = {}, url = '/delete', options = {}) {
    return this.$get(url, params, options)
  }

  protected $get (
    url,
    params = {},
    options = {}
  ) {
    const { $name }: any = this.constructor
    options = Object.assign({
      baseURL: `${Base.$name}${$name}`
    }, options, {params})
    return Base.$http.get(url, options)
  }

  protected $post (
    url,
    data = {},
    options = {}
  ) {
    const { $name }: any = this.constructor
    options = Object.assign({
      baseURL: `${Base.$name}${$name}`
    }, options)
    return Base.$http.post(url, data, options)
  }
}

export default Base
