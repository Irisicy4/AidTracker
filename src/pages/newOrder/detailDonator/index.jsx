import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import CardTitle from '@components/card/card-title'
import CardProgress from '@components/card/card-progress'
import CardContent from '@components/card/card-content'
import CardStatus from '@components/card/card-status'
import './index.scss'

export default class Index extends Component {
  state = {}

  componentDidMount() {}

  config = {
    navigationBarTitleText: '需求详情'
  }

  getDetailId() {
    return this.$router.params.id
  }

  handleClick = () => {
    Taro.navigateTo({
      url: `/pages/edit/donator/donate-form/index?id=${this.getDetailId()}`
    })
  }

  render() {
    return (
      <View className='detail-preparation'>
        <View className='top'>
          <CardTitle title='急需1万个口罩'></CardTitle>
          <CardStatus status='筹备中'></CardStatus>
          <CardProgress totalCount='10000' finishCount='1000'></CardProgress>
          <CardContent
            publishTime='2020/03/05'
            sponsor='武汉某某医院'
            position='湖北省武汉市'
            aidTarget='一线医护人员'
          ></CardContent>
        </View>
        <View className='center'>
          <View className='title'>所需物资详情</View>
          <Text>物资种类：医用口罩</Text>
          <Text>物资型号/品种要求：医用口罩</Text>
          <Text>需求总量：10000枚</Text>
          <Text>仍需募集：10000枚</Text>
        </View>

        <View className='bottom'>
          <View className='title'>联系方式</View>
          <Text>联系人：张女士</Text>
          <View className='contact-details'>
            <View>联系方式：</View>
            <Text>电话： 13512345678</Text>
            <Text>微信： 13512345678</Text>
          </View>
          <View className='position'>
            <View>收货地址：</View>
            <Text>湖北省武汉市洪山区某一个大道特1号</Text>
          </View>
        </View>

        <View className='occupy-position'></View>

        <View className='btn'>
          <AtButton type='primary' onClick={this.handleClick}>
            我要捐赠
          </AtButton>
        </View>
      </View>
    )
  }
}
