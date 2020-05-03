import Taro from '@tarojs/taro'
import { getGlobalData } from '@utils/global-data'
import BASE_URL from './config'
import interceptors from './interceptors'

interceptors.forEach(i => Taro.addInterceptor(i))

export default {
  baseOptions(params, method = 'GET') {
    const { url, data } = params
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    const option = {
      url: url.indexOf('http') !== -1 ? url : BASE_URL + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        baseToken: getGlobalData('baseToken'),
        accessToken: getGlobalData('accessToken')
        // Authorization: Taro.getStorageSync("Authorization")
      }
    }
    return Taro.request(option)
  },
  get(url, data = '') {
    const option = { url, data }
    return this.baseOptions(option)
  },
  post: function(url, data, contentType) {
    const params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  },
  put(url, data = '') {
    const option = { url, data }
    return this.baseOptions(option, 'PUT')
  },
  delete(url, data = '') {
    const option = { url, data }
    return this.baseOptions(option, 'DELETE')
  }
}
