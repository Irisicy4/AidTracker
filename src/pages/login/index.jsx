import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { setGlobalData } from '@utils/global-data'
import { getAuthUser } from '@utils/auth'
import logo from '@assets/images/logo.png'
// import request from '@services/api'
import './index.scss'

export default class Index extends Component {
  componentDidMount() {}

  config = {}

  onGetUserInfo(currentRole) {
    setGlobalData('role', currentRole)
    Taro.showLoading()
    getAuthUser()
      .then(res => {
        Taro.hideLoading()
        setGlobalData('role', currentRole)
        if (res.code === 401) {
          Taro.navigateTo({
            url: `/pages/registered/index?id=${res.data.id}`
          })
        } else {
          Taro.switchTab({
            url: '/pages/index/index'
          })
        }
      })
      .catch(() => {
        Taro.hideLoading()
      })
  }

  render() {
    return (
      <View className='login'>
        <Image className='logo' src={logo}></Image>
        <Text className='title'>Aid Tracker捐赠直连</Text>
        <View className='button'>
          <AtButton
            type='primary'
            className='btn-top'
            openType='getUserInfo'
            onGetUserInfo={this.onGetUserInfo.bind(this, 'supplier')}
          >
            我是捐赠方
          </AtButton>
          <AtButton
            type='primary'
            className='btn-bottom'
            openType='getUserInfo'
            onGetUserInfo={this.onGetUserInfo.bind(this, 'demander')}
          >
            我是受赠方
          </AtButton>
        </View>
      </View>
    )
  }
}
