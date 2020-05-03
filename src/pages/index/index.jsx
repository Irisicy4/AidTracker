import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { isDonor, isReceiver, setTabbar } from '@utils/role'
import eventEmitter from '@utils/event'
import Donator from './donator'
import Receiver from './receiver'
import './index.scss'

export default class Index extends Component {
  componentDidMount() {
    eventEmitter.on('refresh', () => {
      this.setState({})
    })
  }

  componentDidShow() {
    setTabbar()
  }

  config = {
    navigationBarTitleText: 'Aid Tracker慈善直连'
  }

  render() {
    return (
      <View className='index'>
        {isDonor() && <Donator></Donator>}
        {isReceiver() && <Receiver></Receiver>}
      </View>
    )
  }
}
