import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { getAuthUser } from '@utils/auth'
import './index.scss'

export default class Index extends Component {
  async componentDidMount() {
    Taro.showLoading({
      title: '加载中'
    })

    try {
      const res = await getAuthUser()
      console.log(res)
      if (res.code === 200) {
        Taro.switchTab({
          url: '/pages/index/index'
        })
      } else {
        Taro.navigateTo({
          url: '/pages/login/index'
        })
      }
    } catch (error) {
      console.log(error)
      Taro.navigateTo({
        url: '/pages/login/index'
      })
    } finally {
      Taro.hideLoading()
    }
  }

  config = {}

  render() {
    return <View></View>
  }
}
