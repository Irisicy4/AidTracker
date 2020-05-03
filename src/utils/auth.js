import Taro from '@tarojs/taro'
import { MSG_GET_USERINFO_OK } from '@constants/status.js'
import request from '@services/api.js'
import { setGlobalData } from './global-data'

export function getUserInfo() {
  return new Promise((resolve, reject) => {
    Taro.getUserInfo({
      success: ({ errMsg, userInfo }) => {
        errMsg === MSG_GET_USERINFO_OK ? resolve(userInfo) : reject()
      },
      fail: reject
    })
  })
}

export function login(nickname, avatarUrl) {
  return new Promise((resolve, reject) => {
    Taro.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          request
            .post('/api-user-auth', {
              authCode: res.code,
              nickname,
              avatarUrl
            })
            .then(r => {
              if (r.data.data.role && r.data.data.role !== '') {
                setGlobalData('role', r.data.data.role)
                setGlobalData('accessToken', r.header.accessToken)
                setGlobalData('baseToken', r.header.baseToken)
              }
              resolve(r.data)
            })
            .catch(reject)
        } else {
          console.log('登录失败！' + res.errMsg)
          reject()
        }
      },
      fail: reject
    })
  })
}

export function getAuthUser() {
  return new Promise((resolve, reject) => {
    getUserInfo().then(({ nickName, avatarUrl }) => {
      login(nickName, avatarUrl).then(resolve, reject)
    }, reject)
  })
}
