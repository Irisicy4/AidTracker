import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class CardTitle extends Component {
  static defaultProps = {
    title: '急需物资'
  }

  render() {
    const { title } = this.props
    return <View className='card-title'>{title}</View>
  }
}
