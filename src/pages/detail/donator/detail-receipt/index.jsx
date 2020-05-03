import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import DetailDonationDetails from '@components/detail/detail-donation-details'
import DetailDonationProcess from '@components/detail/detail-donation-process'
import Card from '@components/card'
import CardContent from '@components/card/card-content'
import CardProgress from '@components/card/card-progress'
import CardTitle from '@components/card/card-title'
import CardStatus from '@components/card/card-status'
import './index.scss'

export default class Index extends Component {
  state = {
    detail: {
      title: '急需1万个口罩',
      publishTime: '2020/03/05',
      applicationTime: '2020/03/06',
      demandSupplies: 'N95口罩',
      totalDemand: 10000,
      sponsor: '武汉某某医院',
      position: '湖北省武汉市',
      totalCount: 10000,
      finishCount: 3000
    }
  }
  config = {}

  getId() {
    return this.$router.params.id
  }

  jumpToIndex() {
    Taro.switchTab({
      url: '/pages/index/index'
    })
  }

  render() {
    const { detail } = this.state
    return (
      <View className='detail-receipt'>
        <View className='tips'>发送成功！</View>
        <Text>物资捐赠申请已发送至项目：</Text>
        <Card customStyle={{ margin: '12rpx 0 57rpx 0' }}>
          <CardTitle title={detail.title}></CardTitle>
          <CardStatus></CardStatus>
          <CardProgress
            totalCount={detail.count}
            finishCount={detail.finishCount}
          ></CardProgress>
          <CardContent
            publishTime={detail.publishTime}
            demandSupplies={detail.demandSupplies}
            totalDemand={detail.totalDemand}
            sponsor={detail.sponsor}
            position={detail.position}
          ></CardContent>
        </Card>
        <DetailDonationProcess></DetailDonationProcess>
        <DetailDonationDetails></DetailDonationDetails>
        <View className='occupy-position'></View>

        <AtButton className='btn' type='primary' onClick={this.jumpToIndex}>
          返回需求列表
        </AtButton>
      </View>
    )
  }
}
