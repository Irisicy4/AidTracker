import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import DetailDonationDetails from '@components/detail/detail-donation-details'
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

  render() {
    const { detail } = this.state
    return (
      <View>
        <View className='banner'>
          <Text>对接中</Text>
        </View>
        <View className='detail-doing-top'>
          <Card customStyle={{ margin: '12rpx 0 57rpx 0' }}>
            <CardTitle title={detail.title}></CardTitle>
            <CardStatus status='对接中'></CardStatus>
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
          <View className='btn-box'>
            <AtButton className='btn' type='secondary'>
              收货地址
            </AtButton>
            <AtButton className='btn' type='secondary'>
              联系负责人
            </AtButton>
          </View>
        </View>
        <View className='dividing-line'></View>
        <View className='detail-doing-bottom'>
          <DetailDonationDetails title='我的物资捐赠'></DetailDonationDetails>
        </View>

        <View className='occupy-position'></View>

        <View className='btn-box fixed-btn'>
          <AtButton className='btn' type='secondary'>
            取消捐赠
          </AtButton>
          <AtButton className='btn' type='secondary'>
            联系负责人
          </AtButton>
        </View>
      </View>
    )
  }
}
