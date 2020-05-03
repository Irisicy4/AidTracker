import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

export default class Index extends Component {
  static defaultProps = {
    onClick: () => {},
    customStyle: {}
  }

  render() {
    const { children, onClick, customStyle } = this.props
    return (
      <View className='card' style={customStyle} onClick={onClick}>
        {children}
      </View>
    )
  }
}
