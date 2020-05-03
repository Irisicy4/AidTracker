import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

const MAP = {
  satisfied: '完成',
  demanding: '求助中'
}

export default class CardStatus extends Component {
  static defaultProps = {
    status: 'demanding'
  }

  render() {
    const { status } = this.props
    return <View className='card-status'>{MAP[status]}</View>
  }
}
