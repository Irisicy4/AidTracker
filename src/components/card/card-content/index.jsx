import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class CardContent extends Component {
  static defaultProps = {
    publishTime: '',
    applicationTime: '',
    demandSupplies: '',
    totalDemand: 0,
    planToDonate: 0,
    sponsor: '',
    position: ''
  }

  renderPublishTime(time) {
    return <View>发布时间: {time}</View>
  }

  renderApplicationTime(time) {
    return <View>我申请的时间: {time}</View>
  }

  renderTotalDemand(demandSupplies, totalDemand) {
    return (
      <View>
        需求总量: {demandSupplies} - {totalDemand} 枚
      </View>
    )
  }

  renderPlanToDonate(demandSupplies, planToDonate) {
    return (
      <View>
        计划捐赠: {demandSupplies} - {planToDonate} 枚
      </View>
    )
  }
  renderSponsor(sponsor) {
    return <View>发起单位: {sponsor}</View>
  }

  renderPosition(position) {
    return <View>所在地区: {position}</View>
  }

  renderAidTarget(value) {
    return <View>目标援助对象: {value}</View>
  }

  render() {
    const {
      publishTime,
      applicationTime,
      demandSupplies,
      totalDemand,
      planToDonate,
      aidTarget,
      sponsor,
      position
    } = this.props
    return (
      <View className='card-content'>
        <View className='card-time'>
          {publishTime && this.renderPublishTime(publishTime)}
          {applicationTime && this.renderApplicationTime(applicationTime)}
        </View>
        <View className='card-demand'>
          {totalDemand !== 0 &&
            this.renderTotalDemand(demandSupplies, totalDemand)}
          {planToDonate !== 0 &&
            this.renderPlanToDonate(demandSupplies, planToDonate)}
        </View>
        <View className='card-who'>
          {sponsor && this.renderSponsor(sponsor)}
          {position && this.renderPosition(position)}
          {aidTarget && this.renderAidTarget(aidTarget)}
        </View>
      </View>
    )
  }
}
