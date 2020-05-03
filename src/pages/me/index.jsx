import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './index.scss'

export default class Index extends Component {
  config = {}

  handleClick = () => {
    Taro.switchTab({
      url: '/pages/login/index'
    })
  }

  render() {
    return (
      <View>
        <AtButton type='primary' onClick={this.handleClick}>
          返回
        </AtButton>
      </View>
    )
  }
}
