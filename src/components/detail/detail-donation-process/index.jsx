import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  static defaultProps = {}

  onClick(id) {
    console.log(id)
    Taro.switchTab({
      url: '/pages/my-project/index'
    })
  }

  render() {
    const { id } = this.props
    return (
      <View className='box'>
        <Text className='title'>捐赠进程</Text>
        <Text className='link' onClick={this.onClick.bind(this, id)}>
          前往我的项目
        </Text>
        <Text className='note'>
          接下来，请等待受赠方回复您的捐赠申请。对接完成后即可进入下一阶段。
        </Text>
      </View>
    )
  }
}
